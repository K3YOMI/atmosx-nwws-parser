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

import { TypeAttributes } from "types/Attributes"
import { EnumAWIPS } from "@enums/AWIPS"

interface GetAwipsTypeOptions { 
    attributes: TypeAttributes
}

interface GetAwipsTypeResponse { 
    type: string
    prefix: string
    discovered: boolean
}

export const GetAwipsType = (options: GetAwipsTypeOptions): GetAwipsTypeResponse => {
    const attributes = options.attributes;
    if (!attributes.awipsid) { 
        return { 
            type: null, 
            prefix: null,
            discovered: false
        }
    }
    for (const [prefix, type] of Object.entries(EnumAWIPS)) {
        if (attributes.awipsid.startsWith(prefix)) {
            return { type, prefix, discovered: true }
        }
    }
    return { type: options.attributes.awipsid, prefix: options.attributes.awipsid, discovered: false }
}