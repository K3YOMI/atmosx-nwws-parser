

let loader = require(`../bootstrap.js`);

class NoaaWeatherWireServiceUGC { 
    constructor() {}
    
    getUGC = async function(message) {
        let header = this.getHeader(message);
        let zones = this.getZones(header);
        let locations = await this.getLocations(zones)
        let ugc = zones.length > 0 ? { zones, locations} : null;
        return ugc
    }

    getLocations = async function(zones) {
        let locations = [];
        for (let i = 0; i < zones.length; i++) {
            let id = zones[i].trim();
            let located = await loader.static.db.prepare(`SELECT location FROM shapefiles WHERE id = ?`).get(id);
            if (located && located.location) {
                locations.push(located.location);
            } else {
                locations.push(id);
            }
        }     
         return Array.from(new Set(locations));
    }

    getCoordinates = async function(zones) {
        let coordinates = [];
        for (let i = 0; i < zones.length; i++) {
            let id = zones[i].trim();
            let located = await loader.static.db.prepare(`SELECT geometry FROM shapefiles WHERE id = ?`).get(id);
            if (located.length > 0) {
                let geometry = JSON.parse(located[0].geometry);
                if (geometry?.type == 'Polygon') {
                    coordinates.push(...geometry.coordinates[0].map(coord => [coord[0], coord[1]]));
                    break;
                }
            }
        }
        return coordinates;
    }

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

    getHeader = function(message) {
        let start = message.search(new RegExp(loader.definitions.expressions.ugc1, "gimu"));
        let end = message.substring(start).search(new RegExp(loader.definitions.expressions.ugc2, "gimu"));
        let full = message.substring(start, start + end).replace(/\s+/g, '').slice(0, -1);
        return full;
    }

    

}

module.exports = new NoaaWeatherWireServiceUGC();