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

import { NormalizePolygon } from "@Image/modules/NormalizePolygon"

interface GenerateEventPolygonsOptions {
    Polygons: GeoJSON.Polygon | GeoJSON.MultiPolygon | null
    IPath: (feature: GeoJSON.Feature) => string | null
    Map: boolean
    Settings: {
        BorderColor: string
        BorderWidth: number
        FillColor: string
        FillOpacity: number
    }
}

export const GetSVGPath = ({ Polygons, IPath, Settings, Map }: GenerateEventPolygonsOptions): string => {
    if (!Polygons) return
    const feature: GeoJSON.Feature = {
        type: `Feature`,
        properties: {},
        geometry: !Map ? NormalizePolygon(Polygons) : Polygons,
    };
    const d = IPath(feature);
    if (!d) return ``;
    return `<path
        d="${d}"
        fill="${Settings.FillColor}"
        fill-opacity="${Settings.FillOpacity}"
        fill-rule="evenodd"
        stroke="${Settings.BorderColor}"
        stroke-width="${Settings.BorderWidth}"
        stroke-linejoin="round"
        stroke-linecap="round"
    />`;
};
