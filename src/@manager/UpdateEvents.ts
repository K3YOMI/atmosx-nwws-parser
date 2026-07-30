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

import { TypeEvent } from "types/Event"
import { bootstrap } from "@bootstrap"
import { SetEventEmit } from "@utilities/SetEventEmit"
import { RemoveEvent } from "@manager/RemoveEvent"

export const UpdateEvents = async (selectedEvent?: TypeEvent): Promise<void> => {
    const events = bootstrap.cache.events.features;
    async function update(event: TypeEvent) {
        if (new Date(event.properties.expires) < new Date()) {
            SetEventEmit({ event: `onExpiredProduct`, metadata: event })
            await RemoveEvent(event, true)
        }
    }
    if (!selectedEvent) { await Promise.all(events.map(async (event) => { await update(event) })) } 
    if (selectedEvent) { await update(selectedEvent) }
}