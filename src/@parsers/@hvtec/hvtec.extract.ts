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

import { TypeHVTEC } from "../../@types/type.hvtec";
import { dict_causes } from "../../@dictionaries/dictionaries.causes";
import { dict_records } from "../../@dictionaries/dictionaries.records";
import { dict_regexp } from "../../@dictionaries/dictionaries.regexp";
import { dict_severity } from "../../@dictionaries/dictionaries.severity";

export const hvExtract = (message: string): TypeHVTEC[] | null => {
    const getHVTECs = message.match(dict_regexp.hvtec) ?? [];
    const vtecs: TypeHVTEC[] = [];
    for (const vtec of getHVTECs) {
        const sub = vtec.split(`.`);
        if (sub.length < 7) continue;
        vtecs.push({
            hvtec: vtec,
            severity: dict_severity[sub[1]],
            cause: dict_causes[sub[2]],
            record: dict_records[sub[6]]
        })
    }
    return vtecs.length > 0 ? vtecs : null;
}