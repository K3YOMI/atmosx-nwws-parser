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

import { TypeAttributes } from "types-lower/Attributes"
import { TypeStanzaCompiled } from "types/StanzaCompiled"
import { TypeVTEC } from "types/VTEC"
import { TypeHVTEC } from "types/HVTEC"
import { Bootstrap } from "@bootstrap"
import { VTECExtract } from "@parsers/vtec/VTECExtract"
import { HVExtract } from "@parsers/hvtec/HVExtract"
import { ugcExtract } from "@parsers/ugc/UGCExtract"
import { GetEventProperties } from "@building/GetEventProperties"
import { GetEventHeader } from "@building/GetEventHeader"
import { GetEventTracking } from "@building/GetEventTracking"
import { SetDebug } from "@utilities/SetDebug"

export const ParseVTEC = async (Stanza: TypeStanzaCompiled): Promise<void> => {
    const getMessages = Stanza?.Message
        ?.split(/(?=\$\$)/g)
        ?.map(message => message.trim())
        ?.filter(message => message && message !== "$$");
    if (!getMessages || getMessages?.length == 0 ) return;
    for (const message of getMessages) {
        const tick = performance.now();
        const attributes = Stanza?.Attributes as TypeAttributes
        const VTEC = VTECExtract(message) as TypeVTEC[];
        const hVTEC = HVExtract(message) as TypeHVTEC[];
        const ugc = await ugcExtract(message)
        if (VTEC != null && ugc != null ) {
            for (const vtec of VTEC) {
                const props = GetEventProperties({ Message: message, Attributes: attributes, UGC: ugc, VTEC: vtec })
                const header = GetEventHeader({ Properties: props, VTEC: vtec, Type: Stanza.Type })
                const issued = new Date(attributes.issue)?? new Date()
                const expires = new Date(vtec.Expires)
                Bootstrap.Cache.Parsed.push({
                    type: `Feature`,
                    geometry: {
                        type: `Point`,
                        coordinates: []
                    },
                    properties: { 
                        event: vtec.Event,
                        parent: vtec.Event,
                        status: vtec.Status,
                        issued: (!isNaN(issued.getTime())) ? issued.toISOString() : new Date().toISOString(),
                        expires: (!isNaN(expires.getTime())) ? expires.toISOString() : ugc.Expires ??  new Date(issued.getTime() + 60 * 60 * 1000).toISOString(),
                        ...props,
                        metadata: {
                            ms: performance.now() - tick,
                            source: `events.vtec`,
                            tracking: GetEventTracking({ Type: `VTEC`, Stanza, Attributes: attributes, Properties: props, VTEC: vtec }),
                            header: header,
                            vtec: vtec,
                            hvtec: hVTEC,
                            raw: message,
                            history: [
                                {
                                    description: props.description,
                                    issued: (!isNaN(issued.getTime())) ? issued.toISOString() : new Date().toISOString(),
                                    status: vtec.Status
                                }
                            ]
                        }
                    }
                })
                SetDebug({ Title: `ParseVTEC`, Message: `${Math.round(performance.now() - tick)}ms` })
            }
        }
    }
}