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

interface GetGeometryBoundsOptions {
    Geometry: GeoJSON.Geometry
    Padding: number
}

interface GeometryBounds {
    Bounds: {
        minLon: number
        minLat: number
        maxLon: number
        maxLat: number
    }
    Search: {
        minLon: number
        minLat: number
        maxLon: number
        maxLat: number
    }
}

export const GetGeometryBounds = ({ Geometry, Padding }: GetGeometryBoundsOptions): GeometryBounds => {
    let minLon = Infinity;
    let minLat = Infinity;
    let maxLon = -Infinity;
    let maxLat = -Infinity;
    const ProcessCoordinate = (coordinate: GeoJSON.Position): void => {
        const [lon, lat] = coordinate;
        if (!Number.isFinite(lon) || !Number.isFinite(lat)) {
            return;
        }
        minLon = Math.min(minLon, lon);
        minLat = Math.min(minLat, lat);
        maxLon = Math.max(maxLon, lon);
        maxLat = Math.max(maxLat, lat);
    };
    const ProcessRing = (ring: GeoJSON.Position[]): void => {
        for (const coordinate of ring) {
            ProcessCoordinate(coordinate);
        }
    };
    if (Geometry.type === `Polygon`) {
        for (const ring of Geometry.coordinates) {
            ProcessRing(ring);
        }
    } else if (Geometry.type === `MultiPolygon`) {
        for (const polygon of Geometry.coordinates) {
            for (const ring of polygon) {
                ProcessRing(ring);
            }
        }
    }
    const centerLat = (minLat + maxLat) / 2;
    const latPadding = Padding / 69;
    const lonPadding = Padding / (69 * Math.cos(centerLat * Math.PI / 180));
    const searchMinLon = minLon - lonPadding;
    const searchMaxLon = maxLon + lonPadding;
    const searchMinLat = minLat - latPadding;
    const searchMaxLat = maxLat + latPadding;
    return { 
        Search: { minLon: searchMinLon, minLat: searchMinLat, maxLon: searchMaxLon, maxLat: searchMaxLat },
        Bounds: { minLon, minLat, maxLon, maxLat } 
    };
};