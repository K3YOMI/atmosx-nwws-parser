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

import { TypePVTEC } from "../../@types/types.pvtec";
import { RegularExpressions } from "../../@dictionaries/dictionaries.regex";
import { products } from "../../@dictionaries/dictionaries.products";
import { events } from "../../@dictionaries/dictionaries.events";
import { actions } from "../../@dictionaries/dictionaries.actions";
import { status } from "../../@dictionaries/dictionaries.status";
import { expires } from "./pvtec.expires";

export const pvExtract = (message: string): TypePVTEC[] | null => {
    const getVTECs = message.match(RegularExpressions.pvtec) ?? [];
    const vtecs: TypePVTEC[] = [];
    for (const vtec of getVTECs) {
        const sub = vtec.split(`.`);
        if (sub?.length < 7) continue;
        const dates = sub[6]?.split(`-`);
        vtecs.push({
            vtec: vtec,
            product: products[sub[0]],
            tracking: `${sub[2]}-${sub[3]}-${sub[4]}-${sub[5]}`,
            event: `${events[sub[3]]} ${actions[sub[4]]}`,
            status: status[sub[1]],
            organization: message.match(RegularExpressions.wmo)?.[0] ?? null,
            expires: expires(dates),
            prediction_center: 
                (sub[4] == `A` || sub[4] == `Y`) &&
                (sub[3] == `TO` || sub[3] == `SV`) 
            ? true : false
        })
    }
    return vtecs.length > 0 ? vtecs : null;
}