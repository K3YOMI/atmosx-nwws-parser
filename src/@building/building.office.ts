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

import { TypeAttributes } from "../@types/type.attributes";
import { TypePVTEC } from "../@types/type.pvtec";
import { dict_icao } from "../@dictionaries/dictionaries.icao";

interface GetOfficeOptions { 
    attributes: TypeAttributes
    organization: string
    pVtec: TypePVTEC
}

interface GetOfficeResponse { 
    office: string | null
    name: string | null
}

export const getEventOffice = (options: GetOfficeOptions): GetOfficeResponse => {
    const office = options.pVtec != null 
        ? options.pVtec?.tracking?.split(`.`)[0] : (options.attributes?.cccc ??
            (options.organization != null ? 
                (Array.isArray(options.organization) ? options.organization?.[0] : options.organization) 
        : null));
    const name = dict_icao?.[office] ?? null;
    return { office, name };
}