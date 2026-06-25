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


import { TypeEvent } from "../@types/type.event";
import { TypeListener } from "../@types/type.listener";
import { bootstrap } from "../bootstrap"
import { setEasTone } from "../@modules/@eas/eas.setEasTone"
import { setTimeoutAction } from "../@modules/@utilities/utilities.setTimeoutAction";
import { getEmebed } from "../@parsers/@text/text.getEmbed";
import { createHttp } from "../@modules/@utilities/utilities.createHttp";
import { existsSync, mkdirSync, writeFileSync, readFileSync, appendFileSync } from "fs";
import FormData from "form-data";




export const updateListener = async (event: TypeEvent): Promise<void> => {
    const settings = bootstrap.settings;
    const listeners = settings.ListenerSettings as TypeListener[];
    const properties = event.properties;
    for (const socket of listeners) {
        const events = socket.events;
        const sWebhook = socket?.webhook;
        const sUploads = socket?.uploads;
      

        const matched = events.some(pattern => {
            if (!pattern) return false;
            if (pattern === "*" || pattern === properties.event) return true;
            if (pattern.includes("*")) {
                const regex = "^" +
                    pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$";
                return new RegExp(regex).test(properties.event);
            }
            return false;
        });
        if (events?.length == 0 || matched) {
            let eas;
            let file;

            if (sUploads?.eas) { 
                eas = await setEasTone({
                    title: `${properties.event}_${properties.status}_${properties.metadata.tracking}`,
                    message: properties.description,
                    header: properties.metadata.header
                });
            }
            if (sUploads?.file) { 
                const destination = bootstrap.settings.GlobalSettings.ArchiveSettings.TextDirectory;
                if (destination) {
                    if (!existsSync(destination)) { mkdirSync(destination, { recursive: true }); }
                    if (existsSync(`${destination}/${properties.event}_${properties.status}_${properties.metadata.tracking}.txt`)) {
                        appendFileSync(`${destination}/${properties.event}_${properties.status}_${properties.metadata.tracking}.txt`, properties.metadata.raw);
                    } else {
                        writeFileSync(`${destination}/${properties.event}_${properties.status}_${properties.metadata.tracking}.txt`, properties.metadata.raw);
                    }
                }
                file = properties.metadata.raw;
            }

            if (sWebhook?.enabled) { 
                const isLimited = setTimeoutAction({ identifier: sWebhook.destination, interval: sWebhook.ratelimit, max: sWebhook.ratelimit, addTime: true })
                if (!isLimited.limited) {
                    let body = getEmebed(event);
                    if (body.length > 1900) {   
                        body = body.substring(0, 1900) + "\n\n[Message truncated due to length]";
                        const blocks = (body.match(/```/g) ?? []).length;
                        if (blocks % 2 !== 0) body += "```";
                    }

                    if (properties.description.length < 25) { continue } 
                     
                    const form = new FormData();
                    const embed = {
                        title: `${properties.event} (${properties.status})`,
                        description: body,
                        color: 16711680,
                        timestamp: new Date().toISOString(),
                        image: {},
                        footer: { text: sWebhook.title ?? `AtmosphericX` }
                    };
                    form.append("payload_json", JSON.stringify({
                        username: sWebhook.title ?? "AtmosphericX",
                        content: sWebhook.message ?? "",
                        embeds: [embed]
                    }));
                    if (sUploads?.file) { 
                        form.append("fUpload", Buffer.from(file), { filename: `${properties.event}_${properties.status}_${properties.metadata.tracking}.txt`, contentType: "application/text" });
                    }
                    if (sUploads?.eas) { 
                        if (eas) {
                            const file = readFileSync(eas)
                            form.append("fEas", Buffer.from(file), { filename: `${properties.event}_${properties.status}_${properties.metadata.tracking}_eas.mp3`, contentType: "audio/mpeg" });
                        }
                    }
                    const a = await createHttp({
                        url: sWebhook.destination,
                        timeout: 5000,
                        method: `POST`,
                        headers: form.getHeaders(),
                        body: form
                    })
                }
            }
        }
    }
};