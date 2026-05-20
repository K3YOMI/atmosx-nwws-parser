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

import { pvExtract } from "../@parsers/@pvtec/pvtec.extract";
import { hvExtract } from "../@parsers/@hvtec/hvtec.extract";
import { TypeAttributes } from "../@types/types.attributes";
import { TypeStanzaCompiled } from "../@types/types.compiled"
import { TypePVTEC } from "../@types/types.pvtec";
import { TypeHVTEC } from "../@types/types.hvtec";
import { ugcExtract } from "../@parsers/@ugc/ugc.extract";
import { getProperties } from "../@building/building.getProperties";
import { getHeader } from "../@building/building.getHeader";
import { getTracking } from "../@building/building.getTracking";


export const vtecEvent = async (stanza: TypeStanzaCompiled): Promise<void> => {
    let processed: unknown[] = [];
    const getMessages = stanza?.message
        ?.split(/(?=\$\$)/g)
        ?.map(message => message.trim())
        ?.filter(message => message && message !== "$$");
    if (!getMessages || getMessages?.length == 0 ) return;
    for (const message of getMessages) {
        const tick = performance.now();
        const attributes = stanza?.attributes as TypeAttributes
        const pVtec = await pvExtract(message) as TypePVTEC[];
        const hVtec = await hvExtract(message) as TypeHVTEC[];
        const ugc = await ugcExtract(message)
        if (pVtec != null && ugc != null ) {
            for (const pv of pVtec) {
                const vtec = pv;
                const properties = getProperties({ message, attributes, ugc, pVtec: vtec })
                const header = getHeader({properties, getType: stanza.getType, vtec: vtec})
                processed.push({
                    type: `Feature`,
                    properties: { 
                        event: pv.event,
                        parent: pv.event,
                        status: pv.status,
                        ...properties,
                        metadata: {
                            ms: performance.now() - tick,
                            source: `events.vtec`,
                            tracking: getTracking({ type: `VTEC`, stanza, attributes, properties, vtec }),
                            header: header,
                            vtec: pv.vtec,
                            hvtec: hVtec,
                            history: [
                                {
                                    description: properties.description,
                                    issued: properties.issued,
                                    status: pv.status
                                }
                            ]
                        }
                    }
                })
            }
        }
    }
    if (processed.length > 0) {
        console.log(JSON.stringify(processed, null, 4))
    }
}