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
    type: `RAW` | `VTEC`
    stanza: TypeStanzaCompiled
    attributes: TypeAttributes
    properties: TypeEventProperties
    vtec?: TypePVTEC
}

export const tracking = (options: GetTrackingOptions): string => {
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
}