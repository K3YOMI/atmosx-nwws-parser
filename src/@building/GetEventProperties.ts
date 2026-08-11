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

import { TypeEventProperties } from "types/Properties"
import { TypeAttributes } from "types/Attributes"
import { TypeUGC } from "types/UGC"
import { TypePVTEC } from "types/VTEC"
import { TypeHVTEC } from "types/HVTEC"
import { EnumExpressions } from "@enums/Expressions"
import { GetDescriptionFromProduct } from "@parsers/text/GetDescriptionFromProduct"
import { getPolygonFromProduct } from "@parsers/text/GetPolygonFromProduct"
import { GetTextFromProduct } from "@parsers/text/GetTextFromProduct"
import { GetEventOffice } from "@building/GetEventOffice"
import { GetEventTags } from "@building/GetEventTags"

interface GetEventPropertiesOptions { 
    message: string
    attributes: TypeAttributes
    ugc?: TypeUGC
    pVtec?: TypePVTEC
    hVtec?: TypeHVTEC
}

export const GetEventProperties = (options: GetEventPropertiesOptions): TypeEventProperties => {
    const organization = options.message.match(EnumExpressions.wmo)?.[0] ?? null
    const polygons = getPolygonFromProduct(options.message)
    const properties = {
        locations: options?.ugc?.locations?.join(`; `) ?? null,
        locations_array: options?.ugc?.locations ?? [],
        location_states: [...new Set(
            options?.ugc?.locations
            ?.map((location: string) => location.match(/,\s*([A-Z]{2})\b/)?.[1])
            .filter(Boolean) ?? []
        )],
        description: GetDescriptionFromProduct({ message: options.message, handle: options?.pVtec?.vtec ?? null }),
        attributes: options.attributes,
        geocode: {
            office: GetEventOffice({ attributes: options.attributes, organization: organization, pVtec: options.pVtec }),
            organization: organization,
            ugc: options?.ugc?.zones ?? [],
            polygon: polygons.length > 0 ? Buffer.from(JSON.stringify([polygons])).toString('base64') : null,
            polygon_generated: polygons.length > 0 ? true : false
        },
        parameters: {
            tags: GetEventTags(options.message),
            instructions: GetTextFromProduct({ message: options.message, find: [`For your protection`, `do not`, `use extreme caution`], append: `...`, removal: [`.`]})  ?? null,
            source: GetTextFromProduct({ message: options.message, find: [`SOURCE...`], removal: [`.`]}) ?? null,
            hazards: GetTextFromProduct({ message: options.message, find: [`HAZARD...`], removal: [`.`]}) ?? null,
            impacts: GetTextFromProduct({ message: options.message, find: [`IMPACT...`], removal: [`.`]}) ?? null,
            estimated_hail_size: GetTextFromProduct({ message: options.message, find: [`MAX HAIL SIZE...`, `HAIL...`], removal: ['in']}) ?? null,
            estimated_wind_gusts: GetTextFromProduct({ message: options.message, find: [`MAX WIND GUST...`, `WIND...`]}) ?? null,
            damage_threat: GetTextFromProduct({ message: options.message, find: [`DAMAGE THREAT...`], removal: []}) ?? null,
            tornado_threat: GetTextFromProduct({ message: options.message, find: [`TORNADO...`, `WATERSPOUT...`] }) ?? null,
            flood_threat: GetTextFromProduct({ message: options.message, find: [`FLASH FLOOD...`]}) ?? null,
            wind_threat: GetTextFromProduct({ message: options.message, find: [`WIND THREAT...`]}) ?? null,
            hail_threat: GetTextFromProduct({ message: options.message, find: [`HAIL THREAT...`], removal: []}) ?? null,
        },
        discussion_parameters: {
            discussion_number: GetTextFromProduct({ message: options.message, find: [`Mesoscale Discussion `], removal: [`Mesoscale Discussion`, `Number`, `...`] })?.toString()?.padStart(4, "0") ?? null,
            discussion_concerning: GetTextFromProduct({ message: options.message, find: [`Concerning...`] }) ?? null,
            discussion_max_tornado: GetTextFromProduct({ message: options.message, find: [`MOST PROBABLE PEAK TORNADO INTENSITY...`] }) ?? null,
            discussion_max_hail: GetTextFromProduct({ message: options.message, find: [`MOST PROBABLE PEAK HAIL SIZE...`] }) ?? null,
            discussion_max_wind: GetTextFromProduct({ message: options.message, find: [`MOST PROBABLE PEAK WIND GUST...`] }) ?? null,
            discussion_watch_issuance: GetTextFromProduct({ message: options.message, find: [`Probability of Watch Issuance...`], removal: [`percent`]}) ?? null,
        },
        watch_parameters: {
            watch_number: options?.pVtec?.is_watch ? ( GetTextFromProduct({ message: options.message, find: [`ITIES FOR`, `UPDATE FOR`, `Watch Number `], removal: [`%`, `<`, `:`] })?.replace(/(WT|WS|)/g, '')?.trim()?.toString()?.padStart(4, "0") ?? options?.pVtec?.tracking?.slice(-4)?.toString()?.padStart(4, "0") ?? null) : null,
            watch_type: options.message.includes(`TORNADO WATCH`) ? `Tornado` : options?.message.includes(`SEVERE`) ? `Severe` : null,
            additional_tornadoes_probability: GetTextFromProduct({ message: options.message, find: [`PROB OF 2 OR MORE TORNADOES`], removal: [`%`, `<`, `:`] }) ?? null,
            strong_tornadoes_probability: GetTextFromProduct({ message: options.message, find: [`PROB OF 1 OR MORE STRONG /EF2-EF5/ TORNADOES`], removal: [`%`, `<`, `:`] }) ?? null,
            severe_wind_probability: GetTextFromProduct({ message: options.message, find: [`PROB OF 10 OR MORE SEVERE WIND EVENTS`], removal: [`%`, `<`, `:`] }) ?? null,
            severe_hail_probability: GetTextFromProduct({ message: options.message, find: [`PROB OF 10 OR MORE SEVERE HAIL EVENTS`], removal: [`%`, `<`, `:`] }) ?? null,
            hail_2in_probability: GetTextFromProduct({ message: options.message, find: [`PROB OF 1 OR MORE HAIL EVENTS >= 2 INCHES`], removal: [`%`, `<`, `:`] }) ?? null,
            combined_hail_wind_probability: GetTextFromProduct({ message: options.message, find: [`PROB OF 6 OR MORE COMBINED SEVERE HAIL/WIND EVENTS`], removal: [`%`, `<`, `:`] }) ?? null,
            max_hail_in: GetTextFromProduct({ message: options.message, find: [`MAX HAIL /INCHES/`], removal: [`%`, `<`, `:`] }) ?? null,
            max_wind_surface:  GetTextFromProduct({ message: options.message, find: [`MAX WIND GUSTS SURFACE /KNOTS/`], removal: [`%`, `<`, `:`] }) ?? null,
            max_tops_x100feet:  GetTextFromProduct({ message: options.message, find: [`MAX TOPS /X 100 FEET/`], removal: [`%`, `<`, `:`] }) ?? null,
            pds_watch: (GetTextFromProduct({ message: options.message, find: [`PARTICULARLY DANGEROUS SITUATION`], removal: [`%`, `<`, `:`] }) === `YES` ? true : null)
        }
    }
    if (isNaN(Number(properties.watch_parameters.watch_number))) {
        properties.watch_parameters.watch_number = null
    }
    return properties;
}