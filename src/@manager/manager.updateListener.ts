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
import { getCleanedEvent } from "../@building/building.clean"
import { createHttp } from "../@modules/@utilities/utilities.createHttp";
import { existsSync, mkdirSync, writeFileSync, readFileSync, appendFileSync } from "fs";
import FormData from "form-data";



export const updateListener = async (event: TypeEvent): Promise<void> => {
    const settings = bootstrap.settings;
    const listeners = settings.ListenerSettings as TypeListener[];
    const properties = event.properties;
    const metadata = { 
        file: null,
        eas: null,
        name: properties.event,
        status: properties.status,
        description: properties.description,
        tracking: properties.metadata.tracking,
        header: properties.metadata.header,
        raw: properties.metadata.raw,
        expired: properties.status_metadata.is_expired,
        attachments: properties.metadata.attachments
    }

    for (const listener of listeners) {
        const events = listener?.events;
        const webhook = listener?.webhook;
        const uploads = listener?.uploads
        const isMatched = events.some(pattern => {
            if (!pattern) return false;
            if (pattern === "*" || pattern === metadata.name) return true;
            if (pattern.includes("*")) {
                const regex = "^" +
                    pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$";
                return new RegExp(regex).test(metadata.name);
            }
            return false;
        });

        if (events?.length == 0 || isMatched) {
            if (uploads?.eas) { 
                metadata.eas = await setEasTone({
                    title: `${metadata.name}_${metadata.status}_${metadata.tracking}`,
                    message: metadata.description,
                    header: metadata.header
                });
            }

            if (uploads?.file) {
                const fDestination = settings.GlobalSettings.ArchiveSettings.TextDirectory;
                if (fDestination) {
                    if (!existsSync(fDestination)) { mkdirSync(fDestination, { recursive: true }); }
                    if (existsSync(`${fDestination}/${metadata.name}_${metadata.status}_${metadata.tracking}.txt`)) {
                        appendFileSync(`${fDestination}/${metadata.name}_${metadata.status}_${metadata.tracking}.txt`, metadata.raw);
                    } else {
                        writeFileSync(`${fDestination}/${metadata.name}_${metadata.status}_${metadata.tracking}.txt`, metadata.raw);
                    }
                }
                metadata.file = metadata.raw;
            }

            if (uploads?.event) {
                const eDestination = settings.GlobalSettings.ArchiveSettings.EventDirectory;
                if (eDestination) {
                    if (!existsSync(eDestination)) { mkdirSync(eDestination, { recursive: true }); }
                    writeFileSync(`${eDestination}/${metadata.name}_${metadata.status}_${metadata.tracking}.json`, JSON.stringify(getCleanedEvent(event), null, 2));
                }
            }

            if (webhook.enabled && webhook.destination) {
                const ratelimit = setTimeoutAction({ identifier: webhook.destination, interval: webhook.ratelimit, max: webhook.ratelimit, addTime: true })
                const form = new FormData();
                const embed = {
                    title: `${metadata.name} (${metadata.status})`,
                    description: getEmebed(event),
                    fields: [],
                    color: 16711680,
                    timestamp: new Date().toISOString(),
                    footer: { text: webhook.title ?? `AtmosphericX` }
                };

                if (ratelimit.limited) { return } 


                if (metadata.description && !metadata.expired) {
                    if (metadata.description.length > 900) {   
                        metadata.description = metadata.description.substring(0, 900) + "\n\n[Message truncated due to length]";
                    }
                    embed.fields.push({
                        name: "Description", 
                        value: metadata.description ? '```' + '\n' + metadata.description.split('\n').map(l => l.trim()).filter(Boolean).join('\n') + '\n' + '```' : ""
                    });
                }


                if (metadata.attachments?.length > 0) {
                    metadata.attachments = metadata.attachments.slice(0, 5);
                    embed.fields.push({
                        name: "Attachments", 
                        value: metadata.attachments.map(attachment => `- [${attachment.name.length > 45 ? attachment.name.substring(0, 45) + '...' : attachment.name}](${attachment.link})`).join('\n')
                    });
                }

                if (uploads?.file) { 
                    form.append("fUpload", Buffer.from(metadata.file), { 
                        filename: `${properties.event}_${properties.status}_${properties.metadata.tracking}.txt`, 
                        contentType: "application/text" 
                    });
                }

                if (uploads?.eas) { 
                    if (metadata.eas) {
                        const file = readFileSync(metadata.eas)
                        form.append("fEas", Buffer.from(file), { 
                            filename: `${properties.event}_${properties.status}_${properties.metadata.tracking}_eas.mp3`, 
                            contentType: "audio/mpeg" 
                        });
                    }
                }

                form.append("payload_json", JSON.stringify({
                    username: webhook.title ?? "AtmosphericX",
                    content: webhook.message ?? "",
                    embeds: [embed]
                }));

                await createHttp({
                    url: webhook.destination,
                    timeout: 5000,
                    method: `POST`,
                    headers: form.getHeaders(),
                    body: form
                })
            }
        }
    }
}