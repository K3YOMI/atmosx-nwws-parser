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

import { TypeSettings } from "types/Settings"
import { bootstrap } from "@bootstrap"
import { SetWarning } from "@utilities/SetWarning"
import { CreateEvent } from "@building/CreateEvent"
import { ValidateEvents } from "@manager/ValidateEvents"

export const GetCachedEvents = async (): Promise<void> => {
    try { 
        const settings = bootstrap.settings as TypeSettings;
        const tick = performance.now();
        if (settings.NOAAWeatherWireServiceSettings.CacheSettings.Enabled) {
            const max = settings.NOAAWeatherWireServiceSettings.CacheSettings.MaxRetentionHistory ?? 500;
            const get = await bootstrap.database.prepare(`SELECT * FROM stanzas ORDER BY rowid DESC LIMIT ?`).all(max) as { rowid: number; stanza: string }[];
            SetWarning({ message: `Fetched ${get.length} cached stanzas from the database in ${Math.floor(performance.now() - tick)} ms` })
            let events = get.map((row) => JSON.parse(row.stanza))
                .filter(stanza => {
                    if (!stanza) { return }
                    const isSkippable = stanza.isIgnored ||
                        (stanza.isCapEvent) ||
                        (stanza.isCapEvent && !stanza.isCapAreaDescription)
                    return !isSkippable
                });
            events = events.sort((a, b) => b.issued - a.issued)
            await Promise.all(events.map(event => CreateEvent(event, true)))
            SetWarning({ message: `Processed ${events.length} cached stanzas in ${Math.floor(performance.now() - tick)} ms` })
            await ValidateEvents(bootstrap.cache.processed)
        }
    } catch (error) {
        SetWarning({ message: `An error occurred while fetching cached stanzas: ${error.message} -> ${error.stack}` })
    }
}