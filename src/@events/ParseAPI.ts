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

import { TypeStanzaCompiled } from "types/StanzaCompiled"
import { TypePVTEC } from "types/VTEC"
import { EnumICAO } from "@enums/ICAO"
import { bootstrap } from "@bootstrap"
import { GetEventTracking } from "@building/GetEventTracking"
import { VTECExtract } from "@parsers/pvtec/VTECExtract"
import { GetEventTags } from "@building/GetEventTags"
import { GetTextFromProduct } from "@parsers/text/GetTextFromProduct"
import { SetDebug } from "@utilities/SetDebug"

export const ParseAPI = async (stanza: TypeStanzaCompiled): Promise<void> => {
    const messages = Object.values(JSON.parse(stanza.message).features) as any;
    for (const feature of messages) {
        const tick = performance.now();
        const pVtec = VTECExtract(feature?.properties?.parameters?.VTEC?.[0]) ?? null as TypePVTEC[]
        bootstrap.cache.processed.push({
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
                locations_array: feature?.properties?.areaDesc ? feature?.properties?.areaDesc.split(';') : [],
                description: feature?.properties?.description ?? null,
                attributes: feature?.properties?.attributes ?? {},
                geocode: {
                    office: {
                        office: pVtec ? pVtec?.[0]?.tracking.split(`.`)[0] : null,
                        name: EnumICAO[pVtec ? pVtec?.[0]?.tracking.split(`.`)[0] : null] ?? null,
                    },
                    organization:  feature?.properties?.parameters?.WMOidentifier?.[0],
                    ugc: feature?.properties?.geocode?.UGC ?? [], 
                    polygon: feature?.geometry?.coordinates.length > 0 ? Buffer.from(JSON.stringify([feature?.geometry?.coordinates[0]])).toString('base64') : null,
                    polygon_generated: feature?.geometry?.coordinates.length > 0 ? true : false,
                },
                parameters: {
                    tags: GetEventTags(feature?.properties?.description),
                    instructions: feature?.properties?.instruction ?? null,
                    source: GetTextFromProduct({ message: feature?.properties?.description, find: [`SOURCE...`], removal: [`.`]}) ?? null,
                    hazards: GetTextFromProduct({ message: feature?.properties?.description, find: [`HAZARD...`], removal: [`.`]}) ?? null,
                    impacts: GetTextFromProduct({ message: feature?.properties?.description, find: [`IMPACT...`], removal: [`.`]}) ?? null,
                    estimated_hail_size: feature?.properties?.parameters?.maxHailSize?.[0] ?? null,
                    estimated_wind_gusts: feature?.properties?.parameters?.maxWindGust?.[0] ?? null,
                    damage_threat: feature?.properties?.parameters?.thunderstormDamageThreat?.[0] ?? null,
                    tornado_threat: feature?.properties?.parameters?.tornadoDetection?.[0] ?? null,
                    flood_threat: feature?.properties?.parameters?.floodDetection?.[0] ?? null,
                    wind_threat: feature?.properties?.parameters?.windThreat?.[0] ?? null,
                    hail_threat: feature?.properties?.parameters?.hailThreat?.[0] ?? null,
                },
                discussion_parameters: {
                    discussion_number: GetTextFromProduct({ message: feature?.properties?.description, find: [`Mesoscale Discussion `], removal: [`Mesoscale Discussion`, `Number`, `...`] })?.toString()?.padStart(4, "0") ?? null,
                    discussion_concerning: GetTextFromProduct({ message: feature?.properties?.description, find: [`Concerning...`] }) ?? null,
                    discussion_max_tornado: GetTextFromProduct({ message: feature?.properties?.description, find: [`MOST PROBABLE PEAK TORNADO INTENSITY...`] }) ?? null,
                    discussion_max_hail: GetTextFromProduct({ message: feature?.properties?.description, find: [`MOST PROBABLE PEAK HAIL SIZE...`] }) ?? null,
                    discussion_max_wind: GetTextFromProduct({ message: feature?.properties?.description, find: [`MOST PROBABLE PEAK WIND GUST...`] }) ?? null,
                    discussion_watch_issuance: GetTextFromProduct({ message: feature?.properties?.description, find: [`Probability of Watch Issuance...`], removal: [`percent`]}) ?? null,
                },
                watch_parameters: {
                    watch_number: (pVtec?.[0]?.is_watch) && (GetTextFromProduct({ message: feature?.properties?.description, find: [`ITIES FOR`, `UPDATE FOR`, `Watch Number `], removal: [`%`, `<`, `:`] })?.replace(/(WT|WS|)/g, '')?.trim()?.toString()?.padStart(4, "0") ?? pVtec?.[0]?.tracking?.slice(-4)?.toString()?.padStart(4, "0") ?? null),
                    watch_type: feature?.properties?.description.includes(`TORNADO WATCH`) ? `Tornado` : feature?.properties?.description.includes(`SEVERE`) ? `Severe` : null,
                    additional_tornadoes_probability: GetTextFromProduct({ message: feature?.properties?.description, find: [`PROB OF 2 OR MORE TORNADOES`], removal: [`%`, `<`, `:`] }) ?? null,
                    strong_tornadoes_probability: GetTextFromProduct({ message: feature?.properties?.description, find: [`PROB OF 1 OR MORE STRONG /EF2-EF5/ TORNADOES`], removal: [`%`, `<`, `:`] }) ?? null,
                    severe_wind_probability: GetTextFromProduct({ message: feature?.properties?.description, find: [`PROB OF 10 OR MORE SEVERE WIND EVENTS`], removal: [`%`, `<`, `:`] }) ?? null,
                    severe_hail_probability: GetTextFromProduct({ message: feature?.properties?.description, find: [`PROB OF 10 OR MORE SEVERE HAIL EVENTS`], removal: [`%`, `<`, `:`] }) ?? null,
                    hail_2in_probability: GetTextFromProduct({ message: feature?.properties?.description, find: [`PROB OF 1 OR MORE HAIL EVENTS >= 2 INCHES`], removal: [`%`, `<`, `:`] }) ?? null,
                    combined_hail_wind_probability: GetTextFromProduct({ message: feature?.properties?.description, find: [`PROB OF 6 OR MORE COMBINED SEVERE HAIL/WIND EVENTS`], removal: [`%`, `<`, `:`] }) ?? null,
                    max_hail_in: GetTextFromProduct({ message: feature?.properties?.description, find: [`MAX HAIL /INCHES/`], removal: [`%`, `<`, `:`] }) ?? null,
                    max_wind_surface:  GetTextFromProduct({ message: feature?.properties?.description, find: [`MAX WIND GUSTS SURFACE /KNOTS/`], removal: [`%`, `<`, `:`] }) ?? null,
                    max_tops_x100feet:  GetTextFromProduct({ message: feature?.properties?.description, find: [`MAX TOPS /X 100 FEET/`], removal: [`%`, `<`, `:`] }) ?? null,
                    pds_watch: (GetTextFromProduct({ message: feature?.properties?.description, find: [`PARTICULARLY DANGEROUS SITUATION`], removal: [`%`, `<`, `:`] }) === `YES`)
                },
                metadata: {
                    ms: performance.now() - tick,
                    source: `events.api`,
                    tracking: GetEventTracking({ type: `API`, organization: { wmoidentifier: feature?.properties?.parameters?.WMOidentifier?.[0], featureId: feature?.id}, vtec: pVtec?.[0]}),
                    header: `ZCZC-ATMOSX-${feature?.properties?.parameters?.WMOidentifier}`,
                    vtec: pVtec?.[0],
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
        SetDebug({ title: `ParseAPI`, message: `${Math.round(performance.now() - tick)}ms` })
    }
}