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
import { getProperties } from "../@building/building.getProperties";
import { getHeader } from "../@building/building.getHeader";
import { offshore } from "../@dictionaries/dictionaries.offshore";
import { getTracking } from "../@building/building.getTracking";

export const textEvent = async (stanza: TypeStanzaCompiled): Promise<void> => {
    let processed: unknown[] = [];
    const getMessages = stanza?.message
        ?.split(/(?=\$\$)/g)
        ?.map(message => message.trim())
        ?.filter(message => message && message !== "$$");
    if (!getMessages || getMessages?.length == 0 ) return;
    for (const message of getMessages) {
        const tick = performance.now();
        const attributes = stanza?.attributes as TypeAttributes
        const properties = getProperties({ message, attributes })
        const header = getHeader({properties, getType: stanza.getType})   
        let event = Object.keys(offshore).find(event => message.toLowerCase().includes(event.toLowerCase()));
        if (!event) { 
            event = stanza.getType.type.split(`-`).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(` `)
        }
        processed.push({
            type: `Feature`,
            properties: { 
                event: event,
                parent: event,
                status: `Issued`,
                ...properties,
                metadata: {
                    ms: performance.now() - tick,
                    source: `events.text`,
                    tracking: getTracking({ type: `RAW`, stanza, attributes, properties }),
                    header: header,
                    vtec: null,
                    hvtec: null,
                    history: [
                        {
                            description: properties.description,
                            issued: properties.issued,
                            status: `Issued`,
                        }
                    ]
                }
            }
        })  
    }
    if (processed.length > 0) {
        console.log(JSON.stringify(processed, null ,4))
    }
}