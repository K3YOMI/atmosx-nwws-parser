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

import { TypeSettings } from "../../@types/types.settings"
import { bootstrap } from '../../bootstrap'
import { setWarning } from '../@utilities/utilities.setWarning';
import { createEvent } from '../../@building/building.create';

export const getCachedEvents = async (): Promise<void> => {
    try { 
        const settings = bootstrap.settings as TypeSettings;
        const tick = performance.now();
        if (settings.NOAAWeatherWireServiceSettings.CacheSettings.Enabled) {
            const max = settings.NOAAWeatherWireServiceSettings.CacheSettings.MaxRetentionHistory ?? 500;
            const get = await bootstrap.database.prepare(`SELECT * FROM stanzas ORDER BY rowid DESC LIMIT ?`).all(max) as { rowid: number; stanza: string }[];
            setWarning({ message: `Fetched ${get.length} cached events from the database in ${Math.floor(performance.now() - tick)} ms` })
            let events = get.map((row) => JSON.parse(row.stanza))
                .filter(stanza => {
                    if (!stanza) { return }
                    const isSkippable = stanza.isIgnored ||
                        (stanza.isCapEvent) ||
                        (stanza.isCapEvent && !stanza.isCapAreaDescription)
                    return !isSkippable
                });
            events = events.sort((a, b) => b.issued - a.issued)
            await Promise.all(events.map(event => createEvent(event)))
            setWarning({ message: `Processed ${events.length} cached events in ${Math.floor(performance.now() - tick)} ms` })
        }
    } catch (error) {
        setWarning({ message: `An error occurred while fetching cached events: ${error.message} -> ${error.stack}` })
    }
}