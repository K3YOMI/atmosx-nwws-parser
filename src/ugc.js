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

class NoaaWeatherWireServiceUGC { 

    /**
      * @function getUGC
      * @description Extracts UGC (FIPS) information from a message.
      * 
      * @param {string} message - The message containing UGC information.
      */
    
    getUGC = async function(message) {
        let header = this.getHeader(message);
        let zones = this.getZones(header);
        let locations = await this.getLocations(zones)
        let ugc = zones.length > 0 ? { zones, locations} : null;
        return ugc
    }

    /**
      * @function getHeader
      * @description Extracts the UGC header from the message.
      * 
      * @param {string} message - The message containing the UGC header.
      */

    getHeader = function(message) {
        let start = message.search(new RegExp(loader.definitions.expressions.ugc1, "gimu"));
        let end = message.substring(start).search(new RegExp(loader.definitions.expressions.ugc2, "gimu"));
        let full = message.substring(start, start + end).replace(/\s+/g, '').slice(0, -1);
        return full;
    }

    /**
      * @function getLocations
      * @description Retrieves the locations associated with the UGC zones.
      * If a location is not found in the database, the zone ID is returned.
      * 
      * @param {Array} zones - The UGC zones to retrieve locations for.
      */

    getLocations = async function(zones) {
        let locations = [];
        for (let i = 0; i < zones.length; i++) {
            let id = zones[i].trim();
            let located = await loader.static.db.prepare(`SELECT location FROM shapefiles WHERE id = ?`).get(id);
            located != undefined ? locations.push(located.location) : locations.push(id);
        }     
        return Array.from(new Set(locations));
    }

    /**
      * @function getCoordinates
      * @description Retrieves the coordinates for the UGC zones.
      * 
      * @param {Array} zones - The UGC zones to retrieve coordinates for.
      */

    getCoordinates = async function(zones) {
        let coordinates = [];
        for (let i = 0; i < zones.length; i++) {
            let id = zones[i].trim();
            let located = await loader.static.db.prepare(`SELECT geometry FROM shapefiles WHERE id = ?`).get(id);
            if (located != undefined) {
                let geometry = JSON.parse(located.geometry);
                if (geometry?.type == 'Polygon') {
                    coordinates.push(...geometry.coordinates[0].map(coord => [coord[0], coord[1]]));
                    break;
                }
            }
        }
        return coordinates;
    }

    /**
      * @function getZones
      * @description Parses the UGC header to extract zone IDs.
      * 
      * @param {string} header - The UGC header string.
      */

    getZones = function(header) {
        let ugcSplit = header.split('-'), zones = [], state = ugcSplit[0].substring(0, 2), format = ugcSplit[0].substring(2, 3);
        for (let i = 0; i < ugcSplit.length; i++) {
            if (/^[A-Z]/.test(ugcSplit[i])) {
                state = ugcSplit[i].substring(0, 2);
                if (ugcSplit[i].includes('>')) {
                    let [start, end] = ugcSplit[i].split('>'), startNum = parseInt(start.substring(3), 10), endNum = parseInt(end, 10);
                    for (let j = startNum; j <= endNum; j++) zones.push(`${state}${format}${j.toString().padStart(3, '0')}`);
                } else zones.push(ugcSplit[i]);
                continue;
            }
            if (ugcSplit[i].includes('>')) {
                let [start, end] = ugcSplit[i].split('>'), startNum = parseInt(start, 10), endNum = parseInt(end, 10);
                for (let j = startNum; j <= endNum; j++) zones.push(`${state}${format}${j.toString().padStart(3, '0')}`);
            } else zones.push(`${state}${format}${ugcSplit[i]}`);
        }
        return zones.filter(item => item !== '');
    }
}

module.exports = new NoaaWeatherWireServiceUGC();