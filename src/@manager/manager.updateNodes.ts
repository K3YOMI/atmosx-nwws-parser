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
import { getEventNodes } from "../@building/building.polygon";
import { setEventEmit } from "../@modules/@utilities/utilities.setEventEmit";

export const updateNode = async (selectedEvent?: TypeEvent): Promise<void> => {
    const events = bootstrap.cache.events.features;
    const ttl = bootstrap.settings.GlobalSettings.NodeTTL * 1e3;
    let total = 0;

    async function update(evt: TypeEvent) {
        const lastUpdate = evt?.properties?.metadata?.updated ?? null;
        if (lastUpdate != null && (Date.now() - lastUpdate) < ttl) {
            return evt;
        }
        const node = await getEventNodes(evt);
        if (node.nodes.length > 0) {
            total++
        }
        evt.properties.metadata.nodes = node.nodes
        evt.properties.metadata.filtered_proximity = node.filtered
        evt.properties.metadata.updated = node.updated
    }
    if (!selectedEvent) { await Promise.all(events.map(async (evt) => { await update(evt) })) } 
    if (selectedEvent) { await update(selectedEvent) }
    if (total > 0) {
        setEventEmit({
            event: `onNodeUpdate`,
            metadata: {
                type: `global-update`,
                updated: total
            },
        })
    }
}