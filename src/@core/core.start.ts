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

import { TypeSettings } from "../@types/types.settings";
import { bootstrap } from "../bootstrap";
import { setWarning } from "../@modules/@utilities/utilities.setWarning"
import { setSettings } from "../@modules/@utilities/utilities.setSettings"
import { xDeploy } from "../@modules/@xmpp/xmpp.xDeploy"
import { initializeDatabase } from "../@modules/@database/database.init";
import { getCachedEvents } from "../@modules/@database/database.cache";
import { setCronSchedule } from "../@modules/@utilities/utilities.setCronSchedule";
import { updateNode } from "../@manager/manager.updateNodes";
import { updateEvents } from "../@manager/manager.updateEvents";
import { Cron } from "croner";

export const startService = async (configurations: TypeSettings): Promise<void> => {
    if (!bootstrap.isReady) { 
        return setWarning({ 
            message: `You can not create another instance without shutting down the current one first, please make sure to call the stop() method first!` 
        })
    }
    const settings = setSettings(configurations);
    bootstrap.isReady = true;
    await initializeDatabase();
    if (settings.EnableWireService) {
        (async () => {
            await getCachedEvents();
            await xDeploy()
        })();
    }
    await setCronSchedule()
    let scheduleInterval = !settings.EnableWireService ? settings.NationalWeatherServiceSettings.CallbackInterval : 1;
    if (!settings.EnableWireService && scheduleInterval < 15) {
        setWarning({ message: `Schedule Interval of ${scheduleInterval} seconds is too low, setting to 15 seconds` })
        bootstrap.settings.NationalWeatherServiceSettings.CallbackInterval = 15;
        scheduleInterval = 15;
    }
    bootstrap.cron = new Cron(`*/${scheduleInterval} * * * * *`, async () => {
        await setCronSchedule();
    })
    bootstrap.cron = new Cron(`* * * * * *`, async () => {
        await updateNode();
        await updateEvents();
    })
}