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
import { TypeSettings } from "../@types/type.settings";
import { bootstrap } from "../bootstrap"
import { getEventEnhancedName } from "./building.enhance";
import { getEventSignature } from "./building.signature"
import { mkEvent } from "../@manager/manager.mkEvent";
import { rmEvent } from "../@manager/manager.rmEvent";
import { getEventAttachments } from "./building.attachments";
import { updateNode } from "../@manager/manager.updateNodes";
import { setEventEmit } from "../@modules/@utilities/utilities.setEventEmit";
import { setDebug } from "../@modules/@utilities/utilities.setDebug";
import { getMatched } from "../@modules/@utilities/utilities.getMatched";
import { getEventGeometry } from "../@building/building.geometry";
import { createHash } from "crypto"

export const validateEvents = async (events: TypeEvent[]): Promise<void> => {
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
            setEventEmit({ event: `onTestProduct`, metadata: define })
            if (bools?.IgnoreTestProducts) return true; 
        }
        
        if (properties.status_metadata.is_expired) { 
            setEventEmit({ event: `onExpiredProduct`, metadata: define })
            rmEvent(define)
            return true; 
        }
        
        if (properties.metadata?.vtec?.is_watch && properties.metadata.source != `events.api`) {
            const isSPC = properties.metadata?.vtec?.prediction_center;
            setEventEmit({ event: isSPC ? `onStormPredictionWatch` : `onNonStormPredictionWatch`, metadata: define })
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
            if (key === 'ListeningEvents' && setting.size > 0 && !getMatched(values, define.properties.event)) {
                setEventEmit({
                    event: `onFilteredEvent`,
                    metadata: define
                }); 
                return true 
            } 
            if (key === 'IgnoredEvents' && setting.size > 0 && getMatched(values, define.properties.event)) {
                setEventEmit({
                    event: `onIgnoredEvent`,
                    metadata: define
                }); 
                return true 
            } 
            if (key === 'ListeningICAO' && setting.size > 0 && icao != null && !setting.has(icao.toLowerCase())) { 
                setEventEmit({
                    event: `onFilteredICAO`,
                    metadata: define
                }); 
                return true 
            }
            if (key === 'IgnoredICAO' && setting.size > 0 && icao != null && setting.has(icao.toLowerCase())) { 
                setEventEmit({
                    event: `onIgnoredICAO`,
                    metadata: define
                }); 
                return true 
            }
            if (key === 'ListeningUGC' && setting.size > 0 && zones.length > 0 && !zones.some((ugc: string) => setting.has(ugc.toLowerCase()))) { 
                setEventEmit({
                    event: `onFilteredUGC`,
                    metadata: define
                }); 
                return true 
            }
            if (key === 'ListeningStates' && setting.size > 0 && zones.length > 0 && !zones.some((ugc: string) => setting.has(ugc.substring(0, 2).toLowerCase()))) { 
                setEventEmit({
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
        const define = getEventSignature(event) as TypeEvent;
        const properties = define.properties; delete properties?.metadata?.ms;
        const enhanced = properties.event = getEventEnhancedName(event)
        const filtered = isFiltered(define)
        if (!filtered) {
            event.geometry = !bools?.DisableGeometryParsing ? getEventGeometry(event) : null;
            properties.metadata.attachments = getEventAttachments(event)
        }
        properties.metadata.hash = createHash("sha256").update(JSON.stringify(properties)).digest("hex")  
        setEventEmit({ event: `onProductType${enhanced.replace(/\s+/g, '')}`, metadata: define });
        return !filtered
    })

    
    if (filtering.length > 0) {
        for (const event of filtering) {
            await mkEvent(event)
        }
    }
    
    await updateNode()
    setEventEmit({
        event: `onEventCache`,
        metadata: bootstrap.cache.events,
        limited: true
    })
    setDebug({ title: `@building.validate`, message: `Filtered ${filtering.length} events which took ${performance.now() - tick} ms` })
}