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

import { TypeSettings } from "../../@types/types.settings";
import { xReconnect } from "../@xmpp/xmpp.xReconnect"
import { bootstrap } from "../../bootstrap";
import { createHttp } from "./utilities.createHttp";
import { createEvent } from "../../@building/building.create";
import { setEventEmit } from "./utilities.setEventEmit";
import { readdirSync, unlink } from "fs";

export const setCronSchedule = async (): Promise<void> => {
    const settings = bootstrap.settings as TypeSettings;

    if (settings.GlobalSettings.EASSettings.ArchiveDirectory) { 
        const TTL = settings.GlobalSettings.EASSettings.ArchiveTTL;
        if (TTL) {
            const files = readdirSync(settings.GlobalSettings.EASSettings.ArchiveDirectory);
            for (const file of files) {
                const filePath = `${settings.GlobalSettings.EASSettings.ArchiveDirectory}/${file}`;
                const stats = await new Promise<{ mtime: Date }>((resolve, reject) => {})
                const time = Date.now() - TTL * 1000;
                if (stats.mtime.getTime() < time) {
                    unlink(filePath, (err) => {});
                }
            }    
        }
    }
    
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
            return  setEventEmit({
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


