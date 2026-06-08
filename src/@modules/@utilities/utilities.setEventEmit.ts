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
import { setTimeoutAction } from "./utilities.setTimeoutAction";
import { setWarning } from "./utilities.setWarning";

interface SetEventEmitOptions { 
    event: string
    metadata: any
    message?: string
    limited?: boolean
}

export const setEventEmit = (options: SetEventEmitOptions): void => {
    if (options.limited) {
        const isTimeout = setTimeoutAction({ identifier: `event.${options.event}`, addTime: true, max: 1, interval: 1 })
        if (isTimeout.limited) return;
    }
    bootstrap.listener.emit(options.event, options.metadata)
    if (options.event != `log`) { bootstrap.listener.emit(`*`, {event: options.event, data: options.metadata}) }
    if (options.message) {
        setWarning({ message: options.message })
    }
}
