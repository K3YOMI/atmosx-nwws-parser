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

import { TypeEvent } from "../@types/Event";
import { bootstrap } from "../bootstrap"
import { GetEventNodes } from "../@building/GetEventNodes";
import { SetEventEmit } from "../@modules/@utilities/SetEventEmit";

export const UpdateNode = async (selectedEvent?: TypeEvent): Promise<void> => {
    const events = bootstrap.cache.events.features;
    const ttl = bootstrap.settings.GlobalSettings.NodeTTL * 1e3;
    let total = 0;

    const TTLEvents = selectedEvent ? [selectedEvent] : events.filter((evt) => {
        const lastUpdate = evt?.properties?.metadata?.updated ?? null;
        return lastUpdate == null || (Date.now() - lastUpdate) >= ttl;
    });

    if (TTLEvents.length === 0) return;

    async function update(evt: TypeEvent) {
        const node = await GetEventNodes(evt);
        if (node.nodes.length > 0) {
            total++;
        }
        evt.properties.metadata.nodes = node.nodes;
        evt.properties.metadata.filtered_proximity = node.filtered;
        evt.properties.metadata.updated = node.updated;
    }

    const concurrency = 4;
    for (let index = 0; index < TTLEvents.length; index += concurrency) {
        const batch = TTLEvents.slice(index, index + concurrency);
        await Promise.all(batch.map((evt) => update(evt)));
    }

    if (total > 0) {
        SetEventEmit({
            event: `onNodeUpdate`,
            metadata: {
                type: `global-update`,
                updated: total
            },
        })
    }
}