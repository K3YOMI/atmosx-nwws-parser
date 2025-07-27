let loader = require(`./bootstrap.js`);

class NoaaWeatherWireServiceCore { 
    constructor(metadata = {}) {
        this.metadata = metadata;
        loader.settings = { ...loader.settings, ...metadata };
        process.on('uncaughtException', (error) => {
            const hault = loader.definitions.haultingConditions.find(e => error.message.includes(e.error));
            if (hault) { loader.static.events.emit(`onError`, `${hault ? hault.message : error.message}`); return; }
            loader.static.events.emit(`onError`, `An uncaught exception occurred: ${error.stack || error.message}`);
        });
        this.initializeDatabase([{ id: `C`, file: `USCounties` }, { id: `Z`, file: `ForecastZones` }, { id: `Z`, file: `FireZones` }, { id: `Z`, file: `OffShoreZones` }, { id: `Z`, file: `FireCounties` }, { id: `Z`, file: `Marine` }]);
    }

    debug = function(message=`No message provided`) {
        loader.static.events.emit(`onDebug`, message);
    }

    initializeDatabase = async function(shapefiles = []) {
        if (!loader.packages.fs.existsSync(loader.settings.databaseDir)) {
            loader.packages.fs.writeFileSync(loader.settings.databaseDir, ``, `utf8`);
        }
        loader.static.db = new loader.packages.sqlite3(loader.settings.databaseDir)
        let tableExists = loader.static.db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='shapefiles'`).get();
        if (!tableExists) {
            loader.static.db.prepare(`CREATE TABLE shapefiles (id TEXT PRIMARY KEY, location TEXT, geometry TEXT)`).run();
            console.log(`\n\n[NOTICE] DO NOT CLOSE THIS PROJECT UNTIL THE SHAPEFILES ARE DONE COMPLETING!\n\t THIS COULD TAKE A WHILE DEPENDING ON THE SPEED OF YOUR STORAGE!!\n\t IF YOU CLOSE YOUR PROJECT, THE SHAPEFILES WILL NOT BE CREATED AND YOU WILL NEED TO DELETE ${loader.settings.databaseDir} AND RESTART TO CREATE THEM AGAIN!\n\n`);
            for (let shapefile of shapefiles) {
                let { file, id: type } = shapefile;
                let filePath = loader.packages.path.join(__dirname, 'shapefiles', file);
                let { features } = await loader.packages.shapefile.read(filePath, filePath);
                console.log(`Creating ${file} shapefile...`);
                for (let feature of features) {
                    let { properties, geometry } = feature;
                    let t, n;
                    if (properties.FIPS) {
                        t = `${properties.STATE}${type}${properties.FIPS.substring(2)}`;
                        n = `${properties.COUNTYNAME}, ${properties.STATE}`;
                    } else if (properties.STATE) {
                        t = `${properties.STATE}${type}${properties.ZONE}`;
                        n = `${properties.NAME}, ${properties.STATE}`;
                    } else if (properties.FULLSTAID) {
                        t = `${properties.ST}${type}-NoZone`;
                        n = `${properties.NAME}, ${properties.STATE}`;
                    } else {
                        t = properties.ID;
                        n = properties.NAME;
                    }
                    await loader.static.db.prepare(`INSERT OR REPLACE INTO shapefiles (id, location, geometry) VALUES (?, ?, ?)`).run(t, n, JSON.stringify(geometry));
                }
            }
            console.log(`Shapefiles created successfully!`);
        }
        this.createSession();
    }

    initializeSession = function(metadata = {}) { 
        if (loader.settings.databaseDir == null) { throw new Error(`Database directory is not set. Please set the databaseDir in the metadata.`); }
        loader.cache.session = loader.packages.xmpp.client({ 
            service: `xmpp://nwws-oi.weather.gov`, 
            domain: `nwws-oi.weather.gov`, 
            username: metadata.username || ``,
            password: metadata.password || ``,
        }).setMaxListeners(0);
    }

    createSession = function() { 
        if (this.metadata.authenication.display == undefined) this.metadata.authenication.display = this.metadata.authenication.username || ``;
        this.initializeSession({ username: this.metadata.authenication.username, password: this.metadata.authenication.password, display: this.metadata.authenication.display });
        loader.cache.session.on(`online`, async () => {
            loader.cache.isConnected = true;
            this.debug(`NOAA Weather Wire Service is online and connected.`);
            loader.cache.session.send(loader.packages.xmpp.xml('presence', { to: `nwws@conference.nwws-oi.weather.gov/${this.metadata.authenication.display}`, xmlns: 'http://jabber.org/protocol/muc' }))
            loader.cache.session.send(loader.packages.xmpp.xml('presence', { to: `nwws@conference.nwws-oi.weather.gov`, type: 'available' }))
            if (loader.cache.attemptingReconnect) {
                setTimeout(() => { loader.cache.attemptingReconnect = false; }, 15 * 1000);
                this.debug(`Reconnected to NOAA Weather Wire Service after ${loader.cache.totalReconnects} attempts.`);
            }
        })
        loader.cache.session.on(`stanza`, (stanza) => {
            loader.cache.lastStanza = new Date().getTime();
            let validateStanza = loader.packages.mStanza.newStanza(stanza)
            if (validateStanza.ignore 
                || (validateStanza.isCap && !loader.settings.cap) 
                || (!validateStanza.isCap && loader.settings.cap) 
                || (validateStanza.isCap && !validateStanza.hasCapArea)) return;
            loader.packages.mStanza.createNewAlert(validateStanza);
            this.debug(`New alert received from NOAA Weather Wire Service ${JSON.stringify(validateStanza.attributes)}`);
            loader.static.events.emit(`onStanza`, validateStanza);
        })
        loader.cache.session.start();
    }

    setCapAlertsOnly = function(boolean=false) {
        if (typeof boolean !== 'boolean') { throw new Error('enableCap expects a boolean value'); }
        loader.settings.cap = boolean;
    }

    getLastStanza = function() {
        return new Date().getTime() - loader.cache.lastStanza;
    }

    isReconnectEligible = async function(minSeconds=60) {
        if (loader.cache.isConnected && loader.cache.session) {
            let lastStanza = this.getLastStanza();
            if (lastStanza > minSeconds * 1000) {
                if (!loader.cache.attemptingReconnect) {
                    loader.cache.attemptingReconnect = true;
                    loader.cache.isConnected = false;
                    loader.cache.totalReconnects += 1;
                    await loader.cache.session.stop().catch(() => {});
                    await loader.cache.session.start().catch(() => {});
                } 
            }
        }
        return { message: `Session is not connected or session is not available`, isConnected: loader.cache.isConnected, session: loader.cache.session };
    }

    onEvent = function(event, listener) {
        loader.static.events.on(event, listener);
    }
}

module.exports = NoaaWeatherWireServiceCore;