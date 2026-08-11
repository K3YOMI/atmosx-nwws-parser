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
import { SetDebug } from "@utilities/SetDebug"
import { GetMatched } from "@utilities/GetMatched"
import { GetStringText } from "@parsers/text/GetStringText"
import { GetCleanedEvent } from "@building/GetCleanedEvent"
import { TaskGenerateAudio } from "@tasks/TaskGenerateAudio"
import { TaskGenerateText } from "@tasks/TaskGenerateText"
import { TaskGenerateJSON } from "@tasks/TaskGenerateJSON"
import { TaskSendNTFY } from "@tasks/TaskSendNTFY"
import { TaskSendWebhook } from "@tasks/TaskSendWebhook"
import { QueueManager } from "@utilities/QueueManager"

const Webhooks = new QueueManager({ concurrency: 1 });
const NTFY = new QueueManager({ concurrency: 5 });

export const CreateTasks = async (events: TypeEvent[]): Promise<void> => {
    const tick = performance.now()
    const settings = bootstrap.settings as TypeSettings;
    const { ActionSettings, GlobalSettings, NotifyServer } = settings;
    const actions = ActionSettings as TypeActions[];
    
    for (const event of events) {
        const { properties } = event;
        const isActioning = Array.isArray(actions) && actions.length > 0;
        if (!isActioning) { continue }

        for (const action of actions) {
            const { Events, Webhook, NotificationServer, Uploads } = action;
            const isValidAction = GetMatched(Events, properties.event)
            if ((Events.length == 0 || isValidAction)) {
                const a = performance.now();
                const [eas, text, json] = await Promise.all([
                    Uploads?.EAS ? TaskGenerateAudio({
                        filename: (`${properties.event}_${properties.metadata.tracking}`).replace(/[\\:*?"<>|]/g, "_").replace(/\s+/g, " ").trim(),
                        description: properties.description,
                        header: properties.metadata.header
                    }).then((result) => { return result; }) : Promise.resolve(null),

                    Uploads?.TEXT ? TaskGenerateText({
                        string: properties.metadata.raw,
                        directory: GlobalSettings?.ArchiveSettings?.TextDirectory,
                        filename: (`${properties.event}_${properties.metadata.tracking}.txt`).replace(/[\\:*?"<>|]/g, "_").replace(/\s+/g, " ").trim()
                    }).then((result) => { return result; }) : Promise.resolve(null),

                    Uploads?.JSON ? TaskGenerateJSON({
                        string: JSON.stringify(GetCleanedEvent(event), null, 2),
                        directory: GlobalSettings?.ArchiveSettings?.JSONDirectory,
                        filename: (`${properties.event}_${properties.metadata.tracking}.json`).replace(/[\\:*?"<>|]/g, "_").replace(/\s+/g, " ").trim()
                    }).then((result) => { return result; }) : Promise.resolve(null),
                ]);

                SetDebug({ title: `Tasks/Generative`, message: `${Math.round(performance.now() - a)}ms` })

                const b = performance.now();
                await Promise.all([
                    NotificationServer?.Enabled && NotifyServer?.Enabled && NotificationServer?.Topic ? NTFY.enqueue(() => TaskSendNTFY({
                        event: event,
                        toggles: {
                            eas: Uploads?.EAS,
                            json: Uploads?.JSON,
                            text: Uploads?.TEXT
                        },
                        priority: NotificationServer?.Priority ?? 5,
                        body: GetStringText(event),
                        topic: NotificationServer?.Topic
                    })) : Promise.resolve(null),
                    Webhook?.Enabled && Webhook?.Destination ? Webhooks.enqueue(() => TaskSendWebhook({
                        event: event,
                        webhook: Webhook,
                        attachments: {
                            text: text,
                            eas: eas,
                            json: json
                        }
                    })) : Promise.resolve(null)
                ]);
                SetDebug({ title: `Tasks/Send`, message: `${Math.round(performance.now() - b)}ms` })
            }
        }
        SetDebug({ title: `Tasks/CompletedEventTask`, message: `${Math.round(performance.now() - tick)}ms` })
    }
    SetDebug({ title: `Tasks/Global`, message: `${Math.round(performance.now() - tick)}ms` })
}