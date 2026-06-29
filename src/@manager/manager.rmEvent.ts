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

import { setEventEmit } from "../@modules/@utilities/utilities.setEventEmit";
import { setTimeoutAction } from "../@modules/@utilities/utilities.setTimeoutAction";
import { TypeEvent } from "../@types/type.event";
import { bootstrap } from "../bootstrap"
import { updateListener } from "./manager.updateListener";

export const rmEvent = async (event: TypeEvent): Promise<void> => {
    const getEvent = bootstrap.cache.events.features.find(f => f?.properties?.metadata?.tracking === event?.properties?.metadata?.tracking);
    const cachedStatus = event.properties.status;
    event.properties.expires = new Date().toISOString();
    event.properties.status = `Expired`;
    event.properties.status_metadata.is_expired = true;
    if (getEvent) {
        setEventEmit({
            event: `onEventStatus`,
            metadata: {
                type: `Removed`,
                event: event
            },
            message: `[Removed] ${event.properties.event} (${event.properties.status}) (${event.properties.metadata.tracking})`
        })
        setEventEmit({ event: `onExpiredProduct`, metadata: event })
        if (cachedStatus != `Statement`) await updateListener(event)
        bootstrap.cache.events.features.splice(bootstrap.cache.events.features.indexOf(getEvent), 1);
        bootstrap.cache.hashes = bootstrap.cache.hashes.filter(hash => hash.tracking !== event.properties.metadata.tracking);
        setTimeoutAction({ identifier: event.properties.metadata.tracking, expire: true })
    }
    setEventEmit({
        event: `onEventCache`,
        metadata: bootstrap.cache.events,
        limited: true
    })
}