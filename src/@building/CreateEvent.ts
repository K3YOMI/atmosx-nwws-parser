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

import { TypeStanzaCompiled } from "../@types/StanzaCompiled"
import { TypeSettings } from "../@types/Settings"
import { bootstrap } from "../bootstrap"
import { ParseText } from "../@events/ParseText"
import { ParseUGC } from "../@events/ParseUGC"
import { ParseVTEC } from "../@events/ParseVTEC"
import { ParseAPI } from "../@events/ParseAPI"
import { ValidateEvents } from "./ValidateEvents"

export const CreateEvent = async (stanza: TypeStanzaCompiled, ignorePushing?: boolean): Promise<void | string> => {
    const settings = bootstrap.settings as TypeSettings
    const StanzaSettings = settings.NOAAWeatherWireServiceSettings.StanzaSettings;

    const isVtecEvent = (stanza.isVTEC && stanza.isUGC)
    const isUgcEvent = (!stanza.isVTEC && stanza.isUGC)
    const isTextEvent = (!stanza.isVTEC && !stanza.isUGC)
    const isNWWS = (stanza.isNWWS)

    switch (true) {
        case (!isNWWS):
            await ParseAPI(stanza)
            break;
        case (isNWWS && !StanzaSettings.DisableVTEC && isVtecEvent):
            await ParseVTEC(stanza)
            break;
        case (isNWWS && !StanzaSettings.DisableUGC && isUgcEvent):
            await ParseUGC(stanza)
            break;
        case (isNWWS && !StanzaSettings.DisableText && isTextEvent):
            await ParseText(stanza)
            break;
    }
    if (!ignorePushing) {
        await ValidateEvents(bootstrap.cache.processed)
    }
    return 'nothing picked';
}