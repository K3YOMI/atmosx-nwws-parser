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

import { TypeStanzaCompiled } from "../@types/types.compiled";
import { TypePVTEC } from "../@types/types.pvtec";
import { TypeUGC } from "../@types/types.ugc";

interface GetExpiryDateOptions { 
    vtec?: TypePVTEC
    ugc?: TypeUGC
}

export const getExpiryDate = (options: GetExpiryDateOptions): string => {
    const time = options?.vtec?.expires && !isNaN(new Date(options.vtec.expires).getTime()) ? 
        new Date(options.vtec.expires).toISOString() : (options?.ugc?.expires != null ? new Date(options.ugc.expires).toISOString() : new Date(new Date().getTime() + 12 * 60 * 60 * 1000).toISOString())
    if (isNaN(new Date(time).getTime())) {
        return `Until Further Notice`
    }
    return time;
}   