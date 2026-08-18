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

import { TypeStanza } from "types-lower/Stanza"
import { Bootstrap } from "@bootstrap"
import { ValidateStanza } from "@stanza/ValidateStanza"
import { CreateEvent } from "@building/CreateEvent"
import { ImportStanza } from "@database/ImportStanza"
import { SetEventEmit } from "@utilities/SetEventEmit"

export const StanzaXMPP = () => {
    Bootstrap.Session.on(`stanza`, async (stanza: TypeStanza) => {
        const msgFrom = stanza?.attrs?.from ?? ``
        const msgType = stanza?.attrs?.type ?? ``
        SetEventEmit({
            Event: `onServiceStatus`,
            Metadata: {
                Message: stanza,
                From: msgFrom,
                Type: `stanza`
            },
        })
        Bootstrap.Cache.LastStanzaTime = Date.now();
        if (stanza.is(`message`)) {
            const result = ValidateStanza({ Stanza: stanza });
            const isSkippable = result.Ignored ||
                (result.CapEvent) ||
                (result.CapEvent && !result.CapAreaDescription)
            if (isSkippable) { return; }
            await CreateEvent(result);
            await ImportStanza(result);
        }
        if (stanza.is(`presence`) && msgFrom.startsWith('nwws@conference.nwws-oi.weather.gov/')) {
            const getOccupant = msgFrom.split(`/`).slice(1).join(`/`)
            const getAvailability = msgType === `unavailable`
            SetEventEmit({
                Event: `onServiceStatus`,
                Metadata: {
                    Message: `Occupant ${getOccupant} has ${getAvailability ? `left` : `joined`} the room`,
                    Data: {},
                    Type: `occupant`,
                    Error: false 
                },
            })
        }
    })
}