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

import { TypeEvent } from "types/Event"
import { CreateHttp } from "@utilities/CreateHttp";
import { SetTimeoutAction } from "@utilities/SetTimeoutAction";
import { GetEmebedText } from "@parsers/text/GetEmbededText";
import { parentPort } from "worker_threads"
import { readFile } from "fs/promises"

interface TaskSendWebhook {
    event: TypeEvent;
    webhook: {
        enabled: boolean;
        destination: string;
        message: string;
        title: string;
        ratelimit: number;
    };
    attachments: {
        text?: string;
        eas?: string;
        json?: string;
    }
}

export const TaskSendWebhook = async function(options: TaskSendWebhook): Promise<void> { 
    const { event, webhook, attachments } = options;
    const { properties } = event;
    const isRatelimited = SetTimeoutAction({
        identifier: webhook.destination,
        interval: (webhook.ratelimit ?? 2) * 2,
        max: (webhook.ratelimit ?? 2), 
        addTime: true 
    })
    if (isRatelimited.limited) { return }
    const newForm = new FormData();
    const newEmbed = {
        title: `${properties.event} (${properties.status})`,
        description: GetEmebedText(event),
        fields: [],
        color: 16711680,
        timestamp: new Date().toISOString(),
        footer: { text: webhook.title ?? `AtmosphericX` }
    };
    if (properties.description && !properties.status_metadata.is_expired) {
        const description = properties.description.length > 900
            ? properties.description.substring(0, 900) + "\n\n[Message truncated due to length]"
            : properties.description;
        newEmbed.fields.push({
            name: "Description", 
            value: description ? '```' + '\n' + description.split('\n').map(l => l.trim()).filter(Boolean).join('\n') + '\n' + '```' : ""
        });
    }
    if (properties.metadata.attachments?.length > 0) {
        const attachments = properties.metadata.attachments.slice(0, 5);
        newEmbed.fields.push({
            name: "Attachments", 
            value: attachments.map(attachment => `- [${attachment.name.length > 45 ? attachment.name.substring(0, 45) + '...' : attachment.name}](${attachment.link})`).join('\n')
        });
    }
    if (attachments?.text) {
        newForm.append("fUpload", new Blob([Buffer.from(attachments.text)], {type: "application/text"}), `${properties.event}_${properties.status}_${properties.metadata.tracking}.txt`)
    }
    if (attachments?.json) {
        newForm.append("fUpload2", new Blob([Buffer.from(attachments.json)], {type: "application/json"}), `${properties.event}_${properties.status}_${properties.metadata.tracking}.json`)
    }
    if (attachments?.eas) {
        const file = await readFile(attachments.eas);
        newForm.append("fUpload3", new Blob([Buffer.from(file)], {type: "application/wav"}), `${properties.event}_${properties.status}_${properties.metadata.tracking}.wav`)
    }

    newForm.append("payload_json", JSON.stringify({ 
        username: webhook.title ?? `AtmosphericX`,
        content: webhook.message ?? "",
        embeds: [newEmbed]
    }));

    await CreateHttp({
        url: webhook.destination,
        timeout: 15e3,
        method: `POST`,
        body: newForm
    })
}