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
import { TypeStanzaCompiled } from "Types/StanzaCompiled"
import { Bootstrap } from "@Bootstrap"
import { SetWarning } from "@Utilities/SetWarning"

export const ImportStanza = async (Stanza: TypeStanzaCompiled): Promise<void> => {
    const settings = Bootstrap.Settings as TypeSettings;
    try { 
        if (!settings.NOAAWeatherWireServiceSettings.CacheSettings.Enabled) { return }
        Bootstrap.Database
            .prepare(`INSERT OR IGNORE INTO stanzas (type, stanza, issued) VALUES (?, ?, ?)`)
            .run(Stanza.Type.Type, JSON.stringify(Stanza), Stanza.Attributes.issue)
        const count = Bootstrap.Database
            .prepare(`SELECT COUNT(*) as total FROM stanzas`)
            .get() as { total: number }
        const max = settings.NOAAWeatherWireServiceSettings.CacheSettings.MaxDatabaseHistory;
        if (count.total > max) { 
            const toDelete = count.total - max;
            if (toDelete > 0) {
                Bootstrap.Database
                    .prepare(`DELETE FROM stanzas WHERE id IN (SELECT id FROM stanzas ORDER BY issued ASC LIMIT ?)`)
                    .run(toDelete);
            }
        }
    } catch (error) {
        SetWarning({ Message: `An error occurred while importing stanza: ${error.message}` })
    }
}