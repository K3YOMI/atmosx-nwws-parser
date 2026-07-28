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

import { TypeSettings } from "../@types/Settings";
import { bootstrap } from "../bootstrap";
import { SetWarning } from "../@modules/@utilities/SetWarning"
import { SetSettings } from "../@modules/@utilities/SetSettings"
import { DeployXMPP } from "../@modules/@xmpp/DeployXMPP"
import { InitializeDatabase } from "../@modules/@database/InitializeDatabase";
import { GetCachedEvents } from "../@modules/@database/GetCachedEvents";
import { SetCronSchedule } from "../@modules/@utilities/SetCronSchedule";
import { UpdateNode } from "../@manager/UpdateNode";
import { UpdateEvents } from "../@manager/UpdateEvents";
import { Cron } from "croner";

export const StartService = async (configurations: TypeSettings): Promise<void> => {
    if (!bootstrap.isReady) { 
        return SetWarning({ 
            message: `You can not create another instance without shutting down the current one first, please make sure to call the stop() method first!` 
        })
    }
    const settings = SetSettings(configurations);
    bootstrap.isReady = true;
    await InitializeDatabase();
    if (settings.EnableWireService) {
        (async () => {
            await GetCachedEvents();
            await DeployXMPP()
        })();
    }
    await SetCronSchedule()
    let scheduleInterval = !settings.EnableWireService ? settings.NationalWeatherServiceSettings.CallbackInterval : 1;
    if (!settings.EnableWireService && scheduleInterval < 15) {
        SetWarning({ message: `Schedule interval of ${scheduleInterval} seconds is too low, setting to 15 seconds` })
        bootstrap.settings.NationalWeatherServiceSettings.CallbackInterval = 15;
        scheduleInterval = 15;
    }
    bootstrap.cron = new Cron(`*/${scheduleInterval} * * * * *`, async () => {
        await SetCronSchedule();
    })
    bootstrap.cron = new Cron(`* * * * * *`, async () => { 
        await UpdateNode();
        await UpdateEvents();
    })
}