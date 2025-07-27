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

let loader = require(`../bootstrap.js`);

class NoaaWeatherWireServiceEvents { 

    /**
      * @function newCapEvent
      * @description Creates a new CAP event from the provided stanza.
      * 
      * @param {object} stanza - The stanza object containing message and attributes.
      */
    
    newCapEvent = async function(stanza) { 
        let message = stanza.message.substring(stanza.message.indexOf(`<?xml version="1.0"`), stanza.message.length);
        let data = loader.packages.xml2js.Parser();
        let result = await data.parseStringPromise(message);
        let tracking = result.alert.info[0].parameter.find(p => p.valueName[0] == "VTEC")?.value[0] || "N/A";
        let action = "N/A";
        if (tracking !== "N/A") {
            let splitVTEC = tracking.split(".");
            tracking = `${splitVTEC[2]}-${splitVTEC[3]}-${splitVTEC[4]}-${splitVTEC[5]}`;
            action = loader.definitions.status[splitVTEC[1]];
        } else {
            action = result.alert.msgType[0];
            tracking = `${result.alert.info[0].parameter.find(p => p.valueName[0] == "WMOidentifier")?.value[0]}-${result.alert.info[0].area[0].geocode.filter(g => g.valueName[0] == "UGC").map(g => g.value[0]).join("-")}`;
        }
        let alert = {
            id: `Wire-${tracking}`,
            tracking: tracking,
            action: action,
            history: [{ description: result.alert.info[0].description[0], action: action, issued: new Date(stanza.attributes.issue) }],
            properties: {
                areaDesc: result.alert.info[0].area[0].areaDesc[0],
                expires: new Date(result.alert.info[0].expires[0]),
                sent: new Date(result.alert.sent[0]),
                messageType: action,
                event: result.alert.info[0].event[0],
                sender: result.alert.sender[0],
                senderName: result.alert.info[0].senderName[0],
                description: result.alert.info[0].description[0],
                geocode: { UGC: result.alert.info[0].area[0].geocode.filter(g => g.valueName[0] == "UGC").map(g => g.value[0]) },
                parameters: {
                    WMOidentifier: [result.alert.info[0].parameter.find(p => p.valueName[0] == "WMOidentifier")?.value[0] || "N/A"],
                    tornadoDetection: result.alert.info[0].parameter.find(p => p.valueName[0] == "tornadoDetection")?.value[0] || result.alert.info[0].parameter.find(p => p.valueName[0] == "waterspoutDetection")?.value[0] || "N/A",
                    maxHailSize: result.alert.info[0].parameter.find(p => p.valueName[0] == "maxHailSize")?.value[0] || "N/A",
                    maxWindGust: result.alert.info[0].parameter.find(p => p.valueName[0] == "maxWindGust")?.value[0] || "N/A",
                    thunderstormDamageThreat: [result.alert.info[0].parameter.find(p => p.valueName[0] == "thunderstormDamageThreat")?.value[0] || result.alert.info[0].parameter.find(p => p.valueName[0] == "tornadoDamageThreat")?.value[0] || "N/A"],
                },
            },
        };
        if (result.alert.info[0].area[0].polygon) {
            alert.geometry = { type: "Polygon", coordinates: [result.alert.info[0].area[0].polygon[0].split(" ").map(coord => { let [lat, lon] = coord.split(",").map(parseFloat); return [lon, lat]; })] };
        }
        loader.static.events.emit(`onAlert`, [alert]);
    }

    /**
      * @function newRawProductEvent
      * @description Creates a new raw product event from the provided stanza.
      *
      * @param {object} stanza - The stanza object containing message and attributes.
      */

    newRawProductEvent = async function(stanza) { 
        let message = stanza.message.split(/(?=\$\$)/g).map(msg => msg.trim());
        let defaultWMO = stanza.message.match(new RegExp(loader.definitions.expressions.wmo, 'gimu'));
        let alerts = []
        for (let msg of message) {
            let startTime = new Date().getTime();
            let vtec = await loader.packages.mVtec.getVTEC(msg, stanza.attributes);
            let ugc = await loader.packages.mUGC.getUGC(msg);
            if (vtec && ugc) {
                if (vtec.wmo) defaultWMO = vtec.wmo;
                let getTornado = loader.packages.mText.getString(msg, `TORNADO...`) || loader.packages.mText.getString(msg, `WATERSPOUT...`)
                let getHail = loader.packages.mText.getString(msg, `MAX HAIL SIZE...`, [`IN`]) || loader.packages.mText.getString(msg, `HAIL...`, [`IN`]);
                let getGusts = loader.packages.mText.getString(msg, `MAX WIND GUST...`) || loader.packages.mText.getString(msg, `WIND...`);
                let getThreat = loader.packages.mText.getString(msg, `DAMAGE THREAT...`);
                let senderOffice = loader.packages.mText.getOffice(msg) || vtec.tracking.split(`-`)[0];
                let getCoordinates = loader.packages.mText.getPolygonCoordinates(msg);
                let getDescription = loader.packages.mText.getCleanDescription(msg, vtec);
                let alert = { 
                    hitch: `${new Date().getTime() - startTime}ms`,
                    id: `Wire-${vtec.tracking}`,
                    tracking: vtec.tracking,
                    action: vtec.status,
                    history: [{description: getDescription, action: vtec.status, issued: new Date(vtec.issued)}],
                    properties: {
                        areaDesc: ugc.locations.join(`; `) || `N/A`,
                        expires: new Date(vtec.expires) == `Invalid Date` ? new Date(new Date().getTime() + 999999 * 60 * 60 * 1000) : new Date(vtec.expires),
                        sent: new Date(vtec.issued),
                        messageType: vtec.status, 
                        event: vtec.event || `Unknown Event`,
                        sender: senderOffice,
                        senderName: `NWS ${senderOffice}`,
                        description: getDescription,
                        geocode: { 
                            UGC: ugc.zones,
                        },
                        parameters: {
                            WMOidentifier: vtec.wmo?.[0] ? [vtec.wmo[0]] : defaultWMO?.[0] ? [defaultWMO[0]] : [`N/A`],
                            tornadoDetection: getTornado || `N/A`,
                            maxHailSize: getHail || `N/A`,
                            maxWindGust: getGusts || `N/A`,
                            thunderstormDamageThreat: [getThreat || `N/A`],
                        },
                    },
                    geometry: { type: `Polygon`, coordinates: [getCoordinates] }
                }
                if (loader.settings.enhancedPolygons) {
                    let coordinates = await loader.packages.mUGC.getCoordinates(ugc.zones);
                    if (coordinates.length > 0) {
                        alert.geometry.coordinates = [coordinates];
                    }
                }
                alerts.push(alert);
            }
        }
        if (alerts.length === 0) { return; }
        loader.static.events.emit(`onAlert`, alerts);
    }

    /**
      * @function newSpecialEvent
      * @description Creates a new special weather statement event from the provided stanza.
      * 
      * @param {object} stanza - The stanza object containing message and attributes.
      */

    newSpecialEvent = async function(stanza) { 
        let message = stanza.message.split(/(?=\$\$)/g).map(msg => msg.trim());
        let defaultWMO = stanza.message.match(new RegExp(loader.definitions.expressions.wmo, 'gimu'));
        let alerts = [];
        for (let msg of message) {
            let startTime = new Date().getTime();
            let ugc = await loader.packages.mUGC.getUGC(msg);
            if (ugc) {
                let getTornado = loader.packages.mText.getString(msg, `TORNADO...`) || loader.packages.mText.getString(msg, `WATERSPOUT...`)
                let getHail = loader.packages.mText.getString(msg, `MAX HAIL SIZE...`, [`IN`]) || loader.packages.mText.getString(msg, `HAIL...`, [`IN`]);
                let getGusts = loader.packages.mText.getString(msg, `MAX WIND GUST...`, [`KT`, `MPH`]) || loader.packages.mText.getString(msg, `WIND...`);
                let getThreat = loader.packages.mText.getString(msg, `DAMAGE THREAT...`);
                let senderOffice = loader.packages.mText.getOffice(msg) || `NWS`;
                let getCoordinates = loader.packages.mText.getPolygonCoordinates(msg);
                let getDescription = loader.packages.mText.getCleanDescription(msg, null);
                let alert = { 
                    hitch: `${new Date().getTime() - startTime}ms`,
                    id: `Wire-${defaultWMO ? defaultWMO[0] : `N/A`}-${ugc.zones.join(`-`)}`,
                    tracking: `${defaultWMO ? defaultWMO[0] : `N/A`}-${ugc.zones.join(`-`)}`,
                    action: `Issued`,
                    history: [{description: getDescription, action: `Issued`, issued: new Date(stanza.attributes.issue)}],
                    properties: {
                        areaDesc: ugc.locations.join(`; `) || `N/A`,
                        expires: new Date(new Date().getTime() + 1 * 60 * 60 * 1000),
                        sent: new Date(stanza.attributes.issue),
                        messageType: `Issued`,
                        event: `Special Weather Statement`,
                        sender: senderOffice,
                        senderName: `NWS ${senderOffice}`,
                        description: getDescription,
                        geocode: { 
                            UGC: ugc.zones,
                        },
                        parameters: {
                            WMOidentifier: defaultWMO?.[0] ? [defaultWMO[0]] : [`N/A`],
                            tornadoDetection: getTornado || `N/A`,
                            maxHailSize: getHail || `N/A`,
                            maxWindGust: getGusts || `N/A`,
                            thunderstormDamageThreat: [getThreat || `N/A`],
                        },
                    },
                    geometry: { type: `Polygon`, coordinates: [getCoordinates] }
                }
                if (loader.settings.enhancedPolygons) {
                    let coordinates = await loader.packages.mUGC.getCoordinates(ugc.zones);
                    if (coordinates.length > 0) {
                        alert.geometry.coordinates = [coordinates];
                    }
                }
                alerts.push(alert);
            }
        }
        if (alerts.length === 0) { return; }
        loader.static.events.emit(`onAlert`, alerts);
    }
}

module.exports = new NoaaWeatherWireServiceEvents();