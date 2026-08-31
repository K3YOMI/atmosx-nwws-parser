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

import { TypeSettings } from "Types/Settings"
import { TypeEvent } from "StaticTypes/Event"
import { Bootstrap } from "@Bootstrap"
import { GetZonePolygon } from "@ParsingUGC/GetZonePolygon"

interface GetEventGeometryOptions {
    Event: TypeEvent
    Union?: boolean
}

interface GetEventGeometryResponse { 
    type: `Polygon` | `MultiPolygon`
    coordinates: any[]
}

export const GetEventGeometry = ({ Event, Union }: GetEventGeometryOptions): GetEventGeometryResponse  => {
    const { properties } = Event;
    const settings = Bootstrap.Settings as TypeSettings
    const generated = properties?.geocode?.polygon ?? null;
    const ugc = properties?.geocode?.ugc ?? null;
    let geo: GetEventGeometryResponse = {
        type: `Polygon`,
        coordinates: generated != null ? JSON.parse(Buffer.from(generated, 'base64').toString('utf-8')) : null
    }
    console.log(generated)
    if (settings.GlobalSettings.UseShapefileCoordinates && generated == null && ugc != null) { 
        geo = GetZonePolygon({Zones: ugc, Union: Union ?? false});
        if (geo == null) {
            geo = {
                type: `Polygon`,
                coordinates: []
            }
        }
    }
    return geo;
}