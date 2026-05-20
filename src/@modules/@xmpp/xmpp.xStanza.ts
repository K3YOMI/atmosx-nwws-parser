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

import { bootstrap } from "../../bootstrap";
import { TypeStanza } from "../../@types/types.stanza";
import { validateStanza } from "../@stanza/stanza.validateStanza";
import { create } from "../../@events/events.create";
import { importStanza } from "../@database/database.stanza";

export const xStanza = () => {
    bootstrap.session_xmpp.on(`stanza`, async (stanza: TypeStanza) => {
        const msgFrom = stanza?.attrs?.from ?? ``
        const msgType = stanza?.attrs?.type ?? ``
        const isCapEnabled = bootstrap.settings.noaa_weather_wire_service_settings.preferences.cap_only;
        
        bootstrap.cache.lastStanza = Date.now();
        if (stanza.is(`message`)) {
            const result = validateStanza({ stanza });
            const isSkippable = result.isIgnored ||
                (result.isCapEvent && !isCapEnabled) ||
                (!result.isCapEvent && isCapEnabled) ||
                (result.isCapEvent && !result.isCapAreaDescription)
            if (isSkippable) { return; }
            await create(result);
            await importStanza(result);
        }
        if (stanza.is(`presence`) && msgFrom.startsWith('nwws@conference.nwws-oi.weather.gov/')) {
            const getOccupant = msgFrom.split(`/`).slice(1).join(`/`)
            const getAvailability = msgType === `unavailable`
            bootstrap.listener.emit(`onXMPPStatus`, {
                message: `Occupant ${getOccupant} has ${getAvailability ? `left` : `joined`} the room`,
                data: {},
                type: `occupant`,
                error: false 
            })
        }
    })
}