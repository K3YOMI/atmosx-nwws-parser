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

import { EnumImageBlacklist } from "@Enums/ImageBlacklist"
import { TypeEvent } from "StaticTypes/Event"
import { Bootstrap } from "@Bootstrap"
import { GetEventGeometry } from "@Building/GetEventGeometry"
import { GetGeographicalEvents } from "@Image/GetGeographicalEvents"
import { GetUnionPolygon } from "@Utilities/GetUnionPolygon"
import { NormalizeD3Polygon } from "@Image/NormalizePolygon"
import { GetGeographicalBoundaries } from "@Image/GetGeographicalBoundaries"
import { GetParsedBoundary } from "@Image/GetParsedBoundary"
import { GenerateEventPolygons } from "@Image/GenerateEventPolygons"
import { GetGeometryBounds } from "@Image/GetGeometryBounds"
import { geoCentroid, geoMercator, geoPath } from "d3-geo"
import { mkdir} from "fs/promises"
import { join } from "path";
import sharp from "sharp"

interface GenerateGraphicOptions { 
    Regions?: string[]
    IgnoredRegions?: string[]
    Event?: TypeEvent
    File?: { 
        Directory?: string
        Name?: string
    }
    MinZoom?: number
    MaxMiles?: number
    Width?: number
    Height?: number
}

export const GenerateGraphic = async ({ File, Regions, Event, MaxMiles = 150, MinZoom = 1.6, Width = 1920, Height = 1080 }: GenerateGraphicOptions): Promise<string> => {
    let polygons: GeoJSON.Polygon | GeoJSON.MultiPolygon | null
  
    const { Directory, Name } = File ?? {};
    const states = Event?.properties?.geocode?.ugc?.[0]?.match(/^([A-Z]{2})[CZ](\d{3})$/)[1]?.toUpperCase();

    if (Event && !states) { return; } // If Event and not States, return as there are no ways to generate a graphic for this event
    
    if (EnumImageBlacklist.includes(states ?? ``)) { return; } // If Event and States is in the ignored regions, return as there are bugs with those shapefiles.
    
    let gBoundaries = GetGeographicalBoundaries({ Regions: Regions ? Regions : null });
    let gEvents = GetGeographicalEvents({ Regions: Regions ? Regions : null, Event: Event });
    let gStatesLines = GetParsedBoundary(gBoundaries.states);
    let gCountyLines = GetParsedBoundary(gBoundaries.counties);

    if (gStatesLines.length === 0 && gCountyLines.length === 0) { return null; }

    if (Event) {
        polygons = await GetEventGeometry({ Event });
        if (polygons) {
            const eBounds = GetGeometryBounds({ Geometry: polygons, Padding: MaxMiles });
            gCountyLines = gCountyLines.filter(county => {
                const cBounds = GetGeometryBounds({ Geometry: county.geometry, Padding: MaxMiles });
                return ( cBounds.Bounds.minLon <= eBounds.Search.maxLon && cBounds.Bounds.maxLon >= eBounds.Search.minLon && cBounds.Bounds.minLat <= eBounds.Search.maxLat && cBounds.Bounds.maxLat >= eBounds.Search.minLat );
            });
            gStatesLines = gStatesLines.filter(state => {
                const sBounds = GetGeometryBounds({ Geometry: state.geometry, Padding: MaxMiles });
                return ( sBounds.Bounds.minLon <= eBounds.Search.maxLon && sBounds.Bounds.maxLon >= eBounds.Search.minLon && sBounds.Bounds.minLat <= eBounds.Search.maxLat && sBounds.Bounds.maxLat >= eBounds.Search.minLat );
            });
        }
    }

    const iMode = geoMercator();
    const iPath = geoPath().projection(iMode);
    const jFeatures: GeoJSON.Feature[] = [...gStatesLines, ...gCountyLines];
    const jCollection: GeoJSON.FeatureCollection = { type: `FeatureCollection`, features: jFeatures };

    const gPolygons = await Promise.all(
        gEvents.map(async (event: TypeEvent) => {
            const zones = event.properties?.geocode?.ugc ?? [];
            if (zones.length === 0) return null;
            return {event, polygon: await GetUnionPolygon({ 
                Polygons: polygons ? [polygons.coordinates] : [await GetEventGeometry({ Event: event }).coordinates],
            })};
        })
    );

    if (polygons) {
        const [centerLon, centerLat] = geoCentroid(NormalizeD3Polygon(polygons));
        iMode.center([centerLon, centerLat]).translate([Width / 2, Height / 2]).scale(MinZoom);
        const [[x1, y1], [x2, y2]] = geoPath().projection(iMode).bounds(jCollection);
        const scaleX = Width / (x2 - x1);
        const scaleY = Height / (y2 - y1);
        const scale = 3.5;
        iMode.scale(Math.min(scaleX, scaleY) * scale);
    } else { 
        iMode.fitExtent([[50, 50], [Width - 50, Height - 50]], jCollection);
    }

    const ePathing = gPolygons.map(({ event, polygon: polys }, index) => {
        // based on the event name length, give it a custom hex color for the fill, and a custom hex color for the border
        const thex = event?.properties?.event ? `#${event.properties.event.split(``).reduce((hash, char) => {
            return ((hash << 5) - hash + char.charCodeAt(0)) | 0 }, 0).toString(16).slice(-6).padStart(6, `0`)}` : `#ff0000`;
        return GenerateEventPolygons({ 
            Polygons: polys, 
            IPath: iPath, 
            Map: false,
            Settings: { BorderColor: `${thex}`, BorderWidth: 2, FillColor: `${thex}`, FillOpacity: 0.3 } 
        });
    }).filter(Boolean).join(``);

    const cPathing = gCountyLines.map(polygon => GenerateEventPolygons({ 
        Polygons: polygon.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon, 
        IPath: iPath,
        Map: true,
        Settings: { BorderColor: `darkgray`, BorderWidth: 0.5, FillColor: `black`, FillOpacity: 1 } 
    })).filter(Boolean).join(``);

    const sPathing = gStatesLines.map(polygon => GenerateEventPolygons({ 
        Polygons: polygon.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon,
        IPath: iPath, 
        Map: false,
        Settings: { BorderColor: `white`, BorderWidth: 1, FillColor: `#ffffff`, FillOpacity: 0 } 
    })).filter(Boolean).join(``);

    const SVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${Width}" height="${Height}" viewBox="0 0 ${Width} ${Height}">
            <rect width="${Width}" height="${Height}" fill="black"/> 
            <g fill-rule="evenodd" clip-rule="evenodd"> 
            ${cPathing}
            ${sPathing}
            ${ePathing}  
            </g>
        </svg>
    `;

 

    const dir = Directory ?? Bootstrap.Settings?.GlobalSettings?.ArchiveSettings?.ImageDirectory;
    const name = Name ?? Event?.properties?.event ?? `img`;
    const dist = states ? join(dir, states) : dir;
    await mkdir(dist, { recursive: true });
    await sharp(Buffer.from(SVG))
        .png()
        .toFile(join(dist, `${name}${name.includes(`.png`) ? `` : `.png`}`));
    return dist + `/${name}${name.includes(`.png`) ? `` : `.png`}`;
}