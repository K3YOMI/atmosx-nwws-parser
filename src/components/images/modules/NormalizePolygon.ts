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

import { geoArea } from "d3-geo";

export const NormalizeD3Polygon = (geometry: GeoJSON.Polygon | GeoJSON.MultiPolygon): GeoJSON.Polygon | GeoJSON.MultiPolygon => {
    const area = geoArea(geometry);
    if (area > 2 * Math.PI) {
        if (geometry.type === `Polygon`) {
            return {
                type: `Polygon`,
                coordinates: geometry.coordinates.map(ring => ring.slice().reverse())
            };
        }
        return {
            type: `MultiPolygon`,
            coordinates: geometry.coordinates.map(polygon => polygon.map(ring => ring.slice().reverse()))
        };
    }
    return geometry;
};

export const NormalizePolygon = (geometry: GeoJSON.Geometry): GeoJSON.Geometry => {
    if (geometry.type !== `Polygon` && geometry.type !== `MultiPolygon`) {
        return geometry;
    }
    const reverseRing = (ring: number[][]) => {
        const reversed = ring.slice().reverse();
        return reversed;
    };
    if (geometry.type === `Polygon`) {
        return {
            type: `Polygon`,
            coordinates: geometry.coordinates.map((ring, index) => index === 0 ? reverseRing(ring) : ring.slice().reverse())
        };
    }
    return {
        type: `MultiPolygon`,
        coordinates: geometry.coordinates.map(polygon => polygon.map((ring, index) => index === 0 ? reverseRing(ring) : ring.slice().reverse()))
    };
}