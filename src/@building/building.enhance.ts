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
import { betterEventNames } from "../@dictionaries/dictionaries.betterEventNames"

export const getEventEnhancedName = (event: TypeEvent): string => {
    const configurations = bootstrap.settings as TypeSettings
    let name = event?.properties?.event

    if (!configurations?.GlobalSettings?.BetterEventNames) {
        return name 
    }

    const damage = event?.properties?.parameters?.damage_threat
    const tornado = event?.properties?.parameters?.tornado_threat;
    const description = event?.properties?.description?.toLowerCase()
    for (const [eventKey, eventConfig] of Object.entries(betterEventNames)) {
        if (eventKey !== name) continue;
        for (const [paramKey, paramValue] of Object.entries(eventConfig)) {
            let matches = true;
            if (paramValue?.description) {
                if (!description.includes(paramValue.description.toLowerCase())) matches = false;
            }
            if (paramValue?.damage) {
                if (paramValue.damage !== damage) matches = false;
            }
            if (paramValue?.tornado) {
                if (paramValue.tornado !== tornado) matches = false;
            }
            if (matches) {
                name = paramKey;
                break;
            }
        }
    }
    return name;
}