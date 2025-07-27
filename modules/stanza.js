let loader = require(`../bootstrap.js`);

class NoaaWeatherWireServiceStanza { 
    constructor() {}

    newStanza = function(stanza, isDebug=false) {
        try {
            if (isDebug != false) {
                let message = isDebug.stanza
                let attributes = isDebug.attrs;
                let isCap = message.includes(`<?xml version="1.0"`)
                let hasCapArea = message.includes(`<areaDesc>`);
                let hasVtec = message.match(loader.definitions.expressions.vtec) != null;
                let getId = this.getAwipsType(attributes)
                return { message: message, attributes: attributes, isCap: isCap, hasCapArea: hasCapArea, hasVtec: hasVtec, id: getId, ignore: false } 
            }
            if (stanza.is(`message`)) { 
                let cb = stanza.getChild(`x`);
                if (cb?.children) {
                    let message = cb.children[0];
                    let attributes = cb.attrs;
                    let isCap = message.includes(`<?xml version="1.0"`)
                    let hasCapArea = message.includes(`<areaDesc>`);
                    let hasVtec = message.match(loader.definitions.expressions.vtec) != null;
                    let getId = this.getAwipsType(attributes)
                    this.saveCache(message, getId, isCap)
                    return { message: message, attributes: attributes, isCap: isCap, hasCapArea: hasCapArea, hasVtec: hasVtec, id: getId, ignore: false }
                }
            }
            return { message: null, arrtributes: null, isCap: null, hasCapArea: null, hasVtec: null, id: null, ignore: true}
        } catch (error) {
            return { message: null, arrtributes: null, isCap: null, hasCapArea: null, hasVtec: null, id: null, ignore: true }
        }
    }

    getAwipsType = function(attributes) {
        if (!attributes || !attributes.awipsid) return `unknown`;
        for (let [prefix, type] of Object.entries(loader.definitions.awips)) { if (attributes.awipsid.startsWith(prefix)) return type; }
        return `default`;
    }

    saveCache = function(message, type, isCap) { 
        if (!loader.settings.cache) return;
        loader.packages.fs.appendFileSync(`${loader.settings.cache}/nwws-raw-category-${type}s-${isCap ? 'cap' : 'raw'}.bin`, `=================================================\n${new Date().toISOString().replace(/[:.]/g, '-')}\n=================================================\n\n${message}`, `utf8`);
    }


    createNewAlert = async function(stanza) { 
        let type = stanza.id
        let cap = stanza.isCap;
        let vtec = stanza.hasVtec; 
        if (type == `default` && vtec && !cap) { loader.packages.mEvents.alert(stanza); return; }
        if (type == `default` && vtec && cap) { loader.packages.mEvents.cap(stanza); return; }
        if (type == `special-weather-statement`) { loader.packages.mEvents.special(stanza); return; }



    }

   
}

module.exports = new NoaaWeatherWireServiceStanza();