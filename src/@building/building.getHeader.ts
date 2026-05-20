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

import { TypeStanzaCompiled } from "../@types/types.compiled";
import { TypePVTEC } from "../@types/types.pvtec";


import { icao } from "../@dictionaries/dictionaries.icao";
import { TypeEventProperties } from "../@types/type.properties";

interface GetHeaderOptions {
    properties: TypeEventProperties
    vtec?: TypePVTEC
    getType: {
        type: string
        prefix: string
    }
}

export const getHeader = (options: GetHeaderOptions): string => {
    const properties = options.properties
    const vtec = options.vtec ?? null
    const ugc = properties.geocode.ugc != null ? properties.geocode.ugc.join(`-`) : `0`;
    return `ZCZC-ATMOSX-${options.getType.prefix}-${ugc}-${vtec?.status ?? `Issued`}-${options.properties.issued.replace(/[-:]/g, '').split('.')[0]}-${properties.geocode.office.office ?? `KWNS`}`
}