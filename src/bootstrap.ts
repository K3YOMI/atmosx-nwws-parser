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

import path from 'path'
import { EventEmitter } from 'node:events';

export const bootstrap = {
    version: `3.0.3`,
    isReady: true,
    ratelimits: {},
    session_xmpp: null,
    database: null,
    cron: null,
    listener: new EventEmitter(),
    ansi_colors: {
        RED: `\x1b[31m`, GREEN: `\x1b[32m`, YELLOW: `\x1b[33m`,
        BLUE: `\x1b[34m`, MAGENTA: `\x1b[35m`, CYAN: `\x1b[36m`,
        WHITE: `\x1b[37m`, RESET: `\x1b[0m`
    },
    cache: {
        lastStanza: null,
        isConnected: false,
        isReconnecting: false,
        tReconnects: 0,
        sigHault: false,
        events: {type: "FeatureCollection", features: []},
        nodes: {type: "FeatureCollection", features: []},
        hashes: [],
    },
    settings: {
        Database: path.join(process.cwd(), 'shapefiles.db'),
        EnableWireService: true,
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
        WebhookSettings: [],
        GlobalSettings: {
            EventManagement: true,
            BetterEventNames: true,
            DisableGeometryParsing: false,
            UseShapefileCoordinates: false,
            SPCWatchesOnly: true,
            ShapefileSkipPoints: 15,
            NodeTTL: 60,
            NodeMinDistance: 120,
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
            EASSettings: {
                ArchiveDirectory: null,
                IntroWavFile: null,
            }
        }
    },
}



