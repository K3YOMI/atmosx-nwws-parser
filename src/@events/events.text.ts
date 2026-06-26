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

import { TypeAttributes } from "../@types/type.attributes";
import { TypeStanzaCompiled } from "../@types/type.compiled"
import { TypeEvent } from "../@types/type.event";
import { properties } from "../@building/building.properties";
import { getEventHeader } from "../@building/building.headers";
import { dict_matches } from "../@dictionaries/dictionaries.matches";
import { getEventTracking } from "../@building/building.tracking";
import { validateEvents } from "../@building/building.validate";

export const text = async (stanza: TypeStanzaCompiled): Promise<void> => {
    let processed: TypeEvent[] = [];
    const getMessages = stanza?.message
        ?.split(/(?=\$\$)/g)
        ?.map(message => message.trim())
        ?.filter(message => message && message !== "$$");
    if (!getMessages || getMessages?.length == 0 ) return;
    for (const message of getMessages) {
        const tick = performance.now();
        const attributes = stanza?.attributes as TypeAttributes
        const props = properties({ message, attributes })
        const header = getEventHeader({properties: props, getType: stanza.getType})   
        const issued = new Date(attributes.issue)
        const expires = new Date(issued.getTime() + 12 * 60 * 60 * 1000)
        let event = Object.keys(dict_matches).find(event => message.toLowerCase().includes(event.toLowerCase()));
        let isStatement = false;
        if (!event) { 
            event = stanza.getType.type.split(`-`).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(` `)
            isStatement = true;
        }
        processed.push({
            type: `Feature`,
            geometry: {
                type: `Point`,
                coordinates: []
            },
            properties: { 
                event: event,
                parent: event,
                status: isStatement ? `Statement` : `Issued`,
                issued: (!isNaN(issued.getTime())) ? issued.toISOString() : new Date().toISOString(),
                expires: isStatement ? new Date(issued.getTime() + 120 * 1000).toISOString() : (!isNaN(expires.getTime())) ? expires.toISOString() : new Date(Date.now() + 60 * 60 * 1000).toISOString(),
                ...props,
                metadata: {
                    ms: performance.now() - tick,
                    source: `events.text`,
                    tracking: getEventTracking({ type: `RAW`, stanza, attributes, properties: props }),
                    header: header,
                    vtec: null,
                    hvtec: null,
                    raw: message,
                    history: [
                        {
                            description: props.description,
                            issued: (!isNaN(issued.getTime())) ? issued.toISOString() : new Date().toISOString(),
                            status: `Issued`,
                        }
                    ]
                }
            }
        })  
    }
    validateEvents(processed)
}