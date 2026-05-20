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

import { TypeStanzaCompiled } from "../@types/types.compiled"
import { TypeSettings } from "../@types/types.settings"
import { bootstrap } from "../bootstrap"
import { textEvent } from "./events.text"

import { vtecEvent } from "./events.vtec"

export const create = async (stanza: TypeStanzaCompiled): Promise<void | string> => {
    const settings = bootstrap.settings as TypeSettings
    const preferences = settings.noaa_weather_wire_service_settings.preferences;
    if (!stanza.isNWWS) return ' API Event '
    if (stanza.isCapEvent) return ' Cap Event '
    if (!preferences.disable_vtec && !stanza.isCapEvent && stanza.isVTEC && stanza.isUGC) return await vtecEvent(stanza)
    if (!preferences.disable_ugc && !stanza.isCapEvent && !stanza.isVTEC && stanza.isUGC) return ' UGC Alerts '
    if (!preferences.disable_text && !stanza.isCapEvent && !stanza.isVTEC && !stanza.isUGC) return await textEvent(stanza)
    return 'nothing picked'
}