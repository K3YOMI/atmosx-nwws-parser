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

import { TypeSettings } from "types/Settings"
import { GetEventGeometry } from "@building/GetEventGeometry"
import { GetCleanedEvent } from "@building/GetCleanedEvent"
import { SetSettings } from "@utilities/SetSettings"
import { SetEventEmit } from "@utilities/SetEventEmit"
import { SetWarning } from "@utilities/SetWarning"
import { GenerateEASMessage } from "@eas/GenerateEASMessage"
import { SetNode } from "@core/SetNode"
import { GetEvents } from "@core/GetEvents"
import { GetNodes } from "@core/GetNodes"
import { ManualEvent } from "@core/ManualEvent"
import { GetRandomEvent } from "@core/GetRandomEvent"
import { QueryStanza } from "@core/QueryStanza"
import { ClearEvents } from "@core/ClearEvents"
import { CreateListener } from "@core/CreateListener"
import { StartService } from "@core/StartService"
import { StopService } from "@core/StopService"

export class Manager { 
    constructor(settings: TypeSettings) { this.trycatch(); StartService(settings) }

    on(event: string, callback: () => void) {
        CreateListener(event, callback)
    }

    trycatch() {
        process.on('uncaughtException', (err: any) => {
            const ignored = ['ETIMEDOUT', 'ECONNRESET', 'EHOSTUNREACH', 'ENOTFOUND', 'ECONNREFUSED', 'EPIPE', 'EADDRINUSE', 'EALREADY', 'EACCES', 'EAGAIN', 'EHOSTDOWN', 'STARTTLS_FAILURE'];
            if (ignored.includes(err?.code)) { 
                SetEventEmit({
                    event: `onServiceStatus`,
                    metadata: {
                        message: `Ignored Critical Error: ${err?.code ?? 'Unknown error code'}. This may indicate a connection issue. Attempting to continue...`,
                        data: {},
                        type: `error`,
                        error: true 
                    }
                })
                return; 
            }
            SetWarning({message: `Uncaught Exception: ${err instanceof Error ? err.stack ?? err.message : String(err)}`})
        })
    }
}

export default Manager;
export type { TypeEvent } from "types/Event"
export { 
    SetSettings, GetEventGeometry, ManualEvent,
    GetCleanedEvent, StopService, ClearEvents,
    StartService, SetNode, GetRandomEvent,
    GetEvents, GetNodes, GenerateEASMessage, QueryStanza
}


