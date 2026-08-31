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
import { Bootstrap } from "@Bootstrap"
import { SetWarning } from "@Utilities/SetWarning"
import { SetSettings } from "@Utilities/SetSettings"
import { SetCronSchedule } from "@Utilities/SetCronSchedule"
import { DeployXMPP } from "@XMPP/DeployXMPP"
import { InitializeDatabase } from "@Database/InitializeDatabase"
import { GetCachedEvents } from "@Database/GetCachedEvents"
import { UpdateNode } from "@Manager/UpdateNode"
import { UpdateEvents } from "@Manager/UpdateEvents"
import { Cron } from "croner"

export const StartService = async (configurations: TypeSettings): Promise<void> => {
    if (!Bootstrap.Ready) { 
        return SetWarning({ 
            Message: `You can not create another instance without shutting down the current one first, please make sure to call the stop() method first!` 
        })
    }
    const settings = SetSettings(configurations);
    Bootstrap.Ready = true;
    await InitializeDatabase();
    if (settings.DebugDisableAllEvents) { return SetWarning({ Message: `DebugDisableAllEvents is enabled, no events will be processed!` }) }
    if (settings.EnableWireService) {
        (async () => {
            await GetCachedEvents();
            await DeployXMPP()
        })();
    }
    await SetCronSchedule()
    let scheduleInterval = !settings.EnableWireService ? settings.NationalWeatherServiceSettings.CallbackInterval : 1;
    if (!settings.EnableWireService && scheduleInterval < 15) {
        SetWarning({ Message: `Schedule interval of ${scheduleInterval} seconds is too low, setting to 15 seconds` })
        Bootstrap.Settings.NationalWeatherServiceSettings.CallbackInterval = 15;
        scheduleInterval = 15;
    }
    Bootstrap.Job = new Cron(`*/${scheduleInterval} * * * * *`, async () => {
        await SetCronSchedule();
    })
    Bootstrap.Job = new Cron(`* * * * * *`, async () => { 
        await UpdateNode();
        await UpdateEvents();
    })
}