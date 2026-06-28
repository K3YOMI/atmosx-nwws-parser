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

import { TypeSettings } from "../../@types/type.settings";
import { xReconnect } from "../@xmpp/xmpp.xReconnect"
import { bootstrap } from "../../bootstrap";
import { createHttp } from "./utilities.createHttp";
import { createEvent } from "../../@building/building.create";
import { setEventEmit } from "./utilities.setEventEmit";
import { readdirSync, unlinkSync, statSync, existsSync } from "fs";
import { join } from "path";

export const setCronSchedule = async (): Promise<void> => {
    const settings = bootstrap.settings as TypeSettings;

    const TTL = settings.GlobalSettings.ArchiveSettings.TTL
    const TTLCUT = Date.now() - TTL * 1000;

    const walk = (dir: string): void => {
        if (existsSync(dir)) {
            const entries = readdirSync(dir, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = join(dir, entry.name);
                if (entry.isDirectory()) { walk(fullPath); continue; }
                const stats = statSync(fullPath);
                if (stats.mtime.getTime() < TTLCUT) {
                    try {
                        unlinkSync(fullPath);
                    } catch (err) {
                        console.error(`Failed to delete ${fullPath}:`, err);
                    }
                }
            }
        }
    };
    walk(settings.GlobalSettings.ArchiveSettings.TextDirectory)
    walk(settings.GlobalSettings.ArchiveSettings.EasDirectory)
    walk(settings.GlobalSettings.ArchiveSettings.EventDirectory)



    if (settings.EnableWireService) {
        if (settings.NOAAWeatherWireServiceSettings.ReconnectionSettings.Enabled) {
            void xReconnect(settings.NOAAWeatherWireServiceSettings.ReconnectionSettings.ReconnectionInterval)
        }
    } else { 
        const response = await createHttp({
            url: settings.NationalWeatherServiceSettings.EventsEndpoint,
            headers: {
                "User-Agent": "@atmosx/event-product-parser"
            }
        })
        if (response.error) {
            return setEventEmit({
                event: `onServiceStatus`,
                metadata: {
                    type: "fetch-api",
                    message: `Failed to fetch latest events from National Weather Service API - ${response.message}`,
                    data: {},
                    error: true
                },
            })
        }
        setEventEmit({
            event: `onServiceStatus`,
            metadata: {
                message: `Fetched latest events from National Weather Service API`,
                data: {},
                type: "fetch-api",
                error: false
            },
        })
        createEvent({ message: response.message, isNWWS: false })
    }
}


