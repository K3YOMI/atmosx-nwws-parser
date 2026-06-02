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

import { TypeSettings } from "../@types/types.settings";
import { bootstrap } from "../bootstrap";
import { setWarning } from "../@modules/@utilities/utilities.setWarning"
import { setSettings } from "../@modules/@utilities/utilities.setSettings"
import { xDeploy } from "../@modules/@xmpp/xmpp.xDeploy"
import { initializeDatabase } from "../@modules/@database/database.init";
import { getCachedEvents } from "../@modules/@database/database.cache";
import { setCronSchedule } from "../@modules/@utilities/utilities.setCronSchedule";
import { Cron } from "croner";

export const start = async (settings: TypeSettings): Promise<void> => {
    if (!bootstrap.isReady) { 
        return setWarning({ 
            message: `You can not create another instance without shutting down the current one first, please make sure to call the stop() method first!` 
        })
    }
    setSettings(settings);
    bootstrap.isReady = true;
    await initializeDatabase();
    if (settings.EnableWireService) {
        (async () => {
            await getCachedEvents();
            await xDeploy()
        })();
    }
    await setCronSchedule()
    const interval = !settings.EnableWireService ? settings.NationalWeatherServiceSettings.CallbackInterval : 5;
    bootstrap.cron = new Cron(`*/${interval} * * * *`, async () => {
        await setCronSchedule();
    })
}