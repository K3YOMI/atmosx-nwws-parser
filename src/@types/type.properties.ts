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

import { TypeAttributes } from "./type.attributes";
    
export type TypeEventProperties = {
    locations: string
    description: string
    attributes?: TypeAttributes
    geocode: {
        office: {
            name: string 
            office: string
        }
        organization: string
        ugc: string[]
        polygon: string
        polygon_generated: boolean
    }
    parameters?: {
        tags: string[]
        instructions: string
        source: string
        hazards: string
        impacts: string
        estimated_hail_size: string
        estimated_wind_gusts: string
        damage_threat: string
        tornado_threat: string
        flood_threat: string
        wind_threat: string
        hail_threat: string
        max_hail_inches?: string
        max_wind_gusts_surface_knots?: string
        max_tops_x100feet?: string
        mean_storm_motion_vector?: string
        particularly_dangerous_situation?: string
    }
    watch_parameters?: {
        watch_number: string
        watch_type: string
        additional_tornadoes_probability: string
        strong_tornadoes_probability: string
        severe_wind_probability: string
        severe_hail_probability: string
        hail_2in_probability: string
        combined_hail_wind_probability: string
        max_hail_in: string
        max_wind_surface: string
        max_tops_x100feet: string
        pds_watch: boolean
    }
    spc_parameters?: {
        spc_number: string
        spc_concerning: string
        spc_max_tornado: string
        spc_max_hail: string
        spc_max_wind: string
        spc_watch_issuance: string
    }
}