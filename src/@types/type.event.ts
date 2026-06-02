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

import { TypeEventProperties as BaseTypeEventProperties } from "./type.properties";
import { TypeHVTEC } from "../@types/types.hvtec";

export type TypeEvent = {
    type: string
    geometry: {
        type: string
        coordinates: number[][]
    }
    properties: {
        event: string
        parent: string
        status: string
        issued: string
        expires: string
        status_metadata?: {
            is_issued?: boolean
            is_updated?: boolean
            is_expired?: boolean
            is_test?: boolean
        }
        metadata: {
            ms: number
            source: string
            tracking: string
            hash?: string
            header: string
            vtec: string
            hvtec: TypeHVTEC[]
            history: {
                description: string
                issued: string
                status: string
            }[]
        }
    } & BaseTypeEventProperties
}