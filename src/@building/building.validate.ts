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

import { createHash } from "crypto"
import { TypeEvent } from "../@types/type.event";
import { TypeSettings } from "../@types/type.settings";
import { bootstrap } from "../bootstrap"
import { getEventEnhancedName } from "./building.enhance";
import { getEventSignature } from "./building.signature"
import { mkEvent } from "../@manager/manager.mkEvent";
import { rmEvent } from "../@manager/manager.rmEvent";
import { getEventGeometry } from "./building.geometry";
import { getEventAttachments } from "./building.outlooks";
import { updateNode } from "../@manager/manager.updateNodes";
import { setEventEmit } from "../@modules/@utilities/utilities.setEventEmit";

export const validateEvents = async (events: TypeEvent[]): Promise<void> => {
    if (events.length === 0) return;
    const configurations = bootstrap.settings as TypeSettings
    const sets = {} as Record<string, Set<string>>;
    const bools = {} as Record<string, boolean>;
    const megered = {...configurations.GlobalSettings, ...configurations.GlobalSettings.EventFiltering}
    for (const key in megered) {
        const setting = megered[key];
        if (Array.isArray(setting)) { sets[key] = new Set(setting.map(item => item.toLowerCase())); }
        if (typeof setting === 'boolean') { bools[key] = setting; }
    }
    const filterd = events.filter((event: TypeEvent) => {
        const define = getEventSignature(event) as TypeEvent;
        const properties = define.properties;
        const zones = properties.geocode.ugc;
        const icao = properties.geocode.office.office
        const enhancedEventName = properties.event = getEventEnhancedName(event)
        const filteredProperties = JSON.parse(JSON.stringify(properties)) as typeof properties;
        if (filteredProperties?.metadata && 'ms' in filteredProperties.metadata) {
            delete filteredProperties.metadata.ms;
        }
        filteredProperties.metadata = filteredProperties.metadata ?? {} as any;
        properties.metadata.hash = createHash("sha256").update(JSON.stringify(filteredProperties)).digest("hex")  
        properties.metadata.attachments = getEventAttachments(event)
        setEventEmit({ event: `onProductType${enhancedEventName.replace(/\s+/g, '')}`, metadata: define });
        
        if (properties.status_metadata.is_test) { 
            setEventEmit({ event: `onTestProduct`, metadata: define })
            if (bools?.IgnoreTestProducts) return false; 
        }
        
        if (properties.status_metadata.is_expired) { 
            setEventEmit({ event: `onExpiredProduct`, metadata: define })
            rmEvent(define)
            return false; 
        }
        
        if (properties.metadata?.vtec?.is_watch) {
            const isSPC = properties.metadata?.vtec?.prediction_center;
            setEventEmit({ event: isSPC ? `onStormPredictionWatch` : `onNonStormPredictionWatch`, metadata: define })
            if (bools?.SPCWatchesOnly && !isSPC) {
                return false;
            }
            if ((!bools?.SPCWatchesOnly) && isSPC) {
                return false 
             }
        }

        for (const key in sets) {
            const setting = sets[key]
            if (key === 'ListeningEvents' && setting.size > 0 && !setting.has(define.properties.event.toLowerCase())) { 
                setEventEmit({
                    event: `onFilteredEvent`,
                    metadata: define
                }); 
                return false 
            } 
            if (key === 'IgnoredEvents' && setting.size > 0 && setting.has(define.properties.event.toLowerCase())) { 
                setEventEmit({
                    event: `onIgnoredEvent`,
                    metadata: define
                }); 
                return false 
            } 
            if (key === 'ListeningICAO' && setting.size > 0 && icao != null && !setting.has(icao.toLowerCase())) { 
                setEventEmit({
                    event: `onFilteredICAO`,
                    metadata: define
                }); 
                return false 
            }
            if (key === 'IgnoredICAO' && setting.size > 0 && icao != null && setting.has(icao.toLowerCase())) { 
                setEventEmit({
                    event: `onIgnoredICAO`,
                    metadata: define
                }); 
                return false 
            }
            if (key === 'ListeningUGC' && setting.size > 0 && zones.length > 0 && !zones.some((ugc: string) => setting.has(ugc.toLowerCase()))) { 
                setEventEmit({
                    event: `onFilteredUGC`,
                    metadata: define
                }); 
                return false 
            }
            if (key === 'ListeningStates' && setting.size > 0 && zones.length > 0 && !zones.some((ugc: string) => setting.has(ugc.substring(0, 2).toLowerCase()))) { 
                setEventEmit({
                    event: `onFilteredState`,
                    metadata: define
                }); 
                return false 
            }
        }
        return true;
    })

    
    if (!configurations?.GlobalSettings?.DisableGeometryParsing) {
        for (const event of filterd) {
            event.geometry = await getEventGeometry(event)
        }
    }

    if (filterd.length > 0) {
        for (const event of filterd) {
            await mkEvent(event)
        }
    }
    await updateNode()
    setEventEmit({
        event: `onEventCache`,
        metadata: bootstrap.cache.events,
        limited: true
    })
}