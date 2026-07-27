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

import { TypeStanza } from "../../@types/Stanza";
import { bootstrap } from "../../bootstrap";
import { ValidateStanza } from "../@stanza/ValidateStanza";
import { CreateEvent } from "../../@building/CreateEvent";
import { ImportStanza } from "../@database/ImportStanza";
import { SetEventEmit } from "../@utilities/SetEventEmit";

export const StanzaXMPP = () => {
    bootstrap.session_xmpp.on(`stanza`, async (stanza: TypeStanza) => {
        const msgFrom = stanza?.attrs?.from ?? ``
        const msgType = stanza?.attrs?.type ?? ``
        SetEventEmit({
            event: `onServiceStatus`,
            metadata: {
                message: stanza,
                from: msgFrom,
                type: `stanza`
            },
        })
        bootstrap.cache.lastStanza = Date.now();
        if (stanza.is(`message`)) {
            const result = ValidateStanza({ stanza });
            const isSkippable = result.isIgnored ||
                (result.isCapEvent) ||
                (result.isCapEvent && !result.isCapAreaDescription)
            if (isSkippable) { return; }
            await CreateEvent(result);
            await ImportStanza(result);
        }
        if (stanza.is(`presence`) && msgFrom.startsWith('nwws@conference.nwws-oi.weather.gov/')) {
            const getOccupant = msgFrom.split(`/`).slice(1).join(`/`)
            const getAvailability = msgType === `unavailable`
            SetEventEmit({
                event: `onServiceStatus`,
                metadata: {
                    message: `Occupant ${getOccupant} has ${getAvailability ? `left` : `joined`} the room`,
                    data: {},
                    type: `occupant`,
                    error: false 
                },
            })
        }
    })
}