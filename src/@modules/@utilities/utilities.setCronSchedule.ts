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

import { TypeSettings } from "../../@types/types.settings";
import { xReconnect } from "../@xmpp/xmpp.xReconnect"
import { callback } from "../../@core/core.callback"
import { bootstrap } from "../../bootstrap";
import { updateNodes } from "../../@manager/manager.updateNodes";

export const setCronSchedule = async (): Promise<void> => {
    const settings = bootstrap.settings as TypeSettings;
    if (settings.EnableWireService) {
        if (settings.NOAAWeatherWireServiceSettings.ReconnectionSettings.Enabled) {
            void xReconnect(settings.NOAAWeatherWireServiceSettings.ReconnectionSettings.ReconnectionInterval)
        }
    } else { 
        await callback();
    }
}


