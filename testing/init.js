const { Manager } = require(`../dist/cjs/index.cjs`)

const Client = new Manager({
    Database: `shapefiles.db`,
    EnableWireService: false,
    EnableJournal: true,
    EnableDebugging: false,
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
    NotifyServer: {
        Enabled: false,
        Server: "https://ntfy.domainname.com",
        Attachments: "https://domainname.com/Storage/EasScenarios",
        Credentials: {
            Username: "username",
            Password: "password"
        }
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
            notify: {
                enabled: false,
                topic: "thunderstorm_events",
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
                "*Severe Thunderstorm Warning*",
                "*Blizzard*", "*Ice Storm*", "*Winter Storm*", "*Snow Squall*",
                "Tornado Emergency", "*Tornado Warning*",
                "Special Weather Statement", "Marine Weather Statement",
                "*Tsunami*", "*Hurricane*", "*Tropical Storm*", "*Special Marine*",
                "*Flash Flood Warning*", "*Flash Flood Watch*", "*Flash Flood Advisory*",
                "Mesoscale Discussion",
                "*Storm Prediction Center*",
                "PDS Tornado Watch", "Tornado Watch", "Severe Thunderstorm Watch", "Flash Flood Watch", "PDS Severe Thunderstorm Watch",
                "*Administrative*", "National Weather Service Policy",
                "Fire Weather Warning", "Fire Weather Watch", "Fire Weather Advisory",
            ],
            ListeningICAO: [`KLOT`],
            IgnoredICAO: [],
            IgnoredEvents: [],
            ListeningUGC: [`WIC001`],
            ListeningStates: [`MO`, `IA`],
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