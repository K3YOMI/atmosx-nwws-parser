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
import { text } from "../@events/events.text"
import { ugc } from "../@events/events.ugc"
import { vtec } from "../@events/events.vtec"

export const create = async (stanza: TypeStanzaCompiled): Promise<void | string> => {
    const settings = bootstrap.settings as TypeSettings
    const preferences = settings.noaa_weather_wire_service_settings.preferences;

    const isVtecEvent = (stanza.isVTEC && stanza.isUGC)
    const isUgcEvent = (!stanza.isVTEC && stanza.isUGC)
    const isTextEvent = (!stanza.isVTEC && !stanza.isUGC)
    const isNWWS = (stanza.isNWWS)

    if (!isNWWS) return ''
    if (!preferences.disable_vtec && isVtecEvent) return await vtec(stanza)
    if (!preferences.disable_ugc && isUgcEvent) return await ugc(stanza);
    if (!preferences.disable_text && isTextEvent) return await text(stanza);
    return 'nothing picked';
}