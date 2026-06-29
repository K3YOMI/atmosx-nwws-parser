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

import { bootstrap } from "../../bootstrap"

interface SetTimeoutActionOptions {
    identifier: string
    addTime?: boolean
    max?: number
    interval?: number
    expire?: boolean
}

type SetTimeoutActionResponse = {
    limited: boolean
    remaining?: number
    response?: string
}

export const setTimeoutAction = (options: SetTimeoutActionOptions): SetTimeoutActionResponse =>  {
    let target = bootstrap?.ratelimits?.[options?.identifier];
    if (!target) {
        bootstrap.ratelimits[options?.identifier] = [];
        target = bootstrap.ratelimits[options?.identifier];
    }
    if (options?.expire) {
        delete bootstrap.ratelimits[options?.identifier];
    }
    if (target?.length > 0) {
       bootstrap.ratelimits[options?.identifier] = target.filter((ts: number) => Date.now() - ts < options?.interval * 1000);
       target = bootstrap.ratelimits[options?.identifier];
    }

    const oldestTimestamp = target?.[0];
    const getWait = oldestTimestamp ? Math.ceil((options?.interval * 1000) - (Date.now() - oldestTimestamp)) : 0;
    const max = options?.max ?? 1;
    
    if (target?.length >= max && getWait > 0) {
        return {
            limited: true,
            remaining: getWait,
            response: `You are being rate limited, please wait ${(getWait / 1e3).toFixed(1)} second(s) before performing this action again.`
        }
    }
    bootstrap.ratelimits[options?.identifier].push(Date.now());
    return { limited: false };
}