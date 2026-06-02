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

import { TypeSettings } from "../../@types/types.settings";
import { bootstrap } from "../../bootstrap"
import { setEventEmit } from "../@utilities/utilities.setEventEmit";
import { setWarning } from "../@utilities/utilities.setWarning";

export const xReconnect = async (interval: number): Promise<void> => {
    const settings = bootstrap.settings as TypeSettings;
    const lastStanza = Date.now() - bootstrap.cache.lastStanza
    const reconnectThreshold = interval * 1e3
    if ((!bootstrap.cache.isConnected && !bootstrap.cache.sigHault) || !bootstrap.session_xmpp) { 
        return; 
    }
    if (lastStanza > reconnectThreshold) {
        if (!bootstrap.cache.isReconnecting) {
            bootstrap.cache.isReconnecting = true;
            bootstrap.cache.isConnected = false;
            bootstrap.cache.tReconnects += 1;
            try { 
                setEventEmit({
                    event: `onXMPPStatus`,
                    metadata: {
                        message: `Attempting to reconnect to XMPP Service (Reconnect Attempt ${bootstrap.cache.tReconnects})`,
                        data: {
                            last_stanza: lastStanza,
                            nickname: settings.NOAAWeatherWireServiceSettings.CredentialSettings.Nickname
                        },
                        type: `reconnect`,
                        error: true
                    },
                })
                await bootstrap.session_xmpp.stop().catch(() => {});
                await bootstrap.session_xmpp.start().catch(() => {});
            } catch (error) {
                setWarning({ message: `XMPP Reconnect Failed - ${(error as Error).message}` })
            } finally { 
                bootstrap.cache.isReconnecting = false;
            }
        }
    }
}
