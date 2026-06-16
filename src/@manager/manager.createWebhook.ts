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
import { TypeWebhook } from "../@types/types.webhook";
import { getCleanedEvent } from "../@building/building.clean";
import FormData from "form-data";

interface CreateWebhookOptions { 
    webhook: TypeWebhook
    event: TypeEvent
}

export const createWebhook = async (options: CreateWebhookOptions): Promise<void> => {
    const event = options.event.properties;
    const settings = options.webhook;
    
    let body = [
        event.locations ? `**Locations**: ${event.locations.slice(0,100)}` : null,
        event.issued && event.status != `Expired` ? `**Issued**: <t:${Math.floor(new Date(event.issued).getTime()/1000)}:R>` : null,
        event.expires && event.status != `Statement` ? `**Expires**: <t:${Math.floor(new Date(event.expires).getTime()/1000)}:R>` : null,
        (() => {
            const val = event.parameters.estimated_wind_gusts ?? null
            const th = event.parameters.wind_threat ?? null
            const combined = [val, th].filter(Boolean).join(' ');
            return combined ? `**Wind Gusts**: ${val} ${th ? `(${th})` : ''}` : null;
        })(),
        (() => {
            const val = event.parameters.estimated_hail_size ?? null
            const th = event.parameters.hail_threat ?? null
            return (val ?? th) ? `**Hail Threat**: ${val} ${th ? `(${th})` : ''}` : null;
        })(),
        event.parameters.damage_threat ? `**Damage Threat**: ${event.parameters.damage_threat}` : null,
        event.parameters.flood_threat ? `**Flood Threat**: ${event.parameters.flood_threat}` : null,
        event.parameters.tornado_threat ? `**Tornado Threat**: ${event.parameters.tornado_threat}` : null,
        event.spc_parameters.spc_max_tornado ? `**Max Tornado Threat**: ${event.spc_parameters.spc_max_tornado}` : null,
        event.spc_parameters.spc_max_hail ? `**Max Hail Threat**: ${event.spc_parameters.spc_max_hail}` : null,
        event.spc_parameters.spc_max_wind ? `**Max Wind Threat**: ${event.spc_parameters.spc_max_wind}` : null,
        event.spc_parameters.spc_watch_issuance ? `**Watch Issuance**: ${event.spc_parameters.spc_watch_issuance}%` : null,
        event.watch_parameters.watch_number ? `**Watch Number**: ${event.watch_parameters.watch_number}` : null,
        event.watch_parameters.strong_tornadoes_probability ? `**Strong Tornadoes Probability**: ${event.watch_parameters.strong_tornadoes_probability}%` : null,
        event.watch_parameters.additional_tornadoes_probability ? `**Additional Tornadoes Probability**: ${event.watch_parameters.additional_tornadoes_probability}%` : null,
        event.watch_parameters.combined_hail_wind_probability ? `**Combined Hail/Wind Probability**: ${event.watch_parameters.combined_hail_wind_probability}%` : null,        
        event.watch_parameters.severe_hail_probability ? `**Severe Hail Probability**: ${event.watch_parameters.severe_hail_probability}%` : null,
        event.watch_parameters.hail_2in_probability ? `**Hail ≥2in Probability**: ${event.watch_parameters.hail_2in_probability}%` : null,
        event.watch_parameters.max_hail_in ? `**Max Hail Inches**: ${event.watch_parameters.max_hail_in}` : null,
        event.watch_parameters.severe_wind_probability ? `**Severe Wind Probability**: ${event.watch_parameters.severe_wind_probability}%` : null,
        event.watch_parameters.max_wind_surface ? `**Max Surface Wind**: ${event.watch_parameters.max_wind_surface}` : null,
        event.watch_parameters.max_tops_x100feet ? `**Max Tops (x100 feet)**: ${event.watch_parameters.max_tops_x100feet}` : null,
        (event.parameters.tags?.length > 0) ? `**Tags**: ${event.parameters.tags.join(', ')}` : null,
        (() => {
            const val = event.geocode?.office?.name ?? `N/A`
            const th = event.geocode?.office?.office ?? null
            return (val ?? th) ? `**Sender**: ${val} ${th ? `(${th})` : ''}` : null;
        })(),
        event.metadata?.tracking ? `**Tracking**: ${event.metadata.tracking}` : null,
        event.metadata.history?.length > 0 ? `**Logs**: ${event.metadata.history.length}` : null,
        (() => {
            if (event.status == `Expired`) { return null }
            const desc = (event.description ?? '').split('\n').map(l => l.trim()).filter(Boolean).join('\n');
            return desc ? '```' + '\n' + desc + '\n' + '```' : null;
        })(),
    ].filter(Boolean).join('\n');

    const isLimited = setTimeoutAction({ identifier: options.webhook.webhook, interval: options.webhook.rate, max: options.webhook.rate, addTime: true })
    if (isLimited.limited) { return }

    if (body.length > 1900) {   
        body = body.substring(0, 1900) + "\n\n[Message truncated due to length]";
        const blocks = (body.match(/```/g) ?? []).length;
        if (blocks % 2 !== 0) body += "```";
    }
    const form = new FormData();
    const embed = {
        title: `${event.event} (${event.status})`,
        description: body,
        color: 16711680,
        timestamp: new Date().toISOString(),
        footer: { text: settings.title }
    };
    form.append("payload_json", JSON.stringify({
        username: settings.title ?? "AtmosphericX",
        content: settings.message ?? "",
        embeds: [embed]
    }));
    if (settings.upload) {
        form.append("file", Buffer.from(JSON.stringify((getCleanedEvent(event)), null, 2)), {
            filename: `${event.event}_${event.status}_${event.metadata.tracking}.json`,
            contentType: "application/json"
        });
    }
    await createHttp({
        url: settings.webhook,
        timeout: 2000,
        method: `POST`,
        headers: form.getHeaders(),
        body: form
    })
}
