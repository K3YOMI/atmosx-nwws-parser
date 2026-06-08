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
import { TypeEvent } from "../@types/type.event";
import { bootstrap } from "../bootstrap"
import { setHash } from "./manager.setHash";
import { updateWebhooks } from "./manager.updateWebhooks";
import { updateNode } from "./manager.updateNodes";
import { TypeSettings } from "../@types/types.settings";

export const mkEvent = async (event: TypeEvent): Promise<void> => {
    const settings = bootstrap.settings as TypeSettings;
    const features = bootstrap.cache.events.features;
    const map = new Map<string, typeof features[0]>();
    
    for (const f of features) {
        const key = f?.properties?.metadata?.tracking;
        if (!key) continue;
        map.set(key, f);
    }
    
    const getHash = event.properties.metadata.hash;
    const getTracking = event.properties.metadata.tracking;
    const isEntry = bootstrap.cache.hashes?.find(hash => hash.tracking === getTracking)
    const isHashed = isEntry?.hashes?.includes(getHash) ?? false;
    const getFeature = map.get(getTracking);
    
    if (isHashed || event.properties.status_metadata.is_expired) return
    await setHash(event, isEntry)
    const isFilteredLocation = await updateNode(event).then(() => event.properties.metadata.filtered_proximity);
    if (!isFilteredLocation && settings.GlobalSettings.EventFiltering.NodeLocationFiltering) { return }

    setEventEmit({
        event: `onEventStatus`,
        metadata: {
            type: getFeature ? `Updated` : `New`,
            event: event
        },
        message: `[${getFeature ? 'Updated' : 'New'}] ${event.properties.event} (${event.properties.status}) (${event.properties.metadata.tracking})`
    })
    if (settings.GlobalSettings.EventManagement) {
        if (event.properties.status_metadata.is_issued || event.properties.status_metadata.is_updated) {
            if (getFeature) { 
                const getIndex = features.indexOf(getFeature);
                const cHistory = getFeature?.properties?.metadata?.history ?? [];
                const cLocations = getFeature?.properties?.locations?.split(";").map((l: string) => l.trim()) ?? [];
                const cUgc = getFeature?.properties?.geocode?.ugc ?? [];
    
                const iHistory = event.properties?.metadata?.history ?? [];
                const iLocations = event.properties?.locations?.split(";").map((l: string) => l.trim()) ?? [];
                const iUgc = event.properties?.geocode?.ugc ?? [];
    
                const mHistory = [...cHistory, ...iHistory].filter((v, i, a) => a.indexOf(v) === i);
                const mLocations = [...cLocations, ...iLocations].filter((v, i, a) => a.indexOf(v) === i).join('; ');
                const mUgc = [...cUgc, ...iUgc].filter((v, i, a) => a.indexOf(v) === i);
    
                bootstrap.cache.events.features[getIndex] = {
                    ...event,
                    properties: {
                        ...event.properties,
                        metadata: {
                            ...event?.properties?.metadata,
                            history: mHistory
                        },
                        locations: mLocations,
                        geocode: {
                            ...event?.properties?.geocode,  
                            ugc: mUgc
                        },
                    }
                };
            } else { 
                features.push(event)
            }
        }
    }
    updateWebhooks(event)
}