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

import { Bootstrap } from "@bootstrap"
import { getCache } from "@parsers/ugc/GetCache"
import { setCache } from "@parsers/ugc/SetCache"

export const getLocations = async (zones: string[]): Promise<string[]> => {
    const uniqueZones = Array.from(new Set(zones));

    const results: string[] = [];
    const missing: string[] = [];

    for (let i = 0; i < uniqueZones.length; i++) {
        const zone = uniqueZones[i];
        const cached = getCache(zone);

        if (cached) {
            for (let j = 0; j < cached.length; j++) {
                results.push(cached[j]);
            }
        } else {
            missing.push(zone);
        }
    }

    if (missing.length > 0) {
        const rows = await Bootstrap.Database
            .prepare(
                `SELECT id, location FROM shapefiles WHERE id IN (${missing.map(() => '?').join(',')})`
            )
            .all(...missing);

        for (let i = 0; i < rows.length; i++) {
            const r = rows[i] as any;
            setCache({ Key: r.id, Value: [r.location] });
            results.push(r.location);
        }
    }
    return results;
};