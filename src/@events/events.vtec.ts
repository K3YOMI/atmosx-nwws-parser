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

import { TypeAttributes } from "../@types/types.attributes";
import { TypeStanzaCompiled } from "../@types/types.compiled"
import { TypeEvent } from "../@types/type.event";
import { TypePVTEC } from "../@types/types.pvtec";
import { TypeHVTEC } from "../@types/types.hvtec";
import { pvExtract } from "../@parsers/@pvtec/pvtec.extract";
import { hvExtract } from "../@parsers/@hvtec/hvtec.extract";
import { ugcExtract } from "../@parsers/@ugc/ugc.extract";
import { properties } from "../@building/building.properties";
import { getEventHeader } from "../@building/building.headers";
import { getEventTracking } from "../@building/building.tracking";
import { validateEvents } from "../@building/building.validate";

export const vtec = async (stanza: TypeStanzaCompiled): Promise<void> => {
    let processed: TypeEvent[] = [];
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
                const props = properties({ message, attributes, ugc, pVtec: vtec })
                const header = getEventHeader({properties: props, getType: stanza.getType, vtec: vtec})
                const issued = new Date(attributes.issue)?? new Date()
                const expires = new Date(vtec.expires)
                processed.push({
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
                        expires: (!isNaN(expires.getTime())) ? expires.toISOString() : new Date(Date.now() + 60 * 60 * 1000).toISOString(),
                        ...props,
                        metadata: {
                            ms: performance.now() - tick,
                            source: `events.vtec`,
                            tracking: getEventTracking({ type: `VTEC`, stanza, attributes, properties: props, vtec }),
                            header: header,
                            vtec: pv.vtec,
                            hvtec: hVtec,
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
            }
        }
    }
    validateEvents(processed)
}