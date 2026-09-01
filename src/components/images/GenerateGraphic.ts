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

import { EnumStates } from "@Enums/States"
import { TypeEvent } from "StaticTypes/Event"
import { Bootstrap } from "@Bootstrap"
import { GetEventGeometry } from "@Building/GetEventGeometry"
import { GetGeographicalEvents } from "@ImageModules/GetGeographicalEvents"
import { GetUnionPolygon } from "@Utilities/GetUnionPolygon"
import { NormalizeD3Polygon } from "@ImageModules/NormalizePolygon"
import { GetGeographicalBoundaries } from "@ImageModules/GetGeographicalBoundaries"
import { GetParsedBoundary } from "@ImageModules/GetParsedBoundary"
import { GetSVGPath } from "@ImageModules/GetSVGPath"
import { CreateSVG } from "@ImageModules/CreateSVG"
import { GetGeometryBounds } from "@ImageModules/GetGeometryBounds"
import { geoCentroid, geoMercator, geoPath } from "d3-geo"
import { mkdir } from "fs/promises"
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

export const GenerateGraphic = async ({ File, Regions, Event, MaxMiles = 350, MinZoom = 0.8, Width = 700, Height = 500 }: GenerateGraphicOptions): Promise<string> => {
    let polygons: GeoJSON.Polygon | GeoJSON.MultiPolygon | null

    const ignored = [`HI`, `AK`];
    const { Directory, Name } = File ?? {};
    const S = Event?.properties?.geocode?.ugc?.map(ugc => ugc.match(/^([A-Z]{2})[CZ](\d{3})$/)?.[1]).filter(Boolean) ?? null;

    if (Event && !S) { return null; }
    if (S?.every(state => !EnumStates[state] || ignored.includes(state))) { return null; }


    const R = (Regions ?? S)?.length
        ? [...new Set(Regions ?? S)]
        : null;

    let gEvents = GetGeographicalEvents({ Regions: R, Event: Event });
    let { gStatesLines, gCountyLines } = (() => {
        const gBoundaries = GetGeographicalBoundaries({ Regions: R });
        return {
            gStatesLines: GetParsedBoundary(gBoundaries.states),
            gCountyLines: GetParsedBoundary(gBoundaries.counties),
        };
    })();

    if (gStatesLines.length === 0 && gCountyLines.length === 0) { return null; }

    if (Event) {
        const isConfigured = Bootstrap.Settings.GlobalSettings.DisableGeometryParsing;
        polygons = isConfigured ? await GetEventGeometry({ Event }) : Event.geometry;
        if (polygons.coordinates.length == 0) { return null; }
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
    const gPolygons = (await Promise.all(
        gEvents.map(async (event: TypeEvent) => {
            const zones = event.properties?.geocode?.ugc ?? [];
            const S1 = event?.properties?.geocode?.ugc?.map(ugc => ugc.match(/^([A-Z]{2})[CZ](\d{3})$/)?.[1]).filter(Boolean) ?? null;
            if (S1?.every(state => !EnumStates[state] || ignored.includes(state))) { return null; }
            if (zones?.length === 0) return null;
            return {event, polygon: await GetUnionPolygon({ 
                Polygons: polygons ? [polygons.coordinates] : [await GetEventGeometry({ Event: event }).coordinates],
            })};
        })
    )).filter(Boolean);

    if (polygons) {
        const [centerLon, centerLat] = geoCentroid(NormalizeD3Polygon(polygons));
        iMode.center([centerLon, centerLat]).translate([Width / 2, Height / 2]).scale(MinZoom);
        const [[x1, y1], [x2, y2]] = geoPath().projection(iMode).bounds(jCollection);
        const scaleX = Width / (x2 - x1);
        const scaleY = Height / (y2 - y1);
        const scale = 1.5;
        iMode.scale(Math.min(scaleX, scaleY) * scale);
    } else { 
        iMode.fitExtent([[50, 50], [Width - 50, Height - 50]], jCollection);
    }

    const ePathing = gPolygons?.map(({ event, polygon: polys }) => {
        const thex = event?.properties?.event ? `#${event.properties.event.split(``).reduce((hash, char) => {
            return ((hash << 5) - hash + char.charCodeAt(0)) | 0 }, 0).toString(16).slice(-6).padStart(6, `0`)}` : `#ff0000`;
        return GetSVGPath({ 
            Polygons: polys, 
            IPath: iPath, 
            Map: false,
            Settings: { BorderColor: `${thex}`, BorderWidth: 2, FillColor: `${thex}`, FillOpacity: 0.3 } 
        });
    }).filter(Boolean).join(``);

    const cPathing = gCountyLines.map(polygon => GetSVGPath({ 
        Polygons: polygon.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon, 
        IPath: iPath,
        Map: true,
        Settings: { BorderColor: `darkgray`, BorderWidth: 0.5, FillColor: `black`, FillOpacity: 1 } 
    })).filter(Boolean).join(``);

    const sPathing = gStatesLines.map(polygon => GetSVGPath({ 
        Polygons: polygon.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon,
        IPath: iPath, 
        Map: false,
        Settings: { BorderColor: `white`, BorderWidth: 1, FillColor: `#ffffff`, FillOpacity: 0 } 
    })).filter(Boolean).join(``);

    const SVG = CreateSVG({
        Width, Height,
        MapFeatures: [cPathing, sPathing, ePathing],
        Features: Event ? [
            Event ? `<text x="${Width / 2}" y="${Height - 50}" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="white">${Event.properties?.event ?? `Event`}</text>` : ``,
            Event ? `<text x="${Width / 2}" y="${Height - 20}" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="white">${Event.properties?.status}</text>` : ``,
        ] : []
    })

    const dir = Directory ?? Bootstrap.Settings?.GlobalSettings?.ArchiveSettings?.ImageDirectory;
    const name = Name ?? Event?.properties?.event ?? `img`;
    const dist = S ? join(dir, S.filter((state, index) => S.indexOf(state) === index).map(state => state).join(`-`)) : dir;
    await mkdir(dist, { recursive: true });
    await sharp(Buffer.from(SVG))
        .png()
        .toFile(join(dist, `${name}${name.includes(`.png`) ? `` : `.png`}`));
    return dist + `/${name}${name.includes(`.png`) ? `` : `.png`}`; 
}