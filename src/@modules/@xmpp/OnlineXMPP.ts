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

import { Bootstrap } from "@bootstrap"
import { SetEventEmit } from "@utilities/SetEventEmit"
import { xml } from "@xmpp/client"

export const OnlineXMPP = () => {
    const settings = Bootstrap.Settings;
    Bootstrap.Session.on(`online`, async () => {
        Bootstrap.Cache.Hault = false;
        Bootstrap.Cache.Connected = true;
        Bootstrap.Cache.TotalReconnects = 0;
        const nickname = settings.NOAAWeatherWireServiceSettings.CredentialSettings.Nickname;
        Bootstrap.Session.send(xml('presence', {
            to: `nwws@conference.nwws-oi.weather.gov/${nickname}`,
            xmlns: 'http://jabber.org/protocol/muc',
        }))
        SetEventEmit({
            Event: `onServiceStatus`,
            Metadata: {
                Message: `Succesfully connected to NOAA Weather Wire Service as "${nickname}"`,
                Data: {},
                Type: `online`,
                Error: false
            },
            Message: `Succesfully connected to NOAA Weather Wire Service as "${nickname}"`,
        })
    })
}