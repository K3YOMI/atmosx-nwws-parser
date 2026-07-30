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
import { TypeEvent } from "types/Event"
import { TypeActions } from "types/Actions"
import { bootstrap } from "@bootstrap"
import { GenerateEASMessage } from "@eas/GenerateEASMessage"
import { GetEmebedText } from "@parsers/text/GetEmbededText"
import { GetStringText } from "@parsers/text/GetStringText"
import { GetCleanedEvent } from "@building/GetCleanedEvent"
import { SetTimeoutAction } from "@utilities/SetTimeoutAction"
import { CreateHttp } from "@utilities/CreateHttp"
import { SetDebug } from "@utilities/SetDebug"
import { GetMatched } from "@utilities/GetMatched"
import { mkdir, writeFile, readFile, appendFile } from "fs/promises"

export const Tasks = async (events: TypeEvent[]): Promise<void> => {
    const tick = performance.now()
    const settings = bootstrap.settings as TypeSettings;
    const notifyServer = settings.NotifyServer;
    const actions = settings.ActionSettings as TypeActions[];
    for (const event of events) {
        const properties = event.properties;
        const hasActions = Array.isArray(actions) && actions.length > 0;
        if (!hasActions) {
            SetDebug({ title: `Tasks`, message: `${Math.round(performance.now() - tick)}ms` });
            return;
        }
        const metadata = { 
            text: null,
            eas: null,
            json: null,
            name: properties.event,
            status: properties.status,
            description: properties.description,
            tracking: properties.metadata.tracking,
            header: properties.metadata.header,
            raw: properties.metadata.raw,
            expired: properties.status_metadata.is_expired,
            attachments: properties.metadata.attachments
        }

        const archiveSettings = settings.GlobalSettings?.ArchiveSettings;
        const textArchiveDir = archiveSettings?.TextDirectory;
        const jsonArchiveDir = archiveSettings?.JSONDirectory;
        const eventBaseName = `${metadata.name}_${metadata.tracking}`;
        const easTitle = `${metadata.name}_${metadata.status}_${metadata.tracking}`;
        const cleanedEventText = JSON.stringify(GetCleanedEvent(event), null, 2);
        const stringText = GetStringText(event);
        const embedText = GetEmebedText(event);

        for (const action of actions) {
            const events = action?.Events;
            const webhook = action?.Webhook;
            const notify = action?.NotificationServer;
            const uploads = action?.Uploads
            const isMatched = GetMatched(events ?? [], metadata.name)

            if (events?.length == 0 || isMatched) {
                const t = performance.now()

                if (uploads?.EAS && !metadata.eas) {  
                    metadata.eas = await GenerateEASMessage({
                        title: easTitle,
                        message: metadata.description,
                        header: metadata.header
                    });
                    SetDebug({
                        title: "Tasks/EAS",
                        message: `${Math.round(performance.now() - t)}ms`
                    });
                }

                if (uploads?.TEXT && metadata.text === null) {
                    const t = performance.now()
                    if (textArchiveDir) {
                        const file = (`${textArchiveDir}/${eventBaseName}.txt`).replace(/[\\:*?"<>|]/g, "_").replace(/\s+/g, " ").trim();
                        await mkdir(textArchiveDir, { recursive: true });
                        await appendFile(file, `${metadata.raw}${"\n".repeat(5)}`);
                        SetDebug({
                            title: "Tasks/TEXT",
                            message: `${Math.round(performance.now() - t)}ms`
                        });
                    }
                    metadata.text = metadata.raw;
                }

                if (uploads?.JSON && metadata.json === null) {
                    const t = performance.now()
                    if (jsonArchiveDir) {
                        const file = (`${jsonArchiveDir}/${eventBaseName}.json`).replace(/[\\:*?"<>|]/g, "_").replace(/\s+/g, " ").trim();
                        await mkdir(jsonArchiveDir, { recursive: true });
                        await writeFile(file, cleanedEventText);
                        SetDebug({
                            title: "Tasks/JSON",
                            message: `${Math.round(performance.now() - t)}ms`
                        });
                    }
                    metadata.json = cleanedEventText;
                }

                if (notifyServer?.Enabled && notify?.Enabled && notify?.Topic) {
                    let buttons = [];
                    const t = performance.now()
                    const auth = notifyServer?.Credentials?.Username && notifyServer?.Credentials?.Password ? { username: notifyServer?.Credentials?.Username, password: notifyServer?.Credentials?.Password } : undefined;
                    const image = metadata.attachments?.find(a => a.name === "Image: Graphic");
                    
                    
                    if (notifyServer?.MediaStorage?.EAS) {
                        if (metadata.eas) {
                            buttons.push({
                                "action": "view",
                                "label": "Listen",
                                "url": `${notifyServer?.MediaStorage?.EAS}/${metadata.name}_${metadata.status}_${metadata.tracking}.wav`,
                            })
                        }
                    }
                    if (metadata.json) {
                        buttons.push({
                            "action": "view",
                            "label": "View JSON",
                            "url": `${notifyServer?.MediaStorage?.JSON}/${metadata.name}_${metadata.tracking}.json`,
                        })
                    }
                    if (metadata.text) {
                        buttons.push({
                            "action": "view",
                            "label": "View Text",
                            "url": `${notifyServer?.MediaStorage?.TEXT}/${metadata.name}_${metadata.tracking}.txt`,
                        })
                    }
                    if (image) {
                        buttons.push({
                            "action": "view",
                            "label": "View Image",
                            "url": image.link,
                        })
                    }
                    await CreateHttp({
                        url: `${notifyServer?.Server?.replace(/\/$/, "")}/${notify.Topic}`,
                        timeout: 15_000,
                        method: "PUT",
                        ...(auth && { auth }),
                        headers: {
                            "Title": `${metadata.name} (${metadata.status})`,
                            "Tags":  properties.parameters.tags?.join(",") ?? "N/A",
                            "Priority": notify?.Priority ?? "5",
                            ... (buttons.length > 0 && { "Actions": JSON.stringify(buttons) }),
                        },
                        body: stringText
                    })
                    SetDebug({
                        title: "Tasks/NTFY",
                        message: `${Math.round(performance.now() - t)}ms`
                    });
                }

                if (webhook?.Enabled && webhook?.Destination) {
                    const t = performance.now()
                    const isRatelimited = SetTimeoutAction({ identifier: webhook.Destination, interval: (webhook.Ratelimit ?? 2) * 2, max: (webhook.Ratelimit ?? 2), addTime: true })
                    const form = new FormData();
                    const embed = {
                        title: `${metadata.name} (${metadata.status})`,
                        description: embedText,
                        fields: [],
                        color: 16711680,
                        timestamp: new Date().toISOString(),
                        footer: { text: webhook.Title ?? `AtmosphericX` }
                    };

                    if (isRatelimited.limited) { return } 


                    if (metadata.description && !metadata.expired) {
                        const description = metadata.description.length > 900
                            ? metadata.description.substring(0, 900) + "\n\n[Message truncated due to length]"
                            : metadata.description;
                        embed.fields.push({
                            name: "Description", 
                            value: description ? '```' + '\n' + description.split('\n').map(l => l.trim()).filter(Boolean).join('\n') + '\n' + '```' : ""
                        });
                    }


                    if (metadata.attachments?.length > 0) {
                        const attachments = metadata.attachments.slice(0, 5);
                        embed.fields.push({
                            name: "Attachments", 
                            value: attachments.map(attachment => `- [${attachment.name.length > 45 ? attachment.name.substring(0, 45) + '...' : attachment.name}](${attachment.link})`).join('\n')
                        });
                    }

                    if (uploads?.TEXT) { 
                        form.append("fUpload", new Blob([Buffer.from(metadata.text)], {type: "application/text"}), `${properties.event}_${properties.status}_${properties.metadata.tracking}.txt`)
                    }

                    if (uploads?.JSON) { 
                        form.append("fUpload2", new Blob([Buffer.from(metadata.json)], {type: "application/json"}), `${properties.event}_${properties.status}_${properties.metadata.tracking}.json`)
                    }

                    if (uploads?.EAS) { 
                        if (metadata.eas) {
                            const file = await readFile(metadata.eas);
                            form.append("fEas", new Blob([Buffer.from(file)], { type: "audio/mpeg" }), `${properties.event}_${properties.status}_${properties.metadata.tracking}_eas.mp3`)
                        }
                    }

                    form.append("payload_json", JSON.stringify({
                        username: webhook.Title ?? "AtmosphericX",
                        content: webhook.Message ?? "",
                        embeds: [embed]
                    }));

                    await CreateHttp({
                        url: webhook.Destination,
                        timeout: 15e3,
                        method: `POST`,
                        body: form
                    })
                    SetDebug({
                        title: "Tasks/Webhook",
                        message: `${Math.round(performance.now() - t)}ms`
                    });
                }
            }
        }
    }
    SetDebug({ title: `Tasks`, message: `${Math.round(performance.now() - tick)}ms` })
}