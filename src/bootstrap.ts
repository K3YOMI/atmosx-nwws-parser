/*
              _                             _               _     __   __
         /\  | |                           | |             (_)    \ \ / /
        /  \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ _  ___ \ V / 
       / /\ \| __| '_ ` _ \ / _ \/ __| '_ \| '_ \ / _ \ '__| |/ __| > <  
      / ____ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ |  | | (__ / . \ 
     /_/    \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  |_|\___/_/ \_\
                                     | |                            
                                     |_|                                                                                                                

    Created with ♥ by the AtmosphericX Team (KiyoWx, StarflightWx, Everwatch1, & CJ Ziegler)
    Discord: https://atmosphericx-discord.scriptkitty.cafe
    Ko-Fi: https://ko-fi.com/k3yomi
    Documentation: http://localhost/documentation | https://atmosphericx.scriptkitty.cafe/documentation

    Internal Package: @atmosx/event-product-parser

*/

import path from 'path'
import { EventEmitter } from 'node:events';

export const bootstrap = {
    isReady: true,
    ratelimits: {},
    session_xmpp: null,
    database: null,
    listener: new EventEmitter(),
    ansi_colors: {
        RED: `\x1b[31m`, GREEN: `\x1b[32m`, YELLOW: `\x1b[33m`,
        BLUE: `\x1b[34m`, MAGENTA: `\x1b[35m`, CYAN: `\x1b[36m`,
        WHITE: `\x1b[37m`, RESET: `\x1b[0m`
    },
    cache: {
        lastStanza: null,
        lastConnect: null,
        isConnected: false,
        isReconnecting: false,
        tReconnects: 0,
        sigHault: false,
        events: {type: "FeatureCollection", features: []},
        watches: {type: "FeatureCollection", features: []}
    },
    settings: {
        database: path.join(process.cwd(), 'shapefiles.db'),
        is_wire: true,
        journal: true,
        noaa_weather_wire_service_settings: {
            reconnection_settings: {
                enabled: true,
                interval: 60,
            },
            credentials: {
                username: null,
                password: null,
                nickname: "@atmosx/event-product-parser/3.0",
            },   
            cache: {
                enabled: true,
                max_db_history: 5000,
                max_db_cache_size: 1000,
            },
            preferences: {
                disable_ugc: false,
                disable_vtec: false,
                disable_text: false,
                cap_only: false,
            }
        },
        national_weather_service_settings: {
            interval: 15,
            endpoint: `https://api.weather.gov/alerts/active`,
        },
        global_settings: {
            parent_events_only: true,
            better_event_parsing: true,
            ignore_geometry_parsing: false,
            shapefile_coordinates: false,
            shapefile_skip: 15,
            filtering: {
                events: [],
                filtered_icao: [],
                ignored_icao: [],
                ignored_events: [`Xx`, `Test Message`],
                ugc_filter: [],
                state_filter: [],
                check_expired: true,
                ignore_test_products: true,
            },
            eas_settings: {
                directory: null,
                intro_wav: null,
            }
        }
    },
}



