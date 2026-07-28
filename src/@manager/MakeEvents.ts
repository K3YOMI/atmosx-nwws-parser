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
import { TypeSettings } from "../@types/Settings";
import { EnumGlobalFilter } from "../@enums/GlobalFilter";
import { bootstrap } from "../bootstrap"
import { SetHash } from "./SetHash";
import { Tasks } from "./Tasks";
import { UpdateNode } from "./UpdateNode";
import { SetEventEmit } from "../@modules/@utilities/SetEventEmit";
import { SetTimeoutAction } from "../@modules/@utilities/SetTimeoutAction";

export const MakeEvents = async (events: TypeEvent[]): Promise<void> => {
    let tasked = [];
    const settings = bootstrap.settings as TypeSettings;
    if (events.length === 0) return
    for (const event of events) {
        const features = bootstrap.cache.events.features;
        const getHash = event.properties.metadata.hash;
        const getTracking = event.properties.metadata.tracking;
        const isEntry = bootstrap.cache.hashes?.find(hash => hash.tracking === getTracking)
        const isHashed = isEntry?.hashes?.includes(getHash) ?? false;
        const isNodeFiltering = settings.GlobalSettings.EventFiltering.NodeLocationFiltering
        const getFeature = features.find(feature => feature.properties.metadata.tracking === getTracking);    
    
        if (isHashed || event.properties.status_metadata.is_expired) return
        SetHash(event, isEntry)
        
        if (isNodeFiltering) {
            await UpdateNode(event);
            if (!event.properties.metadata.filtered_proximity && !EnumGlobalFilter.includes(event.properties.event.toLowerCase())) { 
                return
            }
        }
        
        const isRatelimited = SetTimeoutAction({ identifier: getTracking, interval: 1, max: 1, addTime: true })
        if (!isRatelimited.limited) {
            SetEventEmit({
                event: `onEventStatus`,
                metadata: {
                    type: getFeature ? `Updated` : `New`,
                    event: event
                },
                message: `[${getFeature ? 'Updated' : 'New'}] ${event.properties.event} (${event.properties.status}) (${event.properties.metadata.tracking})`
            })
        }

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
        
                    const mHistory = [...cHistory, ...iHistory].filter((v, i, a) => a.indexOf(v) === i).filter((v, i, a) => a.findIndex(h => h.description === v.description && h.issued === v.issued) === i);
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
                    tasked.push(bootstrap.cache.events.features[getIndex])
                } else { 
                    features.push(event);
                    tasked.push(event)
                }
            }
        }
    }
    await Tasks(tasked)
    SetEventEmit({ event: `onEventCache`, metadata: bootstrap.cache.events, limited: true })
}