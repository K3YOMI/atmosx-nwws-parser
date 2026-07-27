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

import { TypeAttributes } from "../@types/Attributes";
import { EnumExpressions } from "../@enums/Expressions"
import { GetAwipsType } from "../@modules/@stanza/GetAwipsType";
import { CreateEvent } from "../@building/CreateEvent";

interface CreateEventOptions {
    message: string
    awipsid?: string
}

export const ManualEvent = async (options: CreateEventOptions): Promise<void> => {
    const isCapEvent = options.message.includes(`<?xml`);
    const isCapAreaDescription = options.message.includes(`<areaDesc>`)
    const isVTEC = options.message.match(EnumExpressions.pvtec) != null;
    const isUGC = options.message.match(EnumExpressions.ugc1) != null;
    const attributes = {
        "xmlns": "@atmosx/event-product-parser",
        "id": "manual_processor.0000",
        "issue": new Date().toISOString(),
        "ttaaii": "XXXXX",
        "cccc": "XXX",
        "awipsid": options.awipsid ?? "XXXXXX",
    }
    const getType = GetAwipsType({ attributes })
    const result = { 
        message: options.message, 
        attributes,
        isCapEvent, 
        isVTEC, 
        isUGC, 
        isCapAreaDescription, 
        isIgnored: false, 
        isNWWS: true, 
        getType 
    }
    await CreateEvent(result);
}
