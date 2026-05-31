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
import { properties } from "../@building/building.properties";
import { headers } from "../@building/building.headers";
import { eventsOffshore } from "../@dictionaries/dictionaries.eventsOffshore";
import { tracking } from "../@building/building.tracking";
import { validate } from "../@building/building.validate";

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
        const header = headers({properties: props, getType: stanza.getType})   
        const issued = new Date(attributes.issue)
        const expires = new Date(issued.getTime() + 12 * 60 * 60 * 1000)
        let event = Object.keys(eventsOffshore).find(event => message.toLowerCase().includes(event.toLowerCase()));
        if (!event) { 
            event = stanza.getType.type.split(`-`).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(` `)
        }
        processed.push({
            type: `Feature`,
            properties: { 
                event: event,
                parent: event,
                status: `Issued`,
                issued: (!isNaN(issued.getTime())) ? issued.toISOString() : new Date().toISOString(),
                expires: (!isNaN(expires.getTime())) ? expires.toISOString() : new Date(Date.now() + 60 * 60 * 1000).toISOString(),
                ...props,
                metadata: {
                    ms: performance.now() - tick,
                    source: `events.text`,
                    tracking: tracking({ type: `RAW`, stanza, attributes, properties: props }),
                    header: header,
                    vtec: null,
                    hvtec: null,
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
    validate(processed)
}