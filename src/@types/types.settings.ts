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


export type TypeSettings = {
    database: string
    is_wire: boolean
    journal: boolean
    noaa_weather_wire_service_settings: {
        reconnection_settings: {
            enabled: boolean
            interval: number
        }
        credentials: {
            username: string | void
            password: string | void
            nickname: string | void
        }
        cache: {
            enabled: boolean
            max_db_history: number
            max_db_cache_size: number
        }
        preferences: {
            disable_ugc: boolean
            disable_vtec: boolean
            disable_text: boolean
            cap_only: boolean
        }
    }
    national_weather_service_settings: {
        interval: number
        endpoint: string
    }
    global_settings: {
        parent_events_only: boolean
        better_event_parsing: boolean
        ignore_geometry_parsing: boolean
        shapefile_coordinates: boolean
        shapefile_skip: number
        filtering: {
            events: string[]
            filtered_icao: string[]
            ignored_icao: string[]
            ignored_events: string[]
            ugc_filter: string[]
            state_filter: string[]
            check_expired: boolean
            ignore_test_products: boolean
        },
        eas_settings: {
            directory: string | void,
            intro_wav: string | void,
        }
    }
}