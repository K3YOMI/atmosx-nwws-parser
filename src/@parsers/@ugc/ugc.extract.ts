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

import { TypeUGC } from "../../@types/types.ugc";
import { getUGCHeader } from "./ugc.header"
import { getZones } from "./ugc.zones";
import { getExpiry } from './ugc.expiry';
import { getLocations } from "./ugc.locations";

export const ugcExtract = async (message: string): Promise<TypeUGC> => {
    const head = getUGCHeader(message);
    const ugcs = getZones(head)
    const expires = getExpiry(message)
    const areas = await getLocations(ugcs)
    if (!head || ugcs?.length == 0) return;
    return { 
        zones: ugcs,
        locations: areas, 
        expires: expires
    }
}