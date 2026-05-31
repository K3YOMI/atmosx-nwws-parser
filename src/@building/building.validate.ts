/*
              _                             _               _     __   __
         /\  | |                           | |             (_)    \ \ / /
        /  \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ _  ___ \ V / 
       / /\ \| __| '_ ` _ \ / _ \/ __| '_ \| '_ \ / _ \ '__| |/ __| > <  
      / ____ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ |  | | (__ / . \ 
     /_/    \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  |_|\___/_/ \_\
                                     | |                            
                                     |_|                                                                                                                

    Created with ♥ by the AtmosphericX Team (KiyoWx, StarflightWx, Everwatch1, & CJ Ziegler)
    Discord: https://atmosphericx-discord.scriptkitty.cafe
    Ko-Fi: https://ko-fi.com/k3yomi
    Documentation: http://localhost/documentation | https://atmosphericx.scriptkitty.cafe/documentation

    Internal Package: @atmosx/event-product-parser

*/
import { createHash } from "crypto"
import { TypeEvent } from "../@types/type.event";
import { TypeSettings } from "../@types/types.settings";
import { bootstrap } from "../bootstrap"
import { enhance } from "./building.enhance";
import { signature } from "./building.signature"
import { mkEvent } from "../@manager/manager.mkEvent";
import { rmEvent } from "../@manager/manager.rmEvent";

export const validate = (events: TypeEvent[]): void => {
    if (events.length === 0) return;
    const configurations = bootstrap.settings as TypeSettings
    const sets = {} as Record<string, Set<string>>;
    const bools = {} as Record<string, boolean>;
    const megered = {...configurations.global_settings, ...configurations.global_settings.filtering}
    for (const key in megered) {
        const setting = megered[key];
        if (Array.isArray(setting)) { sets[key] = new Set(setting.map(item => item.toLowerCase())); }
        if (typeof setting === 'boolean') { bools[key] = setting; }
    }
    const filterd = events.filter((event: TypeEvent) => {
        const define = signature(event) as TypeEvent;
        const properties = define.properties;
        const zones = properties.geocode.ugc;
        const icao = properties.geocode.office.office
        const enhancedEventName = properties.event = enhance(event)
        properties.metadata.hash = createHash("sha256").update(JSON.stringify(properties)).digest("hex")
        if (properties.status_metadata.is_test) { bootstrap.listener.emit(`onTestProduct`, define); if (bools?.ignore_test_products) return false; }
        if (properties.status_metadata.is_expired) { 
            bootstrap.listener.emit(`onExpiredProduct`, define); 
            rmEvent(define)
            return false; 
        }
        bootstrap.listener.emit(`onProductType${enhancedEventName.replace(/\s+/g, '')}`, define);
        for (const key in sets) {
            const setting = sets[key]
            if (key === 'events' && setting.size > 0 && !setting.has(define.properties.event.toLowerCase())) { 
                bootstrap.listener.emit(`onFilteredEvent`, define); return false 
            } 
            if (key === 'ignored_events' && setting.size > 0 && setting.has(define.properties.event.toLowerCase())) { 
                bootstrap.listener.emit(`onIgnoredEvent`, define); return false 
            } 
            if (key === 'filtered_icao' && setting.size > 0 && icao != null && !setting.has(icao.toLowerCase())) { 
                bootstrap.listener.emit(`onFilteredICAO`, define); return false 
            }
            if (key === 'ignored_icao' && setting.size > 0 && icao != null && setting.has(icao.toLowerCase())) { 
                bootstrap.listener.emit(`onIgnoredICAO`, define); return false 
            }
            if (key === 'ugc_filter' && setting.size > 0 && zones.length > 0 && !zones.some((ugc: string) => setting.has(ugc.toLowerCase()))) { 
                bootstrap.listener.emit(`onFilteredUGC`, define); return false 
            }
            if (key === 'state_filter' && setting.size > 0 && zones.length > 0 && !zones.some((ugc: string) => setting.has(ugc.substring(0, 2).toLowerCase()))) { 
                bootstrap.listener.emit(`onFilteredState`, define); return false 
            }
        }
        return true;
    })
    // TODO: In House Geometry
    if (filterd.length > 0) {
        bootstrap.listener.emit(`onEventCreation`, filterd)
        for (const event of filterd) {
            mkEvent(event)
        }
    }
}