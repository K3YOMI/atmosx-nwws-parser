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

import { TypeStanza } from "../../@types/types.stanza"
import { TypeStanzaCompiled } from "../../@types/types.compiled"
import { regExp } from "../../@dictionaries/dictionaries.regExp"
import { getAwipsType } from "./stanza.getAwipsType"

interface ValidateOptions { 
    stanza: TypeStanza
}

export const validate = (options: ValidateOptions): TypeStanzaCompiled => {
    if (options.stanza.is(`message`)) {
        const cb = options.stanza.getChild(`x`) as TypeStanza;
        if (cb && cb.children) {
            const message = unescape(cb.children[0]);
            const attributes = cb.attrs;
            if (attributes.awipsid && attributes.awipsid.length > 1) { 
                const isCapEvent = message.includes(`<?xml`);
                const isCapAreaDescription = message.includes(`<areaDesc>`)
                const isVTEC = message.match(regExp.pvtec) != null;
                const isUGC = message.match(regExp.ugc1) != null;
                const getType = getAwipsType({ attributes: attributes})
                if (getType.type != null) {
                    return { 
                        message, attributes, isCapEvent, isVTEC, isUGC, isCapAreaDescription, isIgnored: false, isNWWS: true, getType
                    }
                }
            }
        }
    }
    return { isIgnored: true}
}