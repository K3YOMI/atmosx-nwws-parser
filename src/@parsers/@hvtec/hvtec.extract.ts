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
import { causes } from "../../@dictionaries/dictionaries.causes";
import { records } from "../../@dictionaries/dictionaries.records";
import { RegularExpressions } from "../../@dictionaries/dictionaries.regex";
import { severity } from "../../@dictionaries/dictionaries.severity";
import { TypeHVTEC } from "../../@types/types.hvtec";



export const hvExtract = (message: string): TypeHVTEC[] | null => {
    const getHVTECs = message.match(RegularExpressions.hvtec) ?? [];
    const vtecs: TypeHVTEC[] = [];
    for (const vtec of getHVTECs) {
        const sub = vtec.split(`.`);
        if (sub.length < 7) continue;
        vtecs.push({
            hvtec: vtec,
            severity: severity[sub[1]],
            cause: causes[sub[2]],
            record: records[sub[6]]
        })
    }
    return vtecs.length > 0 ? vtecs : null;
}