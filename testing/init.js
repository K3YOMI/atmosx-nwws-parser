const { Manager } = require(`../dist/cjs/index.cjs`)

const Client = new Manager({
    Database: `event-product-parser.db`,
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
            MaxDatabaseHistory: 50000,
            MaxRetentionHistory: 1500,
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
        BroadcastifyDatabase: `https://scriptkitty.cafe/ftp/@atmosphericx/assets/broadcastify.json`,
        BroadcastifyTags: [`Public Safety`, `Amateur Radio`, `Other`, `Rail`, `Aviation`, `Marine`, `Disaster Event`, `Special Event`]
    },
    NotifyServer: {
        Enabled: false,
        Server: "https://ntfy.scriptkitty.cafe",
        Attachments: "https://scriptkitty.cafe/ftp/@bucket/EAS/encoded",
        Credentials: {
            Username: "username",
            Password: "password"
        }
    },
    ListenerSettings: [
        {
            Events: ["*Extreme Heat Warning*"],
            NotificationServer: {
                Enabled: false,
                Topic: "heat-warnings",
                Priority: 5
            },
            Uploads: {
                EAS: true,
                File: true,
                JSON: true
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
        NodeMinDistance: 125,
        EventFiltering: {
            ListeningEvents: [
               "*Warning*"
            ],
            ListeningICAO: [],
            ListeningUGC: [],
            ListeningStates: [],
            IgnoredICAO: [],
            IgnoredEvents: [],
            NodeLocationFiltering: false,
            IgnoreTestProducts: true,
        },
        ArchiveSettings: {
            TTL: 30,
            EventDirectory: `@bucket/ParsedProducts`,
            TextDirectory: `@bucket/RawTextProducts`,
            EasDirectory: `@bucket/EAS`,
            EasToneout: `eas-toneout.wav`,
        }
    }
})
