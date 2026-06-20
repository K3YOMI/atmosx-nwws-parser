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

import { getSettings } from "../@modules/@utilities/utilities.getSettings";
import { TypeSettings } from "../@types/type.settings"
import { TypeEvent } from "../@types/type.event"
import { getZonePolygon } from "../@parsers/@ugc/ugc.coordinates";

interface GetGeometryResponse { 
    type: `Polygon` | `MultiPolygon`
    coordinates: any[]
}

export const getEventGeometry = async (event: TypeEvent): Promise<GetGeometryResponse> => {
    const settings = getSettings() as TypeSettings
    const generated = event?.properties?.geocode?.polygon ?? null;
    const ugc = event?.properties?.geocode?.ugc ?? null;
    let geo: GetGeometryResponse = {
        type: `Polygon`,
        coordinates: generated != null ? JSON.parse(Buffer.from(generated, 'base64').toString('utf-8')) : null
    }
    if (settings.GlobalSettings.UseShapefileCoordinates && generated == null && ugc != null) { 
        geo = await getZonePolygon({zones: ugc, isUnion: false})
        if (geo == null) {
            geo = {
                type: `Polygon`,
                coordinates: []
            }
        }
    }
    return geo;
}