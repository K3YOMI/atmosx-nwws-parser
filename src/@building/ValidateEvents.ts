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
import { bootstrap } from "../bootstrap"
import { GetEventEnhancedName } from "./GetEventEnhancedName";
import { GetEventSignature } from "./GetEventSignature"
import { MakeEvent } from "../@manager/MakeEvent";
import { RemoveEvent } from "../@manager/RemoveEvent";
import { GetEventAttachments } from "./GetEventAttachments";
import { UpdateNode } from "../@manager/UpdateNode";
import { SetEventEmit } from "../@modules/@utilities/SetEventEmit";
import { SetDebug } from "../@modules/@utilities/SetDebug";
import { GetMatched } from "../@modules/@utilities/GetMatched";
import { GetEventGeometry } from "./GetEventGeometry";
import { createHash } from "crypto"

export const ValidateEvents = async (events: TypeEvent[]): Promise<void> => {
    const tick = performance.now();
    if (events.length === 0) return
    const configurations = bootstrap.settings as TypeSettings
    const sets = {} as Record<string, Set<string>>;
    const bools = {} as Record<string, boolean>;
    const megered = {...configurations.GlobalSettings, ...configurations.GlobalSettings.EventFiltering}
    for (const key in megered) {
        const setting = megered[key];
        if (Array.isArray(setting)) { sets[key] = new Set(setting.map(item => item.toLowerCase())); }
        if (typeof setting === 'boolean') { bools[key] = setting; }
    }

    const isFiltered = (define: TypeEvent): boolean => {
        const properties = define.properties;
        const zones = properties.geocode.ugc;
        const icao = properties.geocode.office.office

        if (properties.status_metadata.is_test) { 
            SetEventEmit({ event: `onTestProduct`, metadata: define })
            if (bools?.IgnoreTestProducts) return true; 
        }
        
        if (properties.status_metadata.is_expired) { 
            SetEventEmit({ event: `onExpiredProduct`, metadata: define })
            RemoveEvent(define, false)
            return true; 
        }
        
        if (properties.metadata?.vtec?.is_watch && properties.metadata.source != `events.api`) {
            const isSPC = properties.metadata?.vtec?.prediction_center;
            SetEventEmit({ event: isSPC ? `onStormPredictionWatch` : `onNonStormPredictionWatch`, metadata: define })
            if (bools?.SPCWatchesOnly && !isSPC) {
                return true;
            }
            if ((!bools?.SPCWatchesOnly) && isSPC) {
                return true 
             }
        }

        for (const key in sets) {
            const setting = sets[key]
            const values = [...setting];
            if (key === 'ListeningEvents' && setting.size > 0 && !GetMatched(values, define.properties.event)) {
                SetEventEmit({
                    event: `onFilteredEvent`,
                    metadata: define
                }); 
                return true 
            } 
            if (key === 'IgnoredEvents' && setting.size > 0 && GetMatched(values, define.properties.event)) {
                SetEventEmit({
                    event: `onIgnoredEvent`,
                    metadata: define
                }); 
                return true 
            } 
            if (key === 'ListeningICAO' && setting.size > 0 && icao != null && !setting.has(icao.toLowerCase())) { 
                SetEventEmit({
                    event: `onFilteredICAO`,
                    metadata: define
                }); 
                return true 
            }
            if (key === 'IgnoredICAO' && setting.size > 0 && icao != null && setting.has(icao.toLowerCase())) { 
                SetEventEmit({
                    event: `onIgnoredICAO`,
                    metadata: define
                }); 
                return true 
            }
            if (key === 'ListeningUGC' && setting.size > 0 && zones.length > 0 && !zones.some((ugc: string) => setting.has(ugc.toLowerCase()))) { 
                SetEventEmit({
                    event: `onFilteredUGC`,
                    metadata: define
                }); 
                return true 
            }
            if (key === 'ListeningStates' && setting.size > 0 && zones.length > 0 && !zones.some((ugc: string) => setting.has(ugc.substring(0, 2).toLowerCase()))) { 
                SetEventEmit({
                    event: `onFilteredState`,
                    metadata: define
                }); 
                return true 
            }
        }
        return false
    }

    const filtering = events.filter((event: TypeEvent) => {
        bootstrap.cache.processed = bootstrap.cache.processed.filter((e) => e !== event);
        const define = GetEventSignature(event) as TypeEvent;
        const pre = {...define,properties: {...define.properties,  metadata: {...define.properties.metadata }}};
        const properties = define.properties; delete pre.properties.metadata.ms; delete pre.properties.metadata.header;
        const enhanced = properties.event = GetEventEnhancedName(event)
        const filtered = isFiltered(define)
        if (!filtered) {
            event.geometry = !bools?.DisableGeometryParsing ? GetEventGeometry(event) : null;
            properties.metadata.attachments = GetEventAttachments(event)
        }
        properties.metadata.hash = createHash("sha256").update(JSON.stringify(pre)).digest("hex")  
        SetEventEmit({ event: `onProductType${enhanced.replace(/\s+/g, '')}`, metadata: define });
        return !filtered
    })
    
    if (filtering.length > 0) {
        for (const event of filtering) {
            await MakeEvent(event)
        }
    }
    
    SetEventEmit({
        event: `onEventCache`,
        metadata: bootstrap.cache.events,
        limited: true
    })

    SetDebug({ title: `ValidateEvents`, message: `Filtered ${filtering.length}/${events.length} events which took ${performance.now() - tick} ms` })
}