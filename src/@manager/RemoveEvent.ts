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

import { TypeEvent } from "types-lower/Event"
import { EnumStrings } from "@enums/Strings"
import { Bootstrap } from "@bootstrap"
import { SetEventEmit } from "@utilities/SetEventEmit"
import { SetTimeoutAction } from "@utilities/SetTimeoutAction"
import { CreateTasks } from "@tasks/CreateTasks"

interface RemoveEventOptions {
    Event: TypeEvent
    IsTimeBasedExpiration: boolean
}

export const RemoveEvent = async ({ Event, IsTimeBasedExpiration }: RemoveEventOptions):Promise<void> => {
    const gTracking = Event.properties.metadata.tracking;
    const isTrackingEventLogged = Bootstrap.Cache.Events.features
        .find(f => f?.properties?.metadata?.tracking === gTracking);
    const isStatement = Event.properties.status_metadata.is_statement;

    if (isTrackingEventLogged) { 
        Event.properties.expires = new Date().toISOString();
        Event.properties.status = `Expired`;
        Event.properties.status_metadata.is_expired = true;

        const description = IsTimeBasedExpiration ? EnumStrings.cancellation
            .replace(`{SENDER}`, Event.properties.geocode.office.name)
            .replace(`{EVENT}`, Event.properties.event) : Event.properties.description
        Event.properties.description = description; 
        Event.properties.metadata.raw = IsTimeBasedExpiration ? description : Event.properties.metadata.raw;
        Event.properties.metadata.history.push({
            description: IsTimeBasedExpiration ? description : Event.properties.description,
            issued: Event.properties.expires,
            status: Event.properties.status
        })
        
        Bootstrap.Cache.Events.features
            .splice(Bootstrap.Cache.Events.features.indexOf(isTrackingEventLogged), 1);
        Bootstrap.Cache.Hashes = Bootstrap.Cache.Hashes
            .filter(hash => hash.tracking !== gTracking);

        if (!isStatement) { 
            SetEventEmit({
                Event: `onEventStatus`,
                Metadata: { type: `Removed`, event: Event },
                Message: `[Removed] ${Event.properties.event} (${Event.properties.status}) (${gTracking})`
            })
            CreateTasks([Event])
        }
        SetTimeoutAction({ Identifier: gTracking, Expire: true })
    }
    SetEventEmit({
        Event: `onEventCache`,
        Metadata: Bootstrap.Cache.Events,
        Limited: true
    })
}