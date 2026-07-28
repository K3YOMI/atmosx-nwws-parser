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

import { TypeAttributes } from "../@types/Attributes";
import { TypeStanzaCompiled } from "../@types/StanzaCompiled"
import { TypePVTEC } from "../@types/VTEC";
import { TypeHVTEC } from "../@types/HVTEC";
import { bootstrap } from "../bootstrap";
import { VTECExtract } from "../@parsers/@pvtec/VTECExtract";
import { HVExtract } from "../@parsers/@hvtec/HVExtract";
import { ugcExtract } from "../@parsers/@ugc/UGCExtract";
import { GetEventProperties } from "../@building/GetEventProperties";
import { GetEventHeader } from "../@building/GetEventHeader";
import { GetEventTracking } from "../@building/GetEventTracking";
import { SetDebug } from "../@modules/@utilities/SetDebug";

export const ParseVTEC = async (stanza: TypeStanzaCompiled): Promise<void> => {
    const getMessages = stanza?.message
        ?.split(/(?=\$\$)/g)
        ?.map(message => message.trim())
        ?.filter(message => message && message !== "$$");
    if (!getMessages || getMessages?.length == 0 ) return;
    for (const message of getMessages) {
        const tick = performance.now();
        const attributes = stanza?.attributes as TypeAttributes
        const pVtec = VTECExtract(message) as TypePVTEC[];
        const hVtec = HVExtract(message) as TypeHVTEC[];
        const ugc = await ugcExtract(message)
        if (pVtec != null && ugc != null ) {
            for (const pv of pVtec) {
                const vtec = pv;
                const props = GetEventProperties({ message, attributes, ugc, pVtec: vtec })
                const header = GetEventHeader({properties: props, getType: stanza.getType, vtec: vtec})
                const issued = new Date(attributes.issue)?? new Date()
                const expires = new Date(vtec.expires)
                bootstrap.cache.processed.push({
                    type: `Feature`,
                    geometry: {
                        type: `Point`,
                        coordinates: []
                    },
                    properties: { 
                        event: pv.event,
                        parent: pv.event,
                        status: pv.status,
                        issued: (!isNaN(issued.getTime())) ? issued.toISOString() : new Date().toISOString(),
                        expires: (!isNaN(expires.getTime())) ? expires.toISOString() : ugc.expires ??  new Date(issued.getTime() + 60 * 60 * 1000).toISOString(),
                        ...props,
                        metadata: {
                            ms: performance.now() - tick,
                            source: `events.vtec`,
                            tracking: GetEventTracking({ type: `VTEC`, stanza, attributes, properties: props, vtec }),
                            header: header,
                            vtec: pv,
                            hvtec: hVtec,
                            raw: message,
                            history: [
                                {
                                    description: props.description,
                                    issued: (!isNaN(issued.getTime())) ? issued.toISOString() : new Date().toISOString(),
                                    status: pv.status
                                }
                            ]
                        }
                    }
                })
                SetDebug({ title: `ParseVTEC`, message: `${Math.round(performance.now() - tick)}ms` })
            }
        }
    }
}