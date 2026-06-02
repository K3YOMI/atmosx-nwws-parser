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
import { setWarning } from "../@utilities/utilities.setWarning";
import { setSleep } from "../@utilities/utilities.setSleep";

export const xOnline = () => {
    const settings = bootstrap.settings;
    bootstrap.session_xmpp.on(`online`, async (address: string) => {
        const tick = Date.now();
        if (bootstrap.cache.lastConnect && tick - bootstrap.cache.lastConnect > 10e3) {
            bootstrap.cache.sigHault = true;
            setWarning({ message: `The XMPP Client is attempting to reconnect too fast, this may be due to network instability and this reconnect request has been throttled. We will attempt to reconnect when all connections have been killed` })
            await setSleep({timeout: 2e3})
            bootstrap.session_xmpp.stop().catch(() => {});
            return;
        }
        bootstrap.cache.sigHault = false;
        bootstrap.cache.isConnected = true;
        bootstrap.cache.lastConnect = tick;
        const nickname = settings.NOAAWeatherWireServiceSettings.CredentialSettings.Nickname;
        bootstrap.session_xmpp.send(xml('presence', {
            to: `nwws@conference.nwws-oi.weather.gov/${nickname}`,
            xmlns: 'http://jabber.org/protocol/muc',
        }))
        bootstrap.listener.emit(`onXMPPStatus`, {
            message: `Succesfully connected to NOAA Weather Wire Service as "${nickname}"`,
            data: {},
            type: `online`,
            error: false
        })
    })
}