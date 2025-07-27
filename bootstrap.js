module.exports = {
    cache: {},
    settings: {},
    static: {},
    packages: {},
    definitions: {}
}

module.exports.packages = {
    fs: require(`fs`),
    path: require(`path`),
    events: require(`events`),
    xmpp: require(`@xmpp/client`),
    shapefile: require(`shapefile`),
    xml2js: require(`xml2js`),
    sqlite3: require(`better-sqlite3`),
    mStanza: require(`./modules/stanza.js`),
    mVtec: require(`./modules/vtec.js`),
    mUGC: require(`./modules/ugc.js`),
    mText: require(`./modules/text.js`),
    mEvents: require(`./modules/events.js`),

}

module.exports.definitions = {
    events: { "AF": "Ashfall", "AS": "Air Stagnation", "BH": "Beach Hazard", "BW": "Brisk Wind", "BZ": "Blizzard", "CF": "Coastal Flood", "DF": "Debris Flow", "DS": "Dust Storm", "EC": "Extreme Cold", "EH": "Excessive Heat", "XH": "Extreme Heat", "EW": "Extreme Wind", "FA": "Areal Flood", "FF": "Flash Flood", "FG": "Dense Fog", "FL": "Flood", "FR": "Frost", "FW": "Fire Weather", "FZ": "Freeze", "GL": "Gale", "HF": "Hurricane Force Wind", "HT": "Heat", "HU": "Hurricane", "HW": "High Wind", "HY": "Hydrologic", "HZ": "Hard Freeze", "IS": "Ice Storm", "LE": "Lake Effect Snow", "LO": "Low Water", "LS": "Lakeshore Flood", "LW": "Lake Wind", "MA": "Special Marine", "MF": "Dense Fog", "MH": "Ashfall", "MS": "Dense Smoke", "RB": "Small Craft for Rough Bar", "RP": "Rip Current Risk", "SC": "Small Craft", "SE": "Hazardous Seas", "SI": "Small Craft for Winds", "SM": "Dense Smoke", "SQ": "Snow Squall", "SR": "Storm", "SS": "Storm Surge", "SU": "High Surf", "SV": "Severe Thunderstorm", "SW": "Small Craft for Hazardous Seas", "TO": "Tornado", "TR": "Tropical Storm", "TS": "Tsunami", "TY": "Typhoon", "UP": "Heavy Freezing Spray", "WC": "Wind Chill", "WI": "Wind", "WS": "Winter Storm", "WW": "Winter Weather", "ZF": "Freezing Fog", "ZR": "Freezing Rain", "ZY": "Freezing Spray" },
    actions: { "W": "Warning", "F": "Forecast", "A": "Watch", "O": "Outlook", "Y": "Advisory", "N": "Synopsis", "S": "Statement"},
    status: { "NEW": "Issued", "CON": "Updated", "EXT": "Extended", "EXA": "Extended", "EXB": "Extended", "UPG": "Upgraded", "COR": "Correction", "ROU": "Routine", "CAN": "Cancelled", "EXP": "Expired" },
    awips: { SWOMCD: `mesoscale-discussion`, LSR: `local-storm-report`, SPS: `special-weather-statement`},
    expressions: {
        vtec: `[OTEX].(NEW|CON|EXT|EXA|EXB|UPG|CAN|EXP|COR|ROU).[A-Z]{4}.[A-Z]{2}.[WAYSFON].[0-9]{4}.[0-9]{6}T[0-9]{4}Z-[0-9]{6}T[0-9]{4}Z`,
        wmo: `[A-Z0-9]{6}\\s[A-Z]{4}\\s\\d{6}`,
        ugc1: `(\\w{2}[CZ](\\d{3}((-|>)\\s?(\n\n)?))+)`,
        ugc2: `(\\d{6}(-|>)\\s?(\n\n)?)`,
        dateline: `/\d{3,4}\s*(AM|PM)?\s*[A-Z]{2,4}\s+[A-Z]{3,}\s+[A-Z]{3,}\s+\d{1,2}\s+\d{4}`

    },
    haultingConditions: [
        { error: "not-authorized", message: "You do not have the proper credentials to access this service." },
    ]
}

module.exports.cache = { lastStanza: new Date().getTime(), session: null, isConnected: false, attemptingReconnect: false, totalReconnects: 0 };
module.exports.settings = { databaseDir: module.exports.packages.path.join(process.cwd(), 'shapefiles.db'), cache: false, cap: false };

module.exports.static.events = new module.exports.packages.events.EventEmitter();