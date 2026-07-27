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

import { TypeHVTEC } from "../../@types/HVTEC";
import { EnumCauses } from "../../@enums/Causes";
import { EnumRecords } from "../../@enums/Records";
import { EnumExpressions } from "../../@enums/Expressions";
import { EnumSeverity } from "../../@enums/Severity";

export const HVExtract = (message: string): TypeHVTEC[] | null => {
    const getHVTECs = message.match(EnumExpressions.hvtec) ?? [];
    const vtecs: TypeHVTEC[] = [];
    for (const vtec of getHVTECs) {
        const sub = vtec.split(`.`);
        if (sub.length < 7) continue;
        vtecs.push({
            hvtec: vtec,
            severity: EnumSeverity[sub[1]],
            cause: EnumCauses[sub[2]],
            record: EnumRecords[sub[6]]
        })
    }
    return vtecs.length > 0 ? vtecs : null;
}