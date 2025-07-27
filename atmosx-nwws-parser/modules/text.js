class NoaaWeatherWireServiceText { 
    constructor() {}
    
    getString = function(message, string, removeIfExists=[]) {
        let lines = message.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(string)) {
                let start = lines[i].indexOf(string) + string.length, result = lines[i].substring(start).trim();
                for (let j = 0; j < removeIfExists.length; j++) result = result.replace(removeIfExists[j], '');
                return result.replace(string, '').replace(/^\s+|\s+$/g, '').replace('<', '').trim();
            }
        }
        return null;
    }
   
    getOffice = function(message) { 
        return this.getString(message, `National Weather Service`) || this.getString(message, `NWS STORM PREDICTION CENTER `) || null;
    }

    getPolygonCoordinates = function(message) {
        let coordinates = [], latLon = message.match(/LAT\.{3}LON\s+([\d\s]+)/i);
        if (latLon && latLon[1]) {
            let coordStrings = latLon[1].replace(/\n/g, ' ').trim().split(/\s+/);
            for (let i = 0; i < coordStrings.length - 1; i += 2) {
                let lat = parseFloat(coordStrings[i]) / 100, long = -1 * (parseFloat(coordStrings[i + 1]) / 100);
                if (!isNaN(lat) && !isNaN(long)) coordinates.push([long, lat]);
            }
            if (coordinates.length > 2) coordinates.push(coordinates[0]);
        }
        return coordinates;
    }

    getCleanDescription = function(message, vtec) { 
        let dateLineMatches = [...message.matchAll(/\d{3,4}\s*(AM|PM)?\s*[A-Z]{2,4}\s+[A-Z]{3,}\s+[A-Z]{3,}\s+\d{1,2}\s+\d{4}/gim)];
        if (dateLineMatches.length) {
            let dateLineMatch = dateLineMatches[dateLineMatches.length - 1];
            let nwsStart = message.lastIndexOf(dateLineMatch[0]);
            if (nwsStart !== -1) {
                let latStart = message.indexOf("&&", nwsStart);
                message = latStart !== -1 ? message.substring(nwsStart + dateLineMatch[0].length, latStart).trim() : message.substring(nwsStart + dateLineMatch[0].length).trim();
                if (message.startsWith('/')) message = message.substring(1).trim();
            }
        } else {
            let vtecStart = message.indexOf(vtec.raw);
            if (vtecStart !== -1) {
                let afterVtec = message.substring(vtecStart + vtec.raw.length);
                if (afterVtec.startsWith('/')) afterVtec = afterVtec.substring(1);
                let latStart = afterVtec.indexOf("&&");
                message = latStart !== -1 ? afterVtec.substring(0, latStart).trim() : afterVtec.trim();
            }
        }
        return message
    }
}

module.exports = new NoaaWeatherWireServiceText();