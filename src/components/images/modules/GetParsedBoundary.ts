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

interface BoundaryRow {
    id: string
    type: `state` | `county`
    state: string
    name: string
    geometry: string
}

type BoundaryProperties = {
    state: string
    name: string
    id?: string
}

type BoundaryFeature = GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon, BoundaryProperties>

export const GetParsedBoundary = (rows: BoundaryRow[]): BoundaryFeature[] => {
    const features: BoundaryFeature[] = []
    for (const row of rows) {
        try {
            const geometry = JSON.parse(row.geometry) as GeoJSON.Geometry
            if ( !geometry || typeof geometry !== `object` || (geometry.type !== `Polygon` &&  geometry.type !== `MultiPolygon`) ) {
                continue
            }
            features.push({
                type: `Feature`,
                properties: {
                    state: row.state,
                    name: row.name,
                    ...(row.type === `county` ? { id: row.id } : {})
                },
                geometry
            })
        } catch {
            continue
        }
    }
    return features
}