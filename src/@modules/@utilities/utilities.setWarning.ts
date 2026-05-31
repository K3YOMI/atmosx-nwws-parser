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

import { bootstrap } from "../../bootstrap"
import { setTimeoutAction } from "./utilities.setTimeoutAction"
import { TypeSettings } from "../../@types/types.settings";

interface ImportOptions { 
    title?: string
    message: string
}

export const setWarning = (options: ImportOptions): void => {
    const settings = bootstrap.settings as TypeSettings;
    bootstrap.listener.emit(`log`, `${options.title ?? `[${bootstrap.ansi_colors.YELLOW}ATMOSX-PARSER${bootstrap.ansi_colors.RESET}]`} ${options.message}`)
    if (settings?.journal) { 
        //const isTimeout = setTimeoutAction({ identifier: `warning.timeout`, addTime: true, max: 1, interval: 1 })
        //if (isTimeout.limited) return;
        console.log(`${options.title ?? `[${bootstrap.ansi_colors.YELLOW}ATMOSX-PARSER${bootstrap.ansi_colors.RESET}]`} ${options.message}`)
    }
}
