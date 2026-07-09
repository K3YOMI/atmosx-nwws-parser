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

import { TypeEvent } from "../@types/type.event";
import { bootstrap } from "../bootstrap"
import { setEventEmit } from "../@modules/@utilities/utilities.setEventEmit";
import { setTimeoutAction } from "../@modules/@utilities/utilities.setTimeoutAction";
import { updateListener } from "./manager.updateListener";

export const rmEvent = async (event: TypeEvent): Promise<void> => {
    const gSelect = event;
    const gEvent = bootstrap.cache.events.features.find(f => f?.properties?.metadata?.tracking === event?.properties?.metadata?.tracking);
    const gStatement = event.properties.status_metadata.is_statement

    gSelect.properties.expires = new Date().toISOString();
    gSelect.properties.status = `Expired`;
    gSelect.properties.status_metadata.is_expired = true;

    if (gEvent) {
        if (!gStatement) {
            setEventEmit({
                event: `onEventStatus`,
                metadata: {
                    type: `Removed`,
                    event: event
                },
                message: `[Removed] ${event.properties.event} (${event.properties.status}) (${event.properties.metadata.tracking})`
            })
            setEventEmit({ event: `onExpiredProduct`, metadata: event })
        }

        bootstrap.cache.events.features.splice(bootstrap.cache.events.features.indexOf(gEvent), 1);
        bootstrap.cache.hashes = bootstrap.cache.hashes.filter(hash => hash.tracking !== event.properties.metadata.tracking);
        setTimeoutAction({ identifier: event.properties.metadata.tracking, expire: true })
        if (!gStatement) await updateListener(gSelect)
    }
    
    setEventEmit({
        event: `onEventCache`,
        metadata: bootstrap.cache.events,
        limited: true
    })
}