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

import { TypeSettings } from './@types/types.settings'
import { setSettings } from "./@modules/@utilities/utilities.setSettings"
import { getSettings } from "./@modules/@utilities/utilities.getSettings";
import { getEventGeometry } from "./@building/building.geometry";
import { start } from "./@core/core.start"
import { stop } from "./@core/core.stop"
import { listener } from "./@core/core.listener"


export class Manager { 
    constructor(settings: TypeSettings) { start(settings) }

    on(event: string, callback: () => void) {
        listener(event, callback)
    }
}

export default Manager;
export { setSettings, getSettings, getEventGeometry, start, stop } 