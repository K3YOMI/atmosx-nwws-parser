
let loader = require(`../bootstrap.js`);

class NoaaWeatherWireServiceVtec { 
    constructor() {}
    
    getVtec = function(message, attributes) {
        let match = message.match(loader.definitions.expressions.vtec);
        if (!match) return null;
        let splitVTEC = match[0].split(`.`);
		let vtecDates = splitVTEC[6].split(`-`);
        return {
            tracking: this.getTrackingIdentifier(splitVTEC),
            event: this.getEventName(splitVTEC),
            status: this.getEventStatus(splitVTEC),
            wmo: message.match(new RegExp(loader.definitions.expressions.wmo, 'gimu')),
            expires: this.getExpires(vtecDates),
            issued: attributes.issue
        }
    }

    getTrackingIdentifier = function(args) {
        return `${args[2]}-${args[3]}-${args[4]}-${args[5]}`;
    }

    getEventName = function(args) { 
        return `${loader.definitions.events[args[3]]} ${loader.definitions.actions[args[4]]}`;
    }

    getEventStatus = function(args) { 
        return loader.definitions.status[args[1]]
    }
    
    getExpires = function(args) {
		if (args[1] == `000000T0000Z`) return `Invalid Date Format`;
		let expires = `${new Date().getFullYear().toString().substring(0, 2)}${args[1].substring(0, 2)}-${args[1].substring(2, 4)}-${args[1].substring(4, 6)}T${args[1].substring(7, 9)}:${args[1].substring(9, 11)}:00`;
		let local = new Date(new Date(expires).getTime() - 4 * 60 * 60000);
		let pad = n => n.toString().padStart(2, '0');
		return `${local.getFullYear()}-${pad(local.getMonth() + 1)}-${pad(local.getDate())}T${pad(local.getHours())}:${pad(local.getMinutes())}:00.000-04:00`;
    }

   
}

module.exports = new NoaaWeatherWireServiceVtec();