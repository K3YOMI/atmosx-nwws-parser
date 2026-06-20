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
import { setTimeoutAction } from "../@modules/@utilities/utilities.setTimeoutAction"
import { createHttp } from "../@modules/@utilities/utilities.createHttp"
import { isImageReady } from "../@modules/@utilities/utilities.isImageReady"
import { TypeWebhook } from "../@types/type.webhook";
import { getCleanedEvent } from "../@building/building.clean";
import { setEasTone } from "../@modules/@eas/eas.setEasTone";
import { readFileSync } from "fs";
import FormData from "form-data";

interface CreateWebhookOptions { 
    webhook: TypeWebhook
    event: TypeEvent
}

export const createWebhook = async (options: CreateWebhookOptions): Promise<void> => {
    const event = options.event.properties;
    const settings = options.webhook;
    const line = (label: string, value: unknown, condition = true) => condition && value ? `${label} ${value}` : null;
    const isLimited = setTimeoutAction({ identifier: options.webhook.webhook, interval: options.webhook.rate, max: options.webhook.rate, addTime: true })
    if (!isLimited.limited) {
        const isStatement = event.status_metadata.is_statement;
        const isExpired = event.status_metadata.is_expired;
        let body = [
            line(`**Locations:**`, event?.locations?.slice(0, 100)),
            line(`**Issued:**`, `<t:${Math.floor(new Date(event.issued).getTime() / 1000)}:R>`),
            line(`**Expires:**`, `<t:${Math.floor(new Date(event.expires).getTime() / 1000)}:R>`, !isExpired && !isStatement),
            line(`**Damage Threat:**`, event?.parameters?.damage_threat, !isExpired),
            line(`**Flood Threat:**`, event?.parameters?.flood_threat, !isExpired),
            line(`**Tornado Threat:**`, event?.parameters?.tornado_threat, !isExpired),
            line(`**Estimated Wind Gusts:**`, `${event?.parameters?.estimated_wind_gusts} ${event?.parameters?.wind_threat ? ` (${event?.parameters?.wind_threat})` : ''}`, !isExpired && event?.parameters?.estimated_wind_gusts != null),
            line(`**Estimated Hail Size:**`, `${event?.parameters?.estimated_hail_size} ${event?.parameters?.hail_threat ? ` (${event?.parameters?.hail_threat})` : ''}`, !isExpired && event?.parameters?.estimated_hail_size != null),
            line(`**Discussion:**`, event?.spc_parameters?.spc_number, !isExpired),
            line(`**Concern:**`, event?.spc_parameters?.spc_concerning, !isExpired),
            line(`**SPC Max Tornado Threat:**`, event?.spc_parameters?.spc_max_tornado, !isExpired),
            line(`**SPC Max Hail Threat:**`, event?.spc_parameters?.spc_max_hail, !isExpired),
            line(`**SPC Max Wind Threat:**`, event?.spc_parameters?.spc_max_wind, !isExpired),
            line(`**SPC Watch Issuance Probability:**`, event?.spc_parameters?.spc_watch_issuance ? `${event?.spc_parameters?.spc_watch_issuance}%` : null, !isExpired),
            line(`**Watch Number:**`, event?.watch_parameters?.watch_number, !isExpired),
            line(`**Strong Tornadoes Probability:**`, event?.watch_parameters?.strong_tornadoes_probability ? `${event?.watch_parameters?.strong_tornadoes_probability}%` : null, !isExpired),
            line(`**Additional Tornadoes Probability:**`, event?.watch_parameters?.additional_tornadoes_probability ? `${event?.watch_parameters?.additional_tornadoes_probability}%` : null, !isExpired),
            line(`**Combined Hail/Wind Probability:**`, event?.watch_parameters?.combined_hail_wind_probability ? `${event?.watch_parameters?.combined_hail_wind_probability}%` : null, !isExpired),
            line(`**Severe Hail Probability:**`, event?.watch_parameters?.severe_hail_probability ? `${event?.watch_parameters?.severe_hail_probability}%` : null, !isExpired),
            line(`**Hail >2in Probability:**`, event?.watch_parameters?.hail_2in_probability ? `${event?.watch_parameters?.hail_2in_probability}%` : null, !isExpired),
            line(`**Max Hail Inches:**`, event?.watch_parameters?.max_hail_in, !isExpired),
            line(`**Severe Wind Probability:**`, event?.watch_parameters?.severe_wind_probability ? `${event?.watch_parameters?.severe_wind_probability}%` : null, !isExpired),
            line(`**Max Surface Wind:**`, event?.watch_parameters?.max_wind_surface, !isExpired),
            line(`**Max Tops (x100 feet):**`, event?.watch_parameters?.max_tops_x100feet, !isExpired), 
            line(`**Tags:**`, event?.parameters?.tags?.length > 0 ? event?.parameters?.tags.join(', ') : null, !isExpired),
            line(`**Sender:**`, event?.geocode?.office?.name ? `${event?.geocode?.office?.name} (${event?.geocode?.office?.office})` : event?.geocode?.office?.office),
            line(`**Tracking:**`, event?.metadata?.tracking),
            line(`**Logs:**`, event?.metadata?.history?.length > 0 ? event?.metadata?.history.length : null),
            line(``, event?.description ? '```' + '\n' + event?.description.split('\n').map(l => l.trim()).filter(Boolean).join('\n') + '\n' + '```' : null, !isExpired)
        ].filter(Boolean).join('\n');
    
        if (body.length > 1900) {   
            body = body.substring(0, 1900) + "\n\n[Message truncated due to length]";
            const blocks = (body.match(/```/g) ?? []).length;
            if (blocks % 2 !== 0) body += "```";
        }
        if (event.description.length < 25) { return }
            
        const form = new FormData();
        const img = event.metadata.attachments?.[0]
        const embed = {
            title: `${event.event} (${event.status})`,
            description: body,
            color: 16711680,
            timestamp: new Date().toISOString(),
            image: {},
            footer: { text: settings.title }
        };
        if (img) {
            for (let i = 0; i < 6; i++) {
                const ok = await isImageReady(img)
                if (ok) break
                await new Promise(r => setTimeout(r, 10000))
            }
            const finalCheck = await isImageReady(img)
            if (finalCheck) {
                embed.image = { url: img }
            }
        }
        form.append("payload_json", JSON.stringify({
            username: settings.title ?? "AtmosphericX",
            content: settings.message ?? "",
            embeds: [embed]
        }));
        if (settings.upload) {
            form.append("fUpload", Buffer.from(`${event.metadata.raw}\n\n${JSON.stringify((getCleanedEvent(event)), null, 2)}`), { filename: `${event.event}_${event.status}_${event.metadata.tracking}.txt`, contentType: "application/text" });
        }
        if (settings.eas) { 
            const audio = await setEasTone({
                message: event.description,
                header: event.metadata.header
            });
            const file = readFileSync(audio)
            if (audio) {
                form.append("fEas", Buffer.from(file), { filename: `${event.event}_${event.status}_${event.metadata.tracking}_eas.mp3`, contentType: "audio/mpeg" });
            }
        }
        await createHttp({
            url: settings.webhook,
            timeout: 2000,
            method: `POST`,
            headers: form.getHeaders(),
            body: form
        })
    }
}
