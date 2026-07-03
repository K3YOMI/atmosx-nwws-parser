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
import { dict_expressions } from "../@dictionaries/dictionaries.expressions"
import { getAwipsType } from "../@modules/@stanza/stanza.getAwipsType";
import { createEvent } from "../@building/building.create";

interface CreateEventOptions {
    message: string
    attributes: TypeAttributes
}

export const manualEvent = async (options: CreateEventOptions): Promise<void> => {
    const isCapEvent = options.message.includes(`<?xml`);
    const isCapAreaDescription = options.message.includes(`<areaDesc>`)
    const isVTEC = options.message.match(dict_expressions.pvtec) != null;
    const isUGC = options.message.match(dict_expressions.ugc1) != null;
    const getType = getAwipsType({ attributes: options.attributes})
    const result = { message: options.message, attributes: options.attributes, isCapEvent, isVTEC, isUGC, isCapAreaDescription, isIgnored: false, isNWWS: true, getType }
    await createEvent(result);
}
