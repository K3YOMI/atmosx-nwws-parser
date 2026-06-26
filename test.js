const { Manager } = require(`../dist/cjs/index.cjs`)

const Client = new Manager({
    Database: `shapefiles.db`,
    EnableWireService: false,
    EnableJournal: true,
    NOAAWeatherWireServiceSettings: {
        ReconnectionSettings: {
            Enabled: true,
            ReconnectionInterval: 60,
        },
        CredentialSettings: {
            Username: `username`,
            Password: `password`,
            Nickname: "nickname (@atmosx/event-product-parser/3.0)",
        },   
        CacheSettings: {
            Enabled: true,
            MaxDatabaseHistory: 5000,
            MaxRetentionHistory: 555,
        },
        StanzaSettings: {
            DisableUGC: false,
            DisableVTEC: false,
            DisableText: false,
        }
    },
    NationalWeatherServiceSettings: {
        CallbackInterval: 30,
        EventsEndpoint: `https://api.weather.gov/alerts/active`,
    },
    BroadcastifySettings: {
        BroadcastifyAttachments: true,
        BroadcastifyTags: [`Public Safety`, `Amateur Radio`, `Other`, `Rail`, `Aviation`, `Marine`, `Disaster Event`, `Special Event`]
    },
    ListenerSettings: [
        {
            events: [`*Thunderstorm Warning*`, `* Watch`],
            webhook: {
                enabled: true,
                destination: "https://discord.com/api/XXXXXXXXXX/XXXXXXXXXXX",
                title: "AtmosphericX - (Thunderstorm Warnings and Watches)",
                message: "<@&XXXXXXXXXXXXXXXXXXXXX>",
                ratelimit: 1
            },
            uploads: {
                eas: true,
                file: true,
                event: true
            }
        }
    ],
    GlobalSettings: {
        EventManagement: true,
        BetterEventNames: true,
        DisableGeometryParsing: false,
        UseShapefileCoordinates: true,
        SPCWatchesOnly: true,
        ShapefileSkipPoints: 0,
        NodeTTL: 60,
        NodeMinDistance: 120,
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
            NodeLocationFiltering: false,
            IgnoreTestProducts: true,
        },
        ArchiveSettings: {
            TTL: 600,
            EventDirectory: `Storage/EventProducts`,
            TextDirectory: `Storage/TextProducts`,
            EasDirectory: `Storage/EasScenarios`,
            EasToneout: `tone.wav`,
        }
    }
})