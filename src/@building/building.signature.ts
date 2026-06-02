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

import { TypeEvent } from "../@types/type.event";
import { statusCorrelationText } from "../@dictionaries/dictionaries.statusCorrelationText";
import { eventCancelMessages } from "../@dictionaries/dictionaries.eventCancelMessages";
import { test_signatures} from "../@dictionaries/dictionaries.test_signatures"
import { eventProducts } from "../@dictionaries/dictionaries.eventProducts";
import { hailStrings } from "../@dictionaries/dictionaries.hailStrings"
import { getFormattedTime } from "../@modules/@utilities/utilities.getFormattedTime";


/*
export const hailStrings: Record<string, string> = {
    "0.75": "Penny",
    "0.88": "Nickel",
    "1.00": "Quarter",
    "1.25": "Half Dollar",
    "1.50": "Ping Pong Ball",
    "1.75": "Golf Ball",
    "2.00": "Hen Egg",
    "2.50": "Tennis Ball",
    "2.75": "Baseball",
    "4.00": "CD/DVD"
}
    */

export const getEventSignature = (event: TypeEvent): TypeEvent => {
    const properties = event?.properties;
    const vtec = event?.properties?.metadata?.vtec
    const status = statusCorrelationText
        .find((c: { type: string }) => c.type === properties?.status);
    const csig = eventCancelMessages.find(sig => properties.description.toLowerCase().includes(sig.toLowerCase()));
    properties.status_metadata = { ...properties.status_metadata, is_issued: true, is_test: false};

    if (properties.parameters.estimated_hail_size) { 
        properties.parameters.estimated_hail_size += ` (${hailStrings[properties.parameters.estimated_hail_size]})`
    }

    if (status) { 
        properties.status = status.name ?? properties.status; 
        properties.status_metadata = { ...properties.status_metadata, is_updated: !!status.isUpdate, is_issued: !!status.isIssued, is_expired: !!status.isCancel };
    }
    if (csig) {
        properties.status_metadata = { ...properties.status_metadata, is_expired: true };
    }
    if (vtec) {
        const getProduct = vtec.split(`.`)[0]?.replace(`/`, ``)
        const isTestProduct = eventProducts[getProduct] == `Test Product`
        if (isTestProduct || test_signatures.some(sig => properties.description?.toLowerCase().includes(sig.toLowerCase()) || properties?.parameters?.instructions?.toLowerCase().includes(sig.toLowerCase()))) {
            properties.status_metadata = { ...properties.status_metadata, is_test: true }
        }    
    }
    if (new Date(properties.expires).getTime() < new Date().getTime()) {
        properties.status_metadata = { ...properties.status_metadata, is_expired: true };
    }  
    properties.status_metadata = {
        ...properties.status_metadata,
    }
    
    return event
}