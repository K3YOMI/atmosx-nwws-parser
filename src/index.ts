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

import { TypeSettings } from './@types/types.settings'
import { setSettings } from "./@modules/@utilities/utilities.setSettings"
import { getEventGeometry } from "./@building/building.geometry";
import { getCleanedEvent } from "./@building/building.clean"
import { setEventEmit } from './@modules/@utilities/utilities.setEventEmit';
import { setWarning } from './@modules/@utilities/utilities.setWarning';
import { listener } from "./@core/core.listener"
import { startService } from "./@core/core.start"
import { stopService } from "./@core/core.stop"
import { setEasTone } from './@modules/@eas/eas.setEasTone';
import { setNode } from "./@core/core.setNode"
import { getEvents } from "./@core/core.getEvents"
import { getNodes } from "./@core/core.getNodes"

export class Manager { 
    constructor(settings: TypeSettings) { this.trycatch();startService(settings) }

    on(event: string, callback: () => void) {
        listener(event, callback)
    }

    trycatch() {
        process.on('uncaughtException', (err: any) => {
            const ignored = ['ETIMEDOUT', 'ECONNRESET', 'EHOSTUNREACH', 'STARTTLS_FAILURE'];
            if (ignored.includes(err?.code)) { 
                setEventEmit({
                    event: `onXMPPStatus`,
                    metadata: {
                        message: `XMPP Critical Error: ${err?.code ?? 'Unknown error code'}. This may indicate a connection issue. Attempting to continue...`,
                        data: {},
                        type: `error`,
                        error: true 
                    }
                })
                return; 
            }
            setWarning({message: `Uncaught Exception: ${err instanceof Error ? err.stack || err.message : String(err)}`})
        })
    }
}

export default Manager;
export { 
    setSettings,
    getEventGeometry,
    getCleanedEvent,
    stopService,
    startService,
    setNode,
    getEvents,
    getNodes,
    setEasTone
}

export type { TypeSettings } from './@types/types.settings'