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

import { TypeStanzaCompiled } from "../@types/type.compiled"
import { TypeSettings } from "../@types/type.settings"
import { bootstrap } from "../bootstrap"
import { text } from "../@events/events.text"
import { ugc } from "../@events/events.ugc"
import { vtec } from "../@events/events.vtec"
import { api } from "../@events/events.api"

export const createEvent = async (stanza: TypeStanzaCompiled): Promise<void | string> => {
    const settings = bootstrap.settings as TypeSettings
    const StanzaSettings = settings.NOAAWeatherWireServiceSettings.StanzaSettings;

    const isVtecEvent = (stanza.isVTEC && stanza.isUGC)
    const isUgcEvent = (!stanza.isVTEC && stanza.isUGC)
    const isTextEvent = (!stanza.isVTEC && !stanza.isUGC)
    const isNWWS = (stanza.isNWWS)

    if (!isNWWS) return await api(stanza)
    if (!StanzaSettings.DisableVTEC && isVtecEvent) return await vtec(stanza)
    if (!StanzaSettings.DisableUGC && isUgcEvent) return await ugc(stanza);
    if (!StanzaSettings.DisableText && isTextEvent) return await text(stanza);
    return 'nothing picked';
}