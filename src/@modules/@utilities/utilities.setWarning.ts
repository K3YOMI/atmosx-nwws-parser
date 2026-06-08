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

import { bootstrap } from "../../bootstrap"
import { TypeSettings } from "../../@types/types.settings";

interface SetWarningOptions { 
    title?: string
    message: string
}

export const setWarning = (options: SetWarningOptions): void => {
    const settings = bootstrap.settings as TypeSettings;
    bootstrap.listener.emit(`log`, `${options.title ?? `[${bootstrap.ansi_colors.YELLOW}ATMOSX-PARSER${bootstrap.ansi_colors.RESET}]`} ${options.message}`)
    if (settings.EnableJournal) { 
        console.log(`${options.title ?? `[${bootstrap.ansi_colors.YELLOW}ATMOSX-PARSER${bootstrap.ansi_colors.RESET}]`} ${options.message}`)
    }
}
