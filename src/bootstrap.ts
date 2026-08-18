/*
              _                             _               _     __   __
         /\  | |                           | |             (_)    \ \ / /
        /  \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ _  ___ \ V / 
       / /\ \| __| '_ ` _ \ / _ \/ __| '_ \| '_ \ / _ \ '__| |/ __| > <  
      / ____ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ |  | | (__ / . \ 
     /_/    \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  |_|\___/_/ \_\
                                     | |                            
                                     |_|                                                                                                                

    Created with ♥ by the AtmosphericX Team (KiyoWx, StarflightWx, & CJ Ziegler)
    Discord: https://atmosphericx-discord.scriptkitty.cafe
    Ko-Fi: https://ko-fi.com/k3yomi
    Documentation: http://localhost/documentation | https://atmosphericx.scriptkitty.cafe/documentation

    Internal Package: @atmosx/event-product-parser

*/

import path from "path"
import { EventEmitter } from "node:events"

export const Bootstrap = {
    Version: `3.0.63`,
    Ready: true,
    Ratelimits: {},
    Session: null,
    Database: null,
    Job: null,
    Listener: new EventEmitter(),
    Colors: {
        Red: `\x1b[31m`, Green: `\x1b[32m`, Yellow: `\x1b[33m`,
        Blue: `\x1b[34m`, Magenta: `\x1b[35m`, Cyan: `\x1b[36m`,
        White: `\x1b[37m`, Reset: `\x1b[0m`
    },
    Cache: {
        LastStanzaTime: null,
        Connected: false,
        Reconnecting: false,
        TotalReconnects: 0,
        Hault: false,
        Events: {type: "FeatureCollection", features: []},
        Nodes: {type: "FeatureCollection", features: []},
        Hashes: [],
        Parsed: [],
        UGC: new Map<string, string[]>()
    },
    Settings: {
        Database: path.join(process.cwd(), 'shapefiles.db'),
        EnableWireService: false,
        EnableDebugging: false,
        EnableJournal: true,
        NOAAWeatherWireServiceSettings: {
            ReconnectionSettings: {
                Enabled: true,
                ReconnectionInterval: 60,
            },
            CredentialSettings: {
                Username: null,
                Password: null,
                Nickname: "@atmosx/event-product-parser/3.0",
            },   
            CacheSettings: {
                Enabled: true,
                MaxDatabaseHistory: 5000,
                MaxRetentionHistory: 1000,
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
        BroadcastifySettings: {
            BroadcastifyAttachments: true,
            BroadcastifyDatabase: `https://scriptkitty.cafe/ftp/@atmosphericx/assets/broadcastify.json`,
            BroadcastifyTags: [`Ham`, `Air`, `Fire`, `Public Safety`, `Weather`, `EMS`, `Police`, `Rail`]
        },
        NotifyServer: {
            Enabled: false,
            Server: `https://ntfy.sh`,
            Timezone: "UTC",
            MediaStorage: {
                EAS: null,
                TEXT: null,
                JSON: null,
            },
            Credentials: {
                Username: null,
                Password: null
            }
        },
        ActionSettings: [],
        GlobalSettings: {
            EventManagement: true,
            DisableGeometryParsing: false,
            UseShapefileCoordinates: true,
            SPCWatchesOnly: true,
            ShapefileSkipPoints: 15,
            NodeTTL: 60,
            NodeMaxDistance: 120,
            EventFiltering: {
                ListeningEvents: [],
                ListeningICAO: [],
                ListeningUGC: [],
                ListeningStates: [],
                IgnoredICAO: [],
                IgnoredEvents: [`Test Message`],
                NodeLocationFiltering: false,
                IgnoreTestProducts: true,
            },
            ArchiveSettings: {
                TTL: 60,
                JSONDirectory: null,
                TextDirectory: null,
                EasDirectory: null,
                EasToneout: null
            }
        }
    },
}



