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

import { client } from '@xmpp/client';
import { TypeSettings } from "../../@types/types.settings";
import { bootstrap } from "../../bootstrap"
import { setWarning } from "../@utilities/utilities.setWarning";
import { xOnline } from "./xmpp.xOnline";
import { xOffline } from "./xmpp.xOffline";
import { xError } from "./xmpp.xError";
import { xStanza } from "./xmpp.xStanza";
import { setEventEmit } from '../@utilities/utilities.setEventEmit';

export const xDeploy = async (): Promise<void> => {
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
        await xOffline();
        await xError();
        await xStanza();
        await xOnline();
        await session.start()
    } catch (error) {
        setEventEmit({
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
