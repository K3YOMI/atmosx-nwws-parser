/*
              _                             _               _     __   __
         /\  | |                           | |             (_)    \ \ / /
        /  \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ _  ___ \ V / 
       / /\ \| __| '_ ` _ \ / _ \/ __| '_ \| '_ \ / _ \ '__| |/ __| > <  
      / ____ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ |  | | (__ / . \ 
     /_/    \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  |_|\___/_/ \_\
                                     | |                            
                                     |_|                                                                                                                

    Created with ♥ by the AtmosphericX Team (KiyoWx, StarflightWx, Everwatch1, & CJ Ziegler)
    Discord: https://atmosphericx-discord.scriptkitty.cafe
    Ko-Fi: https://ko-fi.com/k3yomi
    Documentation: http://localhost/documentation | https://atmosphericx.scriptkitty.cafe/documentation

    Internal Package: @atmosx/event-product-parser

*/
import { union } from "polygon-clipping";
import { bootstrap } from "../../bootstrap";

interface CoordinatesOptions {
    zones: string[]
    isUnion: boolean
}

interface CoordinatesResponse { 
    type: `Polygon` | `MultiPolygon`
    coordinates: any[]
}

export const getZonePolygon = (options: CoordinatesOptions): CoordinatesResponse | null => {
    const list = [...new Set(options.zones.map(z => z.trim()))].filter(z => z === 'XX000' ? false : true);
    if (list.length === 0) return null;

    const placeholders = list.map(() => "?").join(",");
    const rows = bootstrap.database
        .prepare(`SELECT geometry FROM shapefiles WHERE id IN (${placeholders})`)
        .all(...list);
    const polygons: any[] = [];
    for (const row of rows) {
        if (!row?.geometry) continue;
        const geom = JSON.parse(row.geometry);
        if (geom?.type === "Polygon") {
            polygons.push(geom.coordinates);
        }
    }

    if (polygons.length === 0) return null;

    if (options.isUnion) {
        const unionFn = union as (...polys: any[]) => any;
        const mergedCoords = unionFn(...polygons);
        if (!mergedCoords || mergedCoords.length === 0) return null;
        let maxArea = -1;
        let bestPoly: any[] = [];
        for (const poly of mergedCoords) {
            const outerRing = poly[0];
            let area = 0;
            for (let i = 0; i < outerRing.length - 1; i++) {
                const [x1, y1] = outerRing[i];
                const [x2, y2] = outerRing[i + 1];
                area += x1 * y2 - x2 * y1;
            }
            area = Math.abs(area / 2);
            if (area > maxArea) {
                maxArea = area;
                bestPoly = poly;
            }
        }
        if (!bestPoly || bestPoly.length === 0) return null;
        const outerRing = bestPoly[0];
        const skip = Math.max(1, parseInt(String(bootstrap.settings.GlobalSettings.ShapefileSkipPoints), 10) || 1);
        let skipped = outerRing.filter((_: any, idx: number) => idx % skip === 0);
        if (skipped.length < 4) {
            skipped = outerRing.slice();
        }
        const first = skipped[0];
        const last = skipped[skipped.length - 1];
        if (!first || !last || first[0] !== last[0] || first[1] !== last[1]) {
            skipped.push([first[0], first[1]]);
        }
        return {type: "Polygon", coordinates: [skipped]};
    } else {
        const multi: any[] = [];
        for (const polyCoords of polygons) {
            if (Array.isArray(polyCoords) && Array.isArray(polyCoords[0])) {
                multi.push(polyCoords);
            }
        }
        if (multi.length === 0) return null;
        const skip = Math.max(1, parseInt(String(bootstrap.settings.GlobalSettings.ShapefileSkipPoints), 10) || 1);
        if (skip > 1) {
            for (let p = 0; p < multi.length; p++) {
                for (let r = 0; r < multi[p].length; r++) {
                    const ring = multi[p][r];
                    let reduced = ring.filter((_: any, i: number) => i % skip === 0);
                    if (reduced.length < 4) reduced = ring.slice();
                    const first = reduced[0];
                    const last = reduced[reduced.length - 1];
                    if ( first && last && (first[0] !== last[0] || first[1] !== last[1])) {
                        reduced.push([first[0], first[1]]);
                    }
                    multi[p][r] = reduced;
                }
            }
        }
        return {type: "MultiPolygon", coordinates: multi};
    }
}