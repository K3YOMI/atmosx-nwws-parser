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

import { dict_regexp } from "../../@dictionaries/dictionaries.regexp";

interface GetDescriptionFromProductOptions { 
    message: string
    handle?: string
}

export const getDescriptionFromProduct = (options: GetDescriptionFromProductOptions): string => {
    let message = options.message;
    const dates = Array.from(message.matchAll(dict_regexp.dateline));
    if (dates.length) {
        const lastMatch = dates[dates.length - 1][0];
        const sIndx = message.lastIndexOf(lastMatch);
        if (sIndx !== -1) {
            const endIndx = message.indexOf('&&', sIndx);
            message = message.substring(sIndx + lastMatch.length, endIndx !== -1 ? endIndx : undefined).trimStart();
            if (message.startsWith('/')) message = message.slice(1).trimStart();
            if (options.handle && message.includes(options.handle)) {
                const handleIdx = message.indexOf(options.handle);
                message = message.substring(handleIdx + options.handle.length).trimStart();
                if (message.startsWith('/')) message = message.slice(1).trimStart();
            }
        }
    } else if (options.handle) {
        const handleIndx = message.indexOf(options.handle);
        if (handleIndx !== -1) {
            let afterHandle = message.substring(handleIndx + options.handle.length).trimStart();
            if (afterHandle.startsWith('/')) afterHandle = afterHandle.slice(1).trimStart();
            const latEnd = afterHandle.indexOf('&&')
            message = latEnd !== -1 ? afterHandle.substring(0, latEnd).trim() : afterHandle.trim();
        }
    }
    return message.trim();
}