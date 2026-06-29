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
import { dict_correlations } from "../@dictionaries/dictionaries.correlations";
import { dict_cancellation } from "../@dictionaries/dictionaries.cancellation";
import { dict_testing} from "../@dictionaries/dictionaries.testing"
import { dict_products } from "../@dictionaries/dictionaries.products";
import { dict_hail } from "../@dictionaries/dictionaries.hail"

export const getEventSignature = (event: TypeEvent): TypeEvent => {
    const properties = event?.properties;
    const vtec = event?.properties?.metadata?.vtec
    const status = dict_correlations
        .find((c: { type: string }) => c.type === properties?.status);
    const csig = dict_cancellation.find(sig => properties.description.toLowerCase().includes(sig.toLowerCase()));
    properties.status_metadata = { ...properties.status_metadata, is_issued: true, is_test: false};

    if (properties?.parameters?.estimated_hail_size) { 
        properties.parameters.estimated_hail_size += ` (${dict_hail[properties?.parameters?.estimated_hail_size] ?? '--'})`
    }

    if (status) { 
        properties.status = status.name ?? properties.status; 
        properties.status_metadata = { ...properties.status_metadata, is_updated: !!status.isUpdate, is_issued: !!status.isIssued, is_expired: !!status.isCancel, is_statement: !!status.isStatement };
    }
    if (csig) {
        properties.status_metadata = { ...properties.status_metadata, is_expired: true };
    }
    
    const getProduct = vtec?.vtec?.split(`.`)[0]?.replace(`/`, ``)
    const isTestProduct = dict_products[getProduct] == `Test Product`
    if (isTestProduct || dict_testing.some(sig => properties.description?.toLowerCase().includes(sig.toLowerCase()) ?? properties?.parameters?.instructions?.toLowerCase().includes(sig.toLowerCase()))) {
        properties.status_metadata = { ...properties.status_metadata, is_test: true }
    }    
    
    if (new Date(properties.expires).getTime() < Date.now()) {
        properties.status_metadata = { ...properties.status_metadata, is_expired: true };
    }  
    properties.status_metadata = {
        ...properties.status_metadata,
    }
    
    return event
}