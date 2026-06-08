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

import { createWebhook } from "../@modules/@utilities/utilities.createWebhook";
import { TypeEvent } from "../@types/type.event";
import { TypeWebhook } from "../@types/types.webhook";
import { bootstrap } from "../bootstrap"


export const updateWebhooks = async (event: TypeEvent): Promise<void> => {
    const settings = bootstrap.settings;
    const webhooks = settings.WebhookSettings as TypeWebhook[];
    const eventName = event.properties.event;
    for (const socket of webhooks) {
        const events = socket.events;
        if (!events || events.length === 0) {
            await createWebhook({ webhook: socket, event });
            continue;
        }
        const matched = events.some(pattern => {
            if (!pattern) return false;
            if (pattern === "*" || pattern === eventName) return true;
            if (pattern.includes("*")) {
                const regex = "^" +
                    pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$";
                return new RegExp(regex).test(eventName);
            }
            return false;
        });
        if (matched) {
            await createWebhook({ webhook: socket, event });
        }
    }
};