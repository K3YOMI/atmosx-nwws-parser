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

import { TypeSettings } from "Types/Settings"
import { GetEventGeometry } from "@Building/GetEventGeometry"
import { GetCleanedEvent } from "@Building/GetCleanedEvent"
import { SetSettings } from "@Utilities/SetSettings"
import { SetEventEmit } from "@Utilities/SetEventEmit"
import { SetWarning } from "@Utilities/SetWarning"
import { GenerateEASMessage } from "@EAS/GenerateEASMessage"
import { SetNode } from "@Core/SetNode"
import { GetEvents } from "@Core/GetEvents"
import { GetNodes } from "@Core/GetNodes"
import { ManualEvent } from "@Core/ManualEvent"
import { GetRandomEvent } from "@Core/GetRandomEvent"
import { QueryStanza } from "@Core/QueryStanza"
import { ClearEvents } from "@Core/ClearEvents"
import { CreateListener } from "@Core/CreateListener"
import { StartService } from "@Core/StartService"
import { StopService } from "@Core/StopService"
import { GetVersion } from "@Core/GetVersion"

export class Manager { 
    public constructor(settings: TypeSettings) { 
        this.trycatch(); StartService(settings) 
    }

    on(event: string, callback: () => void) {
        CreateListener(event, callback)
    }

    trycatch() {
        process.on('uncaughtException', (err: any) => {
            const ignored = ['ETIMEDOUT', 'ECONNRESET', 'EHOSTUNREACH', 'ENOTFOUND', 'ECONNREFUSED', 'EPIPE', 'EADDRINUSE', 'EALREADY', 'EACCES', 'EAGAIN', 'EHOSTDOWN', 'STARTTLS_FAILURE'];
            if (ignored.includes(err?.code)) { 
                SetEventEmit({
                    Event: `onServiceStatus`,
                    Metadata: {
                        Message: `Ignored Critical Error: ${err?.code ?? 'Unknown error code'}. This may indicate a connection issue. Attempting to continue...`,
                        Data: {},
                        Type: `error`,
                        Error: true 
                    }
                })
                return; 
            }
            SetWarning({Message: `Uncaught Exception: ${err instanceof Error ? err.stack ?? err.message : String(err)}`})
        })
    }
}

export default Manager;
export type { TypeEvent } from "StaticTypes/Event"
export { 
    SetSettings, GetEventGeometry, ManualEvent,
    GetCleanedEvent, StopService, ClearEvents,
    StartService, SetNode, GetRandomEvent, GetVersion,
    GetEvents, GetNodes, GenerateEASMessage, QueryStanza
}


