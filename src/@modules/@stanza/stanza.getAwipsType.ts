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
import { awips } from "../../@dictionaries/dictionaries.awips"
import { TypeAttributes } from "../../@types/types.attributes"


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
            type: `Unknown Event`, 
            prefix: `--`
        }
    }
    for (const [prefix, type] of Object.entries(awips)) {
        if (attributes.awipsid.startsWith(prefix)) {
            return { type, prefix }
        }
    }
    return { type: `Unknown Event`, prefix: `--` }
}