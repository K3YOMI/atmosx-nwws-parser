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

import { Bootstrap } from "@Bootstrap"

interface SetTimeoutActionOptions {
    Identifier: string
    AddTime?: boolean
    Max?: number
    Interval?: number
    Expire?: boolean
}

type SetTimeoutActionResponse = {
    Limited: boolean
    Remaining?: number
    Response?: string
}

export const SetTimeoutAction = ({ Identifier, AddTime, Max, Interval, Expire }: SetTimeoutActionOptions): SetTimeoutActionResponse =>  {
    let target = Bootstrap?.Ratelimits?.[Identifier];
    if (!target) {
        Bootstrap.Ratelimits[Identifier] = [];
        target = Bootstrap.Ratelimits[Identifier];
    }
    if (Expire) {
        delete Bootstrap.Ratelimits[Identifier];
        return { Limited: false };
    }
    if (target?.length > 0) {
       Bootstrap.Ratelimits[Identifier] = target.filter((ts: number) => Date.now() - ts < Interval * 1000);
       target = Bootstrap.Ratelimits[Identifier];
    }

    const oldestTimestamp = target?.[0];
    const getWait = oldestTimestamp ? Math.ceil((Interval * 1000) - (Date.now() - oldestTimestamp)) : 0;
    const max = Max ?? 1;
    
    if (target?.length >= max && getWait > 0) {
        return {
            Limited: true,
            Remaining: getWait,
            Response: `You are being rate limited, please wait ${(getWait / 1e3).toFixed(1)} second(s) before performing this action again.`
        }
    }
    Bootstrap.Ratelimits[Identifier].push(Date.now());
    return { Limited: false };
}