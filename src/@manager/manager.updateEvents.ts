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

import { getFormattedTime } from "../@modules/@utilities/utilities.getFormattedTime";
import { TypeEvent } from "../@types/type.event";
import { bootstrap } from "../bootstrap"
import { rmEvent } from "./manager.rmEvent";


export const updateEvents = async (selectedEvent?: TypeEvent): Promise<void> => {
    const events = bootstrap.cache.events.features;
    async function update(evt: TypeEvent) {
        if (new Date(evt.properties.expires) < new Date()) {
            rmEvent(evt);
        }
    }
    if (!selectedEvent) { await Promise.all(events.map(async (evt) => { await update(evt) })) } 
    if (selectedEvent) { await update(selectedEvent) }
}