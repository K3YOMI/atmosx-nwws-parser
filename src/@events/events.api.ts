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

import { TypeStanzaCompiled } from "../@types/type.compiled"
import { TypeEvent } from "../@types/type.event";
import { getEventTracking } from "../@building/building.tracking";
import { validateEvents } from "../@building/building.validate";
import { getEventOffice } from "../@building/building.office";
import { getEventTags } from "../@building/building.tags";
import { getTextFromProduct } from "../@parsers/@text/text.getTextFromProduct";
import { officeICAOs } from "../@dictionaries/dictionaries.officeICAOs";

export const api = async (stanza: TypeStanzaCompiled): Promise<void> => {
    let processed: TypeEvent[] = [];
    const messages =  Object.values(JSON.parse(stanza.message).features) as any;
    for (const feature of messages) {
        const tick = performance.now();
        const pVtec = feature?.properties?.parameters?.VTEC?.[0] ?? null
        processed.push({
            type: `Feature`,
            geometry: {
                type: `Point`,
                coordinates: []
            },
            properties: { 
                event: feature?.properties?.event ?? null,
                parent: feature?.properties?.event ?? null,
                status: feature?.properties?.messageType ?? null,
                issued: feature?.properties?.sent ? new Date(feature?.properties?.sent).toISOString() : null,
                expires: feature?.properties?.expires ? new Date(feature?.properties?.expires).toISOString() : null,
                locations: feature?.properties?.areaDesc ?? null,
                description: feature?.properties?.description ?? null,
                attributes: feature?.properties?.attributes ?? {},
                geocode: {
                    office: {
                        office: pVtec ? pVtec.split(`.`)[2] : null,
                        name: officeICAOs[pVtec ? pVtec.split(`.`)[2] : null] ?? null,
                    },
                    organization:  feature?.properties?.parameters?.WMOidentifier?.[0],
                    ugc: feature?.properties?.geocode?.UGC ?? [], 
                    polygon: feature?.geometry?.coordinates.length > 0 ? Buffer.from(JSON.stringify([feature?.geometry?.coordinates[0]])).toString('base64') : null,
                    polygon_generated: feature?.geometry?.coordinates.length > 0 ? true : false,
                },
                parameters: {
                    tags: getEventTags(feature?.properties?.description),
                    instructions: feature?.properties?.instruction ?? null,
                    source: getTextFromProduct({ message: feature?.properties?.description, find: [`SOURCE...`], removal: [`.`]}) ?? null,
                    hazards: getTextFromProduct({ message: feature?.properties?.description, find: [`HAZARD...`], removal: [`.`]}) ?? null,
                    impacts: getTextFromProduct({ message: feature?.properties?.description, find: [`IMPACT...`], removal: [`.`]}) ?? null,
                    estimated_hail_size: feature?.properties?.parameters?.maxHailSize?.[0] ?? null,
                    estimated_wind_gusts: feature?.properties?.parameters?.maxWindGust?.[0] ?? null,
                    damage_threat: feature?.properties?.parameters?.thunderstormDamageThreat?.[0] ?? null,
                    tornado_threat: feature?.properties?.parameters?.tornadoDetection?.[0] ?? null,
                    flood_threat: feature?.properties?.parameters?.floodDetection?.[0] ?? null,
                    wind_threat: feature?.properties?.parameters?.windThreat?.[0] ?? null,
                    hail_threat: feature?.properties?.parameters?.hailThreat?.[0] ?? null,
                },
                spc_parameters: {
                    spc_number: getTextFromProduct({ message: feature?.properties?.description, find: [`Mesoscale Discussion `], removal: [`Mesoscale Discussion`, `Number`, `...`] }) ?? null,
                    spc_concerning: getTextFromProduct({ message: feature?.properties?.description, find: [`Concerning...`] }) ?? null,
                    spc_max_tornado: getTextFromProduct({ message: feature?.properties?.description, find: [`MOST PROBABLE PEAK TORNADO INTENSITY...`] }) ?? null,
                    spc_max_hail: getTextFromProduct({ message: feature?.properties?.description, find: [`MOST PROBABLE PEAK HAIL SIZE...`] }) ?? null,
                    spc_max_wind: getTextFromProduct({ message: feature?.properties?.description, find: [`MOST PROBABLE PEAK WIND GUST...`] }) ?? null,
                    spc_watch_issuance: getTextFromProduct({ message: feature?.properties?.description, find: [`Probability of Watch Issuance...`], removal: [`percent`]}) ?? null,
                },
                watch_parameters: {
                    watch_number: getTextFromProduct({ message: feature?.properties?.description, find: [`ITIES FOR`, `UPDATE FOR`, `Watch Number `], removal: [`%`, `<`, `:`] })?.replace(/(WT|WS|)/g, '')?.trim() ?? null,
                    watch_type: feature?.properties?.description.includes(`TORNADO WATCH`) ? `Tornado` : feature?.properties?.description.includes(`SEVERE`) ? `Severe` : null,
                    additional_tornadoes_probability: getTextFromProduct({ message: feature?.properties?.description, find: [`PROB OF 2 OR MORE TORNADOES`], removal: [`%`, `<`, `:`] }) ?? null,
                    strong_tornadoes_probability: getTextFromProduct({ message: feature?.properties?.description, find: [`PROB OF 1 OR MORE STRONG /EF2-EF5/ TORNADOES`], removal: [`%`, `<`, `:`] }) ?? null,
                    severe_wind_probability: getTextFromProduct({ message: feature?.properties?.description, find: [`PROB OF 10 OR MORE SEVERE WIND EVENTS`], removal: [`%`, `<`, `:`] }) ?? null,
                    severe_hail_probability: getTextFromProduct({ message: feature?.properties?.description, find: [`PROB OF 10 OR MORE SEVERE HAIL EVENTS`], removal: [`%`, `<`, `:`] }) ?? null,
                    hail_2in_probability: getTextFromProduct({ message: feature?.properties?.description, find: [`PROB OF 1 OR MORE HAIL EVENTS >= 2 INCHES`], removal: [`%`, `<`, `:`] }) ?? null,
                    combined_hail_wind_probability: getTextFromProduct({ message: feature?.properties?.description, find: [`PROB OF 6 OR MORE COMBINED SEVERE HAIL/WIND EVENTS`], removal: [`%`, `<`, `:`] }) ?? null,
                    max_hail_in: getTextFromProduct({ message: feature?.properties?.description, find: [`MAX HAIL /INCHES/`], removal: [`%`, `<`, `:`] }) ?? null,
                    max_wind_surface:  getTextFromProduct({ message: feature?.properties?.description, find: [`MAX WIND GUSTS SURFACE /KNOTS/`], removal: [`%`, `<`, `:`] }) ?? null,
                    max_tops_x100feet:  getTextFromProduct({ message: feature?.properties?.description, find: [`MAX TOPS /X 100 FEET/`], removal: [`%`, `<`, `:`] }) ?? null,
                    pds_watch: (getTextFromProduct({ message: feature?.properties?.description, find: [`PARTICULARLY DANGEROUS SITUATION`], removal: [`%`, `<`, `:`] }) === `YES`)
                },
                metadata: {
                    ms: performance.now() - tick,
                    source: `events.api`,
                    tracking: getEventTracking({ type: `API`, organization: { wmoidentifier: feature?.properties?.parameters?.WMOidentifier?.[0], featureId: feature?.id}, vtec: pVtec}),
                    header: `ZCZC-ATMOSX-${feature?.properties?.parameters?.WMOidentifier}`,
                    vtec: pVtec,
                    hvtec: null,
                    raw: feature?.properties?.description,
                    history: [
                        {
                            description: feature?.properties?.description,
                            issued: feature?.properties?.sent ? new Date(feature?.properties?.sent).toISOString() : null,
                            status: feature?.properties?.messageType ?? null,
                        }
                    ]
                }
            }
        })
    }
    validateEvents(processed)
}