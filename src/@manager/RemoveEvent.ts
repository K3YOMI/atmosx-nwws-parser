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
import { EnumStrings } from "@enums/Strings"
import { bootstrap } from "@bootstrap"
import { SetEventEmit } from "@utilities/SetEventEmit"
import { SetTimeoutAction } from "@utilities/SetTimeoutAction"
import { Tasks } from "@manager/Tasks"


export const RemoveEvent = async (event: TypeEvent, isTimeBasedExpiration: boolean):Promise<void> => {
    const gTracking = event.properties.metadata.tracking;
    const isTrackingEventLogged = bootstrap.cache.events.features
        .find(f => f?.properties?.metadata?.tracking === gTracking);
    const isStatement = event.properties.status_metadata.is_statement;

    if (isTrackingEventLogged) { 
        event.properties.expires = new Date().toISOString();
        event.properties.status = `Expired`;
        event.properties.status_metadata.is_expired = true;

        const description = isTimeBasedExpiration ? EnumStrings.cancellation
            .replace(`{SENDER}`, event.properties.geocode.office.name)
            .replace(`{EVENT}`, event.properties.event) : event.properties.description
        event.properties.description = description; 
        event.properties.metadata.raw = isTimeBasedExpiration ? description : event.properties.metadata.raw;
        event.properties.metadata.history.push({
            description: isTimeBasedExpiration ? description : event.properties.description,
            issued: event.properties.expires,
            status: event.properties.status
        })

        bootstrap.cache.events.features
            .splice(bootstrap.cache.events.features.indexOf(isTrackingEventLogged), 1);
        bootstrap.cache.hashes = bootstrap.cache.hashes
            .filter(hash => hash.tracking !== gTracking);

        if (!isStatement) { 
            SetEventEmit({
                event: `onEventStatus`,
                metadata: { type: `Removed`, event: event },
                message: `[Removed] ${event.properties.event} (${event.properties.status}) (${gTracking})`
            })
            await Tasks([event])
        }
        SetTimeoutAction({ identifier: gTracking, expire: true })
    }
    SetEventEmit({
        event: `onEventCache`,
        metadata: bootstrap.cache.events,
        limited: true
    })
}