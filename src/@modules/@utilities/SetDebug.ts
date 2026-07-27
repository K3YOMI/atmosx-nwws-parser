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

import { TypeSettings } from "../../@types/Settings";
import { bootstrap } from "../../bootstrap"

interface SetDebugOptions { 
    title?: string
    message: string
}

export const SetDebug = (options: SetDebugOptions): void => {
    const settings = bootstrap.settings as TypeSettings;
    bootstrap.listener.emit(`debug`, {
        message: options.message,
        parent: options?.title?.split(`.`)[0]?.replace(`@`, ``),
        function: options?.title?.split(`.`)[1]
    })
    if (settings.EnableDebugging) { 
        console.log(`[${bootstrap.ansi_colors.BLUE}${options.title ?? `debug`}${bootstrap.ansi_colors.RESET}] ${options.message}`)
    }
}
