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
import { EnumMatches } from "../@enums/Matches";
import { bootstrap } from "../bootstrap";
import { GetEventProperties } from "../@building/GetEventProperties";
import { GetEventHeader } from "../@building/GetEventHeader";
import { GetEventTracking } from "../@building/GetEventTracking";
import { SetDebug } from "../@modules/@utilities/SetDebug";

export const ParseText = async (stanza: TypeStanzaCompiled): Promise<void> => {
    const getMessages = stanza?.message
        ?.split(/(?=\$\$)/g)
        ?.map(message => message.trim())
        ?.filter(message => message && message !== "$$");
    if (!getMessages || getMessages?.length == 0 ) return;
    for (const message of getMessages) {
        const tick = performance.now();
        const attributes = stanza?.attributes as TypeAttributes
        const props = GetEventProperties({ message, attributes })
        const header = GetEventHeader({properties: props, getType: stanza.getType})   
        const issued = new Date(attributes.issue)
        const expires = new Date(issued.getTime() + 12 * 60 * 60 * 1000)
        const matches = EnumMatches[stanza.getType.prefix]?.find(match => match.match.test(message.toUpperCase()));
        
        let event = matches?.label;
        let isStatement = matches?.statement ?? false;

        if (!event) { 
            event = stanza.getType.type;
            if (!stanza.getType.discovered) {
                event += ` (AWIPSID)`
            }
            isStatement = true;
        }
        
        bootstrap.cache.processed.push({
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
                    tracking: GetEventTracking({ type: `RAW`, stanza, attributes, properties: props }),
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
        SetDebug({ title: `ParseText`, message: `Event process took ${Math.round(performance.now() - tick)}ms` })
    }
}