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
    Documentation: https://atmosphericx.scriptkitty.cafe/documentation

    Independent Package: @atmosx/event-product-parser

*/

import { TypeEvent } from "StaticTypes/Event"
import { Bootstrap } from "@Bootstrap"
import { CreateHttp } from "@Utilities/CreateHttp";
import { SetDebug } from "@Utilities/SetDebug";

interface TaskSendNTFYOptions {
    Event: TypeEvent
    Toggles?: {
        EAS?: boolean
        Json?: boolean
        Text?: boolean
        Image?: boolean
    },
    Priority: string | number
    Body: string
    Topic: string
}

export const TaskSendNTFY = async function({ Event, Toggles, Priority, Body, Topic }: TaskSendNTFYOptions): Promise<void> { 
    const { properties } = Event;

    const configurations = Bootstrap.Settings.NotifyServer;
    const authentication = configurations?.Credentials?.Username && configurations?.Credentials?.Password ? { 
        Username: configurations.Credentials.Username, 
        Password: configurations.Credentials.Password 
    } : undefined;

    const A = properties?.geocode?.ugc?.map(ugc => ugc.match(/^([A-Z]{2})[CZ](\d{3})$/)?.[1]).filter(Boolean) ?? null;
    const B = A?.filter((state, index) => A.indexOf(state) === index).join(`-`)
    const image = properties?.metadata?.attachments?.find(a => a.name === "Image: Graphic") 
        ?? (Toggles?.Image && configurations?.MediaStorage?.IMAGE 
            ? { link: `${configurations?.MediaStorage?.IMAGE}/${B}/${properties?.event}_${properties?.metadata?.tracking}.png` 
        } : undefined);
    const buttons = [
        ...(Toggles?.EAS && configurations?.MediaStorage?.EAS ? [{
            "action": "view",
            "label": "Listen",
            "url": `${configurations.MediaStorage.EAS}/${properties.event}_${properties.metadata.tracking}.wav`,
        }] : []),
        ...(Toggles?.Text && configurations?.MediaStorage?.TEXT ? [{
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
        "Priority": Priority ?? "5",
        ...(buttons.length > 0 && { "Actions": JSON.stringify(buttons) }),
    };

    const post = async (topic: string) => {
        const response = await CreateHttp({
            URL: `${configurations?.Server?.replace(/\/$/, "")}/${topic}`,
            Timeout: 15_000,
            Method: "PUT",
            ...(authentication && { Auth: authentication }),
            Headers: headers,
            Body: Body
        })
        if (response.error) { 
            SetDebug({ Title: `Tasks/NTFY`, Message: `Failed to send notification to topic "${topic}": ${response.message}` })
        }
    }
    const topics = [
        Topic,
        ...(properties.metadata.filtered_proximity ? [`${Topic}-LOCAL`] : []),
    ];

    await Promise.all([...new Set(topics)].map(post));
}