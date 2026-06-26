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

import { TypeAttributes } from "../../@types/type.attributes"
import { dict_awips } from "../../@dictionaries/dictionaries.awips"

interface ValidateOptions { 
    attributes: TypeAttributes
}

interface ValidiateResponse { 
    type: string
    prefix: string
}

export const getAwipsType = (options: ValidateOptions): ValidiateResponse => {
    const attributes = options.attributes;
    if (!attributes.awipsid) { 
        return { 
            type: null, 
            prefix: null
        }
    }
    for (const [prefix, type] of Object.entries(dict_awips)) {
        if (attributes.awipsid.startsWith(prefix)) {
            return { type, prefix }
        }
    }
    return { type: null, prefix: null }
}