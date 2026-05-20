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

import { bootstrap } from "../../bootstrap";
import { setWarning } from "../@utilities/utilities.setWarning";

export const xError = () => {
    bootstrap.session_xmpp.on(`error`, async (error: Error) => {
        bootstrap.cache.isConnected = false;
        bootstrap.cache.sigHault = true;
        setWarning({ message: `XMPP Client has recieved an error => ${error.message}` })
        bootstrap.listener.emit(`onXMPPStatus`, {
            message: `Client has recieved an error`,
            data: {},
            type: `error`,
            error: true 
        })
    })
}