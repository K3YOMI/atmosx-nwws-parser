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
import { xml } from '@xmpp/client'
import { bootstrap } from "../../bootstrap";
import { setSleep } from "../@utilities/utilities.setSleep";
import { setEventEmit } from '../@utilities/utilities.setEventEmit';

export const xOnline = () => {
    const settings = bootstrap.settings;
    bootstrap.session_xmpp.on(`online`, async (address: string) => {
        bootstrap.cache.sigHault = false;
        bootstrap.cache.isConnected = true;
        bootstrap.cache.tReconnects = 0;
        const nickname = settings.NOAAWeatherWireServiceSettings.CredentialSettings.Nickname;
        bootstrap.session_xmpp.send(xml('presence', {
            to: `nwws@conference.nwws-oi.weather.gov/${nickname}`,
            xmlns: 'http://jabber.org/protocol/muc',
        }))
        setEventEmit({
            event: `onServiceStatus`,
            metadata: {
                message: `Succesfully connected to NOAA Weather Wire Service as "${nickname}"`,
                data: {},
                type: `online`,
                error: false
            },
        })
    })
}