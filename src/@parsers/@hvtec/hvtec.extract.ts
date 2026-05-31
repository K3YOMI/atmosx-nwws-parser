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

import { TypeHVTEC } from "../../@types/types.hvtec";
import { eventCauses } from "../../@dictionaries/dictionaries.eventCauses";
import { eventRecords } from "../../@dictionaries/dictionaries.eventRecords";
import { regExp } from "../../@dictionaries/dictionaries.regExp";
import { eventSeverity } from "../../@dictionaries/dictionaries.eventSeverity";

export const hvExtract = (message: string): TypeHVTEC[] | null => {
    const getHVTECs = message.match(regExp.hvtec) ?? [];
    const vtecs: TypeHVTEC[] = [];
    for (const vtec of getHVTECs) {
        const sub = vtec.split(`.`);
        if (sub.length < 7) continue;
        vtecs.push({
            hvtec: vtec,
            severity: eventSeverity[sub[1]],
            cause: eventCauses[sub[2]],
            record: eventRecords[sub[6]]
        })
    }
    return vtecs.length > 0 ? vtecs : null;
}