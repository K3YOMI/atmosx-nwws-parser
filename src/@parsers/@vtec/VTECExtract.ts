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

import { TypeVTEC } from "types/VTEC"
import { EnumExpressions } from "@enums/Expressions"
import { EnumProducts } from "@enums/Products"
import { EnumEvents } from "@enums/Events"
import { EnumActions } from "@enums/Actions"
import { EnumStatus } from "@enums/Status"
import { GetExpiry } from "./GetExpiry"

export const VTECExtract = (message: string): TypeVTEC[] | null => {
    if (!message) return null;
    const getVTECs = message.match(EnumExpressions.vtec) ?? [];
    const vtecs: TypeVTEC[] = [];
    for (const vtec of getVTECs) {
        const sub = vtec.split(`.`);
        if (sub?.length < 7) continue;
        const dates = sub[6]?.split(`-`);
        vtecs.push({
            Raw: vtec,
            ProductType: EnumProducts[sub[0]],
            Tracking: `${sub[2]}.${sub[3]}.${sub[4]}.${sub[5]}`,
            Event: `${EnumEvents[sub[3]]} ${EnumActions[sub[4]]}`,
            Status: EnumStatus[sub[1]],
            WMO: message.match(EnumExpressions.wmo)?.[0] ?? null,
            Expires: GetExpiry(dates),
            Watch: (sub[4] == `A` || sub[4] == `Y`) && (sub[3] == `TO` || sub[3] == `SV`),
            PredictionCenter: sub[2] == `KWNS` ? true : false
        })
    }
    return vtecs.length > 0 ? vtecs : null;
}