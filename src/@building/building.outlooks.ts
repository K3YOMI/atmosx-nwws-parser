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

import { TypeEvent } from "../@types/type.event"
import { getLatestIssuance } from "../@modules/@utilities/utilities.getLatestIssuance";

export const getEventAttachments = (event: TypeEvent): string[] | null => {
    const latestTime = getLatestIssuance();
    const validEvents = [
        { target: "Day 1", attachment: `https://www.spc.noaa.gov/products/outlook/day1otlk_${latestTime}.png` },
        { target: "Day 2", attachment: `https://www.spc.noaa.gov/products/outlook/day2otlk.png` },
        { target: "Day 3", attachment: `https://www.spc.noaa.gov/products/outlook/day3otlk.png` },
        { target: "Mesoscale Discussion", attachment: `https://www.spc.noaa.gov/products/md/mcd${event?.properties?.spc_parameters?.spc_number}.png` },
    ]
    const isValid = validEvents.find(outlook => outlook.target == event.properties.event);
    if (isValid) {
        return isValid?.attachment ? [isValid.attachment] : [];
    }
    return null;
}