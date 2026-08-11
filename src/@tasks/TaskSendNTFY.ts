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
import { bootstrap } from "@bootstrap"
import { CreateHttp } from "@utilities/CreateHttp";
import { SetDebug } from "@utilities/SetDebug";
import { SetTimeoutAction } from "@utilities/SetTimeoutAction";

interface TaskSendNTFYOptions {
    event: TypeEvent;
    toggles?: {
        eas?: boolean;
        json?: boolean;
        text?: boolean;
    },
    priority: string | number;
    body: string;
    topic: string;
}

export const TaskSendNTFY = async function(options: TaskSendNTFYOptions): Promise<void> { 
    const { event, toggles, priority, body, topic } = options;
    const { properties } = event;

    const configurations = bootstrap.settings.NotifyServer;
    const authentication = configurations?.Credentials?.Username && configurations?.Credentials?.Password ? { 
        username: configurations.Credentials.Username, 
        password: configurations.Credentials.Password 
    } : undefined;
    const image = properties.metadata.attachments?.find(a => a.name === "Image: Graphic");

    const buttons = [
        ...(toggles?.eas && configurations?.MediaStorage?.EAS ? [{
            "action": "view",
            "label": "Listen",
            "url": `${configurations.MediaStorage.EAS}/${properties.event}_${properties.metadata.tracking}.wav`,
        }] : []),
        ...(toggles?.text && configurations?.MediaStorage?.TEXT ? [{
            "action": "view",
            "label": "View Text",
            "url": `${configurations.MediaStorage.TEXT}/${properties.event}_${properties.metadata.tracking}.txt`,
        }] : []),
        ...(image ? [{
            "action": "view",
            "label": "View Image",
            "url": image.link,
        }] : []),
    ];

    const headers = {
        "Title": `${properties.event} (${properties.status})`,
        "Tags": properties.parameters.tags?.join(",") ?? "N/A",
        "Priority": priority ?? "5",
        ...(buttons.length > 0 && { "Actions": JSON.stringify(buttons) }),
    };

    const post = async (topic: string) => {
        const response = await CreateHttp({
            url: `${configurations?.Server?.replace(/\/$/, "")}/${topic}`,
            timeout: 15_000,
            method: "PUT",
            ...(authentication && { auth: authentication }),
            headers,
            body
        })
        if (response.error) { 
            SetDebug({ title: `Tasks/NTFY`, message: `Failed to send notification to topic "${topic}": ${response.message}` })
        }
    }
    const topics = [
        topic,
        ...(properties.metadata.filtered_proximity ? ["LOCAL"] : []),
        ...properties.location_states.map((state) => `${topic}-${state}`),
    ];

    await Promise.all([...new Set(topics)].map(post));
}