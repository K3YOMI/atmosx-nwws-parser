/*
                                            _               _     __   __
         /\  | |                           | |             (_)    \ \ / /
        /  \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ _  ___ \ V / 
       / /\ \| __| '_ ` _ \ / _ \/ __| '_ \| '_ \ / _ \ '__| |/ __| > <  
      / ____ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ |  | | (__ / . \ 
     /_/    \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  |_|\___/_/ \_\
                                     | |                                 
                                     |_|                                                                                                                
    
    Written by: k3yomi@GitHub                        
*/

let loader = require(`./bootstrap.js`);

class NoaaWeatherWireServiceCore { 

    constructor(metadata={}) {
        this.metadata = metadata;
        loader.settings = { ...loader.settings, ...metadata };
        process.on('uncaughtException', (error) => {
            const hault = loader.definitions.haultingConditions.find(e => error.message.includes(e.error));
            if (hault) { loader.static.events.emit(`onError`, `${hault ? hault.message : error.message}`); return; }
            loader.static.events.emit(`onError`, `An uncaught exception occurred: ${error.stack || error.message}`);
        });
        this.initializeDatabase([{ id: `C`, file: `USCounties` }, { id: `Z`, file: `ForecastZones` }, { id: `Z`, file: `FireZones` }, { id: `Z`, file: `OffShoreZones` }, { id: `Z`, file: `FireCounties` }, { id: `Z`, file: `Marine` }]);
        setInterval(() => { if (loader.settings.reconnect) { this.isReconnectEligible(loader.settings.interval) }}, loader.settings.interval * 1000);
    }
    
    /**
      * @function debug
      * @description Sends an event to the `onDebug` event emitter with the provided message.
      * 
      * @param {string} message - The message to send to the debug event.
      */

    debug = function(message=`No message provided`) {
        loader.static.events.emit(`onDebug`, message);
    }

    /**
      * @function initializeDatabase
      * @description Initializes the SQLite database and creates the shapefiles table if it doesn't exist.
      * This also will read the shapefiles from the specified directory and insert them into the database.
      *
      * @param {Array} shapefiles - An array of shapefile objects containing `id` and `file` properties. 
      */

    initializeDatabase = async function(shapefiles = []) {
        let { fs, path, sqlite3, shapefile } = loader.packages;
        if (!fs.existsSync(loader.settings.databaseDir)) {
            fs.writeFileSync(loader.settings.databaseDir, '', 'utf8');
        }
        let db = new sqlite3(loader.settings.databaseDir);
        let tableExists = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='shapefiles'`).get();
        if (!tableExists) {
            db.prepare(`CREATE TABLE shapefiles (id TEXT PRIMARY KEY, location TEXT, geometry TEXT)`).run();
            console.log(`\n\n[NOTICE] DO NOT CLOSE THIS PROJECT UNTIL THE SHAPEFILES ARE DONE COMPLETING!\n` +
                `\t THIS COULD TAKE A WHILE DEPENDING ON THE SPEED OF YOUR STORAGE!!\n` +
                `\t IF YOU CLOSE YOUR PROJECT, THE SHAPEFILES WILL NOT BE CREATED AND YOU WILL NEED TO DELETE ${loader.settings.databaseDir} AND RESTART TO CREATE THEM AGAIN!\n\n`);
            for (let shapefileEntry of shapefiles) {
                let { file, id: type } = shapefileEntry;
                let filePath = path.join(__dirname, 'shapefiles', file);
                let { features } = await shapefile.read(filePath, filePath);
                console.log(`Creating ${file} shapefile...`);
                for (let feature of features) {
                    let { properties, geometry } = feature;
                    let id, location;
                    this.debug(`Processing feature with properties: ${JSON.stringify(properties)}`);
                    if (properties.FIPS) {
                        id = `${properties.STATE}${type}${properties.FIPS.substring(2)}`; location = `${properties.COUNTYNAME}, ${properties.STATE}`;
                    } else if (properties.STATE) {
                        id = `${properties.STATE}${type}${properties.ZONE}`; location = `${properties.NAME}, ${properties.STATE}`;
                    } else if (properties.FULLSTAID) {
                        id = `${properties.ST}${type}-NoZone`; location = `${properties.NAME}, ${properties.STATE}`;
                    } else {
                        id = properties.ID; location = properties.NAME;
                    }
                    await db.prepare(`INSERT OR REPLACE INTO shapefiles (id, location, geometry) VALUES (?, ?, ?)`).run(id, location, JSON.stringify(geometry));
                }
            }
            console.log(`Shapefiles created successfully!`);
        }
        loader.static.db = db;
        this.initializeSession();
    }

    /**
      * @function initializeClient
      * @description Authenticates the XMPP session for NOAA Weather Wire Service with the provided metadata.
      *
      * @param {Object} metadata - The metadata object containing authentication details.
      * @param {string} metadata.username - The username for the XMPP session.
      * @param {string} metadata.password - The password for the XMPP session.
      * @param {string} [metadata.display] - The display name for the XMPP session (optional).
      */

    initializeClient = function(metadata = {}) { 
        if (loader.settings.databaseDir == null) { throw new Error(`no-database-dir`); }
        loader.static.session = loader.packages.xmpp.client({ 
            service: `xmpp://nwws-oi.weather.gov`, 
            domain: `nwws-oi.weather.gov`, 
            username: metadata.username || ``,
            password: metadata.password || ``,
        }).setMaxListeners(0);
    }

    /**
      * @function initializeSession
      * @description Creates a new XMPP session for NOAA Weather Wire Service and sets up event listeners for connection and stanza handling.
      * Also handles reconnection logic if the session is disconnected.
      */

    initializeSession = function() { 
        if (this.metadata.authenication.display == undefined) this.metadata.authenication.display = this.metadata.authenication.username || ``;
        this.initializeClient({ username: this.metadata.authenication.username, password: this.metadata.authenication.password, display: this.metadata.authenication.display });
        loader.static.session.on(`online`, async () => {
            loader.cache.isConnected = true;
            this.debug(`NOAA Weather Wire Service is online and connected.`);
            loader.static.session.send(loader.packages.xmpp.xml('presence', { to: `nwws@conference.nwws-oi.weather.gov/${this.metadata.authenication.display}`, xmlns: 'http://jabber.org/protocol/muc' }))
            loader.static.session.send(loader.packages.xmpp.xml('presence', { to: `nwws@conference.nwws-oi.weather.gov`, type: 'available' }))
            loader.static.events.emit(`onConnection`, `NOAA Weather Wire Service is online and connected.`);
            if (loader.cache.attemptingReconnect) {
                setTimeout(() => { loader.cache.attemptingReconnect = false; }, 15 * 1000);
                this.debug(`Reconnected to NOAA Weather Wire Service after ${loader.cache.totalReconnects} attempts.`);
            }
        })
        loader.static.session.on(`offline`, () => {
            loader.static.events.emit('onServiceInterruption', `unreachable-host`);
            throw new Error(`unreachable-host`);
        })
        loader.static.session.on(`error`, (error) => {
            loader.static.session.stop();
            loader.cache.isConnected = false;
            loader.cache.attemptingReconnect = false;
            loader.static.events.emit('onServiceInterruption', error.message || error.stack || `An error occurred while connecting to NOAA Weather Wire Service.`);
            throw new Error(`service-error`);
        })
        loader.static.session.on(`stanza`, (stanza) => {
            loader.cache.lastStanza = new Date().getTime();
            if (stanza.is('message')) {
                let validateStanza = loader.packages.mStanza.newStanza(stanza)
                if (validateStanza.ignore 
                    || (validateStanza.isCap && !loader.settings.cap) 
                    || (!validateStanza.isCap && loader.settings.cap) 
                    || (validateStanza.isCap && !validateStanza.hasCapArea)) return;
                loader.packages.mStanza.createNewAlert(validateStanza);
                this.debug(`New alert received from NOAA Weather Wire Service ${JSON.stringify(validateStanza.attributes)}`);
                loader.static.events.emit(`onMessage`, validateStanza);
            }
            if (stanza.is('presence') && stanza.attrs.from && stanza.attrs.from.startsWith('nwws@conference.nwws-oi.weather.gov/')) {
                let occupant = stanza.attrs.from.split('/').slice(1).join('/');
                loader.static.events.emit('onOccupant', { occupant, type: stanza.attrs.type === 'unavailable' ? 'unavailable' : 'available' });
            }
        })
        loader.static.session.start();
    }

    /**
      * @function isReconnectEligible
      * @description Checks if the session is eligible for reconnection based on the last stanza time
      * and attempts to reconnect if necessary.
      * 
      * @param {number} [minSeconds=60] - The minimum number of seconds since the last stanza to consider reconnection.
      */

    isReconnectEligible = async function(minSeconds=60) {
        if (loader.cache.isConnected && loader.static.session) {
            let lastStanza = new Date().getTime() - loader.cache.lastStanza;
            if (lastStanza > minSeconds * 1000) {
                if (!loader.cache.attemptingReconnect) {
                    loader.cache.attemptingReconnect = true;
                    loader.cache.isConnected = false;
                    loader.cache.totalReconnects += 1;
                    loader.static.events.emit(`onReconnect`, { reconnects: loader.cache.totalReconnects, lastStanza: lastStanza / 1000 });
                    await loader.static.session.stop().catch(() => {});
                    await loader.static.session.start().catch(() => {});
                } 
            }
        }
        return { message: `Session is not connected or session is not available`, isConnected: loader.cache.isConnected, session: loader.static.session };
    }

    /**
      * @function setDisplayName
      * @description Sets the display name for the XMPP session.
      * 
      * @param {string} displayName - The display name to set for the XMPP session.
      */

    setDisplayName = async function(displayName) {
        this.metadata.authenication.display = displayName;
    }

    /**
      * @function onEvent
      * @description Registers an event listener for the specified event.
      * @param {string} event - The name of the event to listen for.
      * @param {function} listener - The callback function to execute when the event is emitted.
      */

    onEvent = function(event, listener) {
        loader.static.events.on(event, listener);
    }
}

module.exports = NoaaWeatherWireServiceCore;