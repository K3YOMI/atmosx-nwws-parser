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
    const spcNumber = event?.properties?.discussion_parameters?.discussion_number;
    const watchNumber = event?.properties?.watch_parameters?.watch_number;
    const validEvents = [
        { target: "Day 1", attachment: `https://www.spc.noaa.gov/products/outlook/day1otlk_${latestTime}.png` },
        { target: "Day 2", attachment: `https://www.spc.noaa.gov/products/outlook/day2otlk.png` },
        { target: "Day 3", attachment: `https://www.spc.noaa.gov/products/outlook/day3otlk.png` },
        { target: "Mesoscale Discussion", attachment: `https://www.spc.noaa.gov/products/md/mcd${spcNumber}.png` },
        { target: "Tornado Watch", attachment: `https://www.spc.noaa.gov/products/watch/ww${watchNumber}_radar_big.gif` },
        { target: "PDS Tornado Watch", attachment: `https://www.spc.noaa.gov/products/watch/ww${watchNumber}_radar_big.gif` },
        { target: "Severe Thunderstorm Watch", attachment: `https://www.spc.noaa.gov/products/watch/ww${watchNumber}_radar_big.gif` },
        { target: "PDS Severe Thunderstorm Watch", attachment: `https://www.spc.noaa.gov/products/watch/ww${watchNumber}_radar_big.gif` }
    ]
    const isValid = validEvents.find(outlook => outlook.target == event.properties.event);
    if (isValid) {
        return isValid?.attachment ? [isValid.attachment] : [];
    }
    return null;
}