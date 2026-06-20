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

import { TypeEventProperties } from "../@types/type.properties";
import { TypeAttributes } from "../@types/types.attributes";
import { TypeUGC } from "../@types/types.ugc";
import { TypePVTEC } from "../@types/types.pvtec";
import { TypeHVTEC } from "../@types/types.hvtec";
import { regExp } from "../@dictionaries/dictionaries.regExp";
import { getDescriptionFromProduct } from "../@parsers/@text/text.getDescriptionFromProduct";
import { getPolygonFromProduct } from "../@parsers/@text/text.getPolygonFromProduct";
import { getTextFromProduct } from "../@parsers/@text/text.getTextFromProduct";
import { getEventOffice } from "./building.office";
import { getEventTags } from "./building.tags";

interface GetPropertiesOptions { 
    message: string
    attributes: TypeAttributes
    ugc?: TypeUGC
    pVtec?: TypePVTEC
    hVtec?: TypeHVTEC
}

export const properties = (options: GetPropertiesOptions): TypeEventProperties => {
    const organization = options.message.match(regExp.wmo)?.[0] ?? null
    const polygons = getPolygonFromProduct(options.message)
    const properties = {
        locations: options?.ugc?.locations?.join(`; `) ?? null,
        description: getDescriptionFromProduct({ message: options.message, handle: options?.pVtec?.vtec ?? null }),
        attributes: options.attributes,
        geocode: {
            office: getEventOffice({ attributes: options.attributes, organization: organization, pVtec: options.pVtec }),
            organization: organization,
            ugc: options?.ugc?.zones ?? [],
            polygon: polygons.length > 0 ? Buffer.from(JSON.stringify([polygons])).toString('base64') : null,
            polygon_generated: polygons.length > 0 ? true : false
        },
        parameters: {
            tags: getEventTags(options.message),
            instructions: getTextFromProduct({ message: options.message, find: [`For your protection`, `do not`, `use extreme caution`], append: `...`, removal: [`.`]})  ?? null,
            source: getTextFromProduct({ message: options.message, find: [`SOURCE...`], removal: [`.`]}) ?? null,
            hazards: getTextFromProduct({ message: options.message, find: [`HAZARD...`], removal: [`.`]}) ?? null,
            impacts: getTextFromProduct({ message: options.message, find: [`IMPACT...`], removal: [`.`]}) ?? null,
            estimated_hail_size: getTextFromProduct({ message: options.message, find: [`MAX HAIL SIZE...`, `HAIL...`], removal: ['in']}) ?? null,
            estimated_wind_gusts: getTextFromProduct({ message: options.message, find: [`MAX WIND GUST...`, `WIND...`]}) ?? null,
            damage_threat: getTextFromProduct({ message: options.message, find: [`DAMAGE THREAT...`], removal: []}) ?? null,
            tornado_threat: getTextFromProduct({ message: options.message, find: [`TORNADO...`, `WATERSPOUT...`] }) ?? null,
            flood_threat: getTextFromProduct({ message: options.message, find: [`FLASH FLOOD...`]}) ?? null,
            wind_threat: getTextFromProduct({ message: options.message, find: [`WIND THREAT...`]}) ?? null,
            hail_threat: getTextFromProduct({ message: options.message, find: [`HAIL THREAT...`], removal: []}) ?? null,
        },
        spc_parameters: {
            spc_number: getTextFromProduct({ message: options.message, find: [`Mesoscale Discussion `], removal: [`Mesoscale Discussion`, `Number`, `...`] }) ?? null,
            spc_concerning: getTextFromProduct({ message: options.message, find: [`Concerning...`] }) ?? null,
            spc_max_tornado: getTextFromProduct({ message: options.message, find: [`MOST PROBABLE PEAK TORNADO INTENSITY...`] }) ?? null,
            spc_max_hail: getTextFromProduct({ message: options.message, find: [`MOST PROBABLE PEAK HAIL SIZE...`] }) ?? null,
            spc_max_wind: getTextFromProduct({ message: options.message, find: [`MOST PROBABLE PEAK WIND GUST...`] }) ?? null,
            spc_watch_issuance: getTextFromProduct({ message: options.message, find: [`Probability of Watch Issuance...`], removal: [`percent`]}) ?? null,
        },
        watch_parameters: {
            watch_number: getTextFromProduct({ message: options.message, find: [`ITIES FOR`, `UPDATE FOR`, `Watch Number `], removal: [`%`, `<`, `:`] })?.replace(/(WT|WS|)/g, '')?.trim() ?? null,
            watch_type: options.message.includes(`TORNADO WATCH`) ? `Tornado` : options?.message.includes(`SEVERE`) ? `Severe` : null,
            additional_tornadoes_probability: getTextFromProduct({ message: options.message, find: [`PROB OF 2 OR MORE TORNADOES`], removal: [`%`, `<`, `:`] }) ?? null,
            strong_tornadoes_probability: getTextFromProduct({ message: options.message, find: [`PROB OF 1 OR MORE STRONG /EF2-EF5/ TORNADOES`], removal: [`%`, `<`, `:`] }) ?? null,
            severe_wind_probability: getTextFromProduct({ message: options.message, find: [`PROB OF 10 OR MORE SEVERE WIND EVENTS`], removal: [`%`, `<`, `:`] }) ?? null,
            severe_hail_probability: getTextFromProduct({ message: options.message, find: [`PROB OF 10 OR MORE SEVERE HAIL EVENTS`], removal: [`%`, `<`, `:`] }) ?? null,
            hail_2in_probability: getTextFromProduct({ message: options.message, find: [`PROB OF 1 OR MORE HAIL EVENTS >= 2 INCHES`], removal: [`%`, `<`, `:`] }) ?? null,
            combined_hail_wind_probability: getTextFromProduct({ message: options.message, find: [`PROB OF 6 OR MORE COMBINED SEVERE HAIL/WIND EVENTS`], removal: [`%`, `<`, `:`] }) ?? null,
            max_hail_in: getTextFromProduct({ message: options.message, find: [`MAX HAIL /INCHES/`], removal: [`%`, `<`, `:`] }) ?? null,
            max_wind_surface:  getTextFromProduct({ message: options.message, find: [`MAX WIND GUSTS SURFACE /KNOTS/`], removal: [`%`, `<`, `:`] }) ?? null,
            max_tops_x100feet:  getTextFromProduct({ message: options.message, find: [`MAX TOPS /X 100 FEET/`], removal: [`%`, `<`, `:`] }) ?? null,
            pds_watch: (getTextFromProduct({ message: options.message, find: [`PARTICULARLY DANGEROUS SITUATION`], removal: [`%`, `<`, `:`] }) === `YES`)
        }
    }
    if (isNaN(Number(properties.watch_parameters.watch_number))) {
        properties.watch_parameters.watch_number = null
    }
    return properties;
}