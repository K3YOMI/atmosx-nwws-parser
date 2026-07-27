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

import { TypePVTEC } from "../../@types/VTEC";
import { EnumExpressions } from "../../@enums/Expressions";
import { EnumProducts } from "../../@enums/Products";
import { EnumEvents } from "../../@enums/Events";
import { EnumActions } from "../../@enums/Actions";
import { EnumStatus } from "../../@enums/Status";
import { GetExpiry } from "./GetExpiry";

export const VTECExtract = (message: string): TypePVTEC[] | null => {
    if (!message) return null;
    const getVTECs = message.match(EnumExpressions.pvtec) ?? [];
    const vtecs: TypePVTEC[] = [];
    for (const vtec of getVTECs) {
        const sub = vtec.split(`.`);
        if (sub?.length < 7) continue;
        const dates = sub[6]?.split(`-`);
        vtecs.push({
            vtec: vtec,
            product: EnumProducts[sub[0]],
            tracking: `${sub[2]}.${sub[3]}.${sub[4]}.${sub[5]}`,
            event: `${EnumEvents[sub[3]]} ${EnumActions[sub[4]]}`,
            status: EnumStatus[sub[1]],
            organization: message.match(EnumExpressions.wmo)?.[0] ?? null,
            expires: GetExpiry(dates),
            is_watch: (sub[4] == `A` || sub[4] == `Y`) && (sub[3] == `TO` || sub[3] == `SV`),
            prediction_center: sub[2] == `KWNS` ? true : false
        })
    }
    return vtecs.length > 0 ? vtecs : null;
}