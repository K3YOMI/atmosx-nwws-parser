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

import { TypeAttributes } from "../@types/types.attributes";
import { TypeEventProperties } from "../@types/type.properties";
import { TypeStanzaCompiled } from "../@types/types.compiled";
import { TypePVTEC } from "../@types/types.pvtec";

interface GetTrackingOptions { 
    type: `RAW` | `VTEC` | `API`
    stanza?: TypeStanzaCompiled
    attributes?: TypeAttributes
    properties?: TypeEventProperties
    organization?: {
        wmoidentifier: string
        featureId: string
    }
    vtec?: TypePVTEC
}

export const getEventTracking = (options: GetTrackingOptions): string => {
    const proprties = options.properties
    const attributes = options.attributes
    const stanza = options.stanza
    const vtec = options.vtec
    if (options.type === `RAW`) { 
        const getWatchNumber = proprties.watch_parameters.watch_number ?? null
        if (getWatchNumber) {
            return `${proprties.geocode.office.office}-${stanza.getType.prefix}-A-${getWatchNumber}`
        }
        return `${proprties.geocode.office.office}-${attributes.ttaaii}-${attributes.id.slice(-4).replace(`.`, ``) ?? '0'}`
    }
    if (options.type === `VTEC`) {
        return vtec.tracking;
    }
    if (options.type === `API`) {
        if (options.vtec) { 
            const vtecValue = Array.isArray(options.vtec) 
                ? options.vtec[0] : options.vtec;
            const splitPVTEC = vtecValue.split('.');
            return `${splitPVTEC[2]}-${splitPVTEC[3]}-${splitPVTEC[4]}-${splitPVTEC[5]}`;
        }
        const wmoMatch = options.organization?.wmoidentifier?.match(/([A-Z]{4}\d{2})\s+([A-Z]{4})/);
        const station = wmoMatch?.[2] ?? 'N/A';
        if (options.organization.featureId) {
            const idMatch = options.organization.featureId.match(/([a-f0-9]+)\.(\d+)\.(\d+)$/);
            return `${station}-${idMatch?.[1] ?? 'N/A'}`;
        }
        const id = wmoMatch?.[1] ?? 'N/A';
        return `${station}-${id}`;
    }
}