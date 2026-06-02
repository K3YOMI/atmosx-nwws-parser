const { Manager, setSettings, getSettings, getListener } = require(`../dist/cjs/index.cjs`)

const NOAAWeatherWireService = new Manager({
    database: `shapefile-manager.db`,
    EnableWireService: true,
    EnableJournal: false,
    NOAAWeatherWireServiceSettings: {
        ReconnectionSettings: {
            Enabled: true,
            ReconnectionInterval: 60,
        },
        CredentialSettings: {
            Username: `username_here`,
            Password: `password_here`,
            Nickname: "nick_name_here (@atmosx/event-product-parser/3.0)",
        },   
        CacheSettings: {
            Enabled: true,
            MaxDatabaseHistory: 15000,
            MaxRetentionHistory: 500,
        },
        StanzaSettings: {
            DisableUGC: false,
            DisableVTEC: false,
            DisableText: false,
        }
    },
    NationalWeatherServiceSettings: {
        CallbackInterval: 15,
        EventsEndpoint: `https://api.weather.gov/alerts/active`,
    },
    GlobalSettings: {
        BetterEventNames: true,
        DisableGeometryParsing: false,
        UseShapefileCoordinates: true,
        EventFiltering: {
            ListeningEvents: [
                "Tornado Emergency", "PDS Tornado Warning", "Tornado Warning",
                "Confirmed Tornado Warning", "Radar Indicated Tornado Warning",
                "Special Marine Warning (TPROB)", "PDS Tornado Watch", "Tornado Watch",
                "EDS Severe Thunderstorm Warning (TPROB)", "EDS Severe Thunderstorm Warning",
                "Destructive Severe Thunderstorm Warning (TPROB)", "Destructive Severe Thunderstorm Warning",
                "Considerable Severe Thunderstorm Warning (TPROB)", "Considerable Severe Thunderstorm Warning",
                "Severe Thunderstorm Warning (TPROB)", "Severe Thunderstorm Warning",
                "Severe Thunderstorm Watch",
                "Flash Flood Emergency", "Flash Flood Warning",
                "Flash Flood Watch",
                "Tsunami Warning", "Tsunami Watch",
                "Tsunami Advisory", "Special Marine Warning",
                "Earthquake Warning",
                "Hurricane Warning", "Hurricane Watch",
                "Tropical Storm Warning",
                "Winter Storm Warning", "Blizzard Warning",
                "Ice Storm Warning", "Snow Squall Warning",
                "Winter Weather Advisory", "Extreme Cold Watch"
            ],
            ListeningICAO: [],
            IgnoredICAO: [],
            IgnoredEvents: [],
            ListeningUGC: [],
            ListeningStates: [],
            IgnoreTestProducts: true,
        },
        EASSettings: {
            ArchiveDirectory: null,
            IntroWavFile: null,
        }
    }
})


NOAAWeatherWireService.on(`log`, (data) => {
    console.log(data)
})

NOAAWeatherWireService.on(`onEventStatus`, (data) => { 
    console.log(`[${data.type}]: ${data.event.properties.event} (${data.event.properties.status}) (${data.event.properties.metadata.tracking})`)
})