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

import { Bootstrap } from "@bootstrap"
import { SetTimeoutAction } from "@utilities/SetTimeoutAction"
import { SetWarning } from "@utilities/SetWarning"

interface SetEventEmitOptions { 
    Event: string
    Metadata: any
    Message?: string
    Limited?: boolean
}

export const SetEventEmit = ({ Event, Metadata, Message, Limited }: SetEventEmitOptions): void => {
    if (Limited) {
        const isTimeout = SetTimeoutAction({ Identifier: `event.${Event}`, AddTime: true, Max: 1, Interval: 1 })
        if (isTimeout.Limited) return;
    }
    Bootstrap.Listener.emit(Event, Metadata)
    if (Event != `log`) { Bootstrap.Listener.emit(`*`, {event: Event, data: Metadata}) }
    if (Message) {
        SetWarning({ Message: Message })
    }
}
