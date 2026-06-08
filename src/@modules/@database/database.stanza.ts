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


import { bootstrap } from '../../bootstrap'
import { setWarning } from '../@utilities/utilities.setWarning';
import { TypeSettings } from "../../@types/types.settings"
import { TypeStanzaCompiled } from '../../@types/types.compiled';

export const importStanza = async (stanza: TypeStanzaCompiled): Promise<void> => {
    const settings = bootstrap.settings as TypeSettings;
    try { 
        if (!settings.NOAAWeatherWireServiceSettings.CacheSettings.Enabled) { return }
        bootstrap.database
            .prepare(`INSERT OR IGNORE INTO stanzas (type, stanza, issued) VALUES (?, ?, ?)`)
            .run(stanza.getType.type, JSON.stringify(stanza), stanza.attributes.issue)
        const count = bootstrap.database
            .prepare(`SELECT COUNT(*) as total FROM stanzas`)
            .get() as { total: number }
        const max = settings.NOAAWeatherWireServiceSettings.CacheSettings.MaxDatabaseHistory;
        if (count.total > max) { 
            const toDelete = count.total - max;
            if (toDelete > 0) {
                bootstrap.database
                    .prepare(`DELETE FROM stanzas WHERE id IN (SELECT id FROM stanzas ORDER BY issued ASC LIMIT ?)`)
                    .run(toDelete);
            }
        }
    } catch (error) {
        setWarning({ message: `An error occurred while importing stanza: ${error.message}` })
    }
}