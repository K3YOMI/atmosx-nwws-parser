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
import { OnlineXMPP } from "@xmpp/OnlineXMPP"
import { OfflineXMPP } from "@xmpp/OfflineXMPP"
import { ErrorXMPP } from "@xmpp/ErrorXMPP"
import { StanzaXMPP } from "@xmpp/StanzaXMPP"
import { SetEventEmit } from "@utilities/SetEventEmit"
import { client } from "@xmpp/client"

export const DeployXMPP = async (): Promise<void> => {
    let session;
    const settings = bootstrap.settings as TypeSettings
    settings.NOAAWeatherWireServiceSettings.CredentialSettings.Nickname 
        ??= settings.NOAAWeatherWireServiceSettings.CredentialSettings.Username;
    session = bootstrap.session_xmpp = client({
        service: 'xmpp://nwws-oi.weather.gov',
        domain: 'nwws-oi.weather.gov',
        username: settings.NOAAWeatherWireServiceSettings.CredentialSettings.Username,
        password: settings.NOAAWeatherWireServiceSettings.CredentialSettings.Password
    })
    try {
        await OfflineXMPP();
        await ErrorXMPP();
        await StanzaXMPP();
        await OnlineXMPP();
        await session.start()
    } catch (error) {
        SetEventEmit({
            event: `onServiceStatus`,
            metadata: {
                message: `Error occured while starting XMPP Session: ${error}`,
                data: {},
                type: `error`,
                error: true 
            },
        })
    }
}
