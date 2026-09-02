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

import { EnumStates, EnumZones } from "@Enums/States"
import { TypeEvent } from "StaticTypes/Event"
import { Bootstrap } from "@Bootstrap"
import { GetStringText } from "@ParsingText/GetStringText"
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
import { mkdir, readFile } from "fs/promises"
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

export const GenerateGraphic = async ({ File, Regions, Event, MaxMiles = 125, MinZoom = 0.4, Width = 1200, Height = 675 }: GenerateGraphicOptions): Promise<string> => {
    let polygons: GeoJSON.Polygon | GeoJSON.MultiPolygon | null
    let icon: string | null;
    let renders: any = {
        states: null,
        counties: null,
    };
    let pathing: any = {
        events: null,
        counties: null,
        states: null, 
    }

    const A = [EnumStates, EnumZones].reduce((acc, obj) => ({ ...acc, ...obj }), {});
    const B = [`HI`, `AK`];
    const { coordinates } = Event?.geometry ?? {};
    const { properties } = Event ?? {};
    const { region_abreviations, region_abreviations_string, theme, event } = properties ?? {};
    const inConus = Event ? region_abreviations?.every(state => A[state] && !B.includes(state)) : true;
    const R = (Regions ?? null)?.length
        ? [...new Set(Regions ?? null)]
        : null;
    const E = GetGeographicalEvents({ Regions: R, Event: Event });
    if (inConus || !Event) {
        const boundaries = GetGeographicalBoundaries({ Regions: R });
        renders.states = GetParsedBoundary(boundaries.states);
        renders.counties = GetParsedBoundary(boundaries.counties);
    }

    if (Event) { 
        polygons = (coordinates.length > 0) ? Event.geometry : await GetEventGeometry({ Event });
        if (polygons.coordinates.length == 0) { return null; }
        if (inConus) {
            const eBounds = GetGeometryBounds({ Geometry: polygons, Padding: MaxMiles });
            renders.counties = renders.counties.filter((county: GeoJSON.Feature<GeoJSON.Polygon>) => {
                const cBounds = GetGeometryBounds({ Geometry: county.geometry, Padding: MaxMiles });
                return ( cBounds.Bounds.minLon <= eBounds.Search.maxLon && cBounds.Bounds.maxLon >= eBounds.Search.minLon && cBounds.Bounds.minLat <= eBounds.Search.maxLat && cBounds.Bounds.maxLat >= eBounds.Search.minLat );
            });
            renders.states = renders.states.filter((state: GeoJSON.Feature<GeoJSON.Polygon>) => {
                const sBounds = GetGeometryBounds({ Geometry: state.geometry, Padding: MaxMiles });
                return ( sBounds.Bounds.minLon <= eBounds.Search.maxLon && sBounds.Bounds.maxLon >= eBounds.Search.minLon && sBounds.Bounds.minLat <= eBounds.Search.maxLat && sBounds.Bounds.maxLat >= eBounds.Search.minLat );
            });
        }
    }

    const iMode = geoMercator();
    const iPath = geoPath().projection(iMode);
    const jFeatures: GeoJSON.Feature[] = [...renders?.states ?? [], ...renders?.counties ?? []];
    const jCollection: GeoJSON.FeatureCollection = { type: `FeatureCollection`, features: jFeatures };
    const events = (await Promise.all(
        E.map(async (event: TypeEvent) => {
            const zones = event.properties?.geocode?.ugc ?? [];
            if (zones?.length === 0) return null;
            return {event, polygon: await GetUnionPolygon({ 
                Polygons: polygons ? [polygons.coordinates] : [await GetEventGeometry({ Event: event }).coordinates],
            })};
        })
    )).filter(Boolean);

    if (polygons) {
        const [centerLon, centerLat] = geoCentroid(NormalizeD3Polygon(polygons));
        iMode.center([centerLon, centerLat]).translate([Width / 2, Height / 2]).scale(renders?.counties?.length > 0 ? 0.4 : 1.0);
        const [[x1, y1], [x2, y2]] = geoPath().projection(iMode).bounds(jCollection.features.length > 0 ? jCollection : { type: `FeatureCollection`, features: [ { type: `Feature`, geometry: polygons, properties: {} } ] });
        const scaleX = Width / (x2 - x1);
        const scaleY = Height / (y2 - y1);
        const scale = 1.5;
        iMode.scale(Math.min(scaleX, scaleY) * scale);
    } else { 
        iMode.fitExtent([[60, 60], [Width - 60, Height - 60]], jCollection);
    }

    pathing.events = events?.map(({ event, polygon: polys }) => {
        return GetSVGPath({ 
            Polygons: polys, 
            IPath: iPath, 
            Map: false,
            Settings: { BorderColor: `${theme}`, BorderWidth: 2, FillColor: `${theme}`, FillOpacity: 0.1 } 
        });
    }).filter(Boolean).join(``);

    pathing.counties = renders?.counties?.map((polygon: GeoJSON.Feature) => GetSVGPath({ 
        Polygons: polygon.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon, 
        IPath: iPath,
        Map: true,
        Settings: { BorderColor: `darkgray`, BorderWidth: 0.5, FillColor: `black`, FillOpacity: 1 } 
    })).filter(Boolean).join(``);

    pathing.states = renders?.states?.map((polygon: GeoJSON.Feature) => GetSVGPath({ 
        Polygons: polygon.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon,
        IPath: iPath, 
        Map: false,
        Settings: { BorderColor: `white`, BorderWidth: 1, FillColor: `#ffffff`, FillOpacity: 0 } 
    })).filter(Boolean).join(``);

    const title = Event
        ? (event ?? `Event`)
        : (R?.length > 0 ? `Region: ${R.map(state => EnumStates[state] ?? state).join(`, `)}` : `Contiguous United States`);
    const subtitleLines = Event
        ? GetStringText(Event).split(`\n`).filter(line => line.trim().length > 0).slice(0, 10)
        : [`Last Updated: ${new Date().toLocaleString()}`];
    const scale = Math.max(0.75, Math.min(1.5, Width / 1000));
    const titleSize = Math.round(17 * scale);
    const lineSize = Math.round(13 * scale);
    const lineHeight = Math.round(15 * scale);
    const paddingX = Math.round(16 * scale);
    const paddingTop = Math.round(16 * scale);
    const paddingBottom = Math.round(16 * scale);
    const accentWidth = Math.max(4, Math.round(5 * scale));
    const iconSize = Math.round(Math.min(122, Math.max(48, Width * 0.07)) * scale);
    const hasIcon = Boolean(Bootstrap?.Settings?.GlobalSettings?.ArchiveSettings?.Logo);

    if (hasIcon) {
        const buffer = await readFile(Bootstrap.Settings.GlobalSettings.ArchiveSettings.Logo);
        icon = `data:image/png;base64,${Buffer.from(buffer).toString(`base64`)}`;
    }

    const boxWidth = Math.min(Math.round(Width * 0.4), Width - Math.round(28 * scale));
    const textStartX = paddingX + accentWidth + Math.round(6 * scale);
    const textEndPadding = hasIcon ? iconSize + Math.round(20 * scale) : Math.round(16 * scale);
    const availableTextWidth = boxWidth - textStartX - textEndPadding;
    const maxTitleChars = Math.max(20, Math.floor(availableTextWidth / (titleSize * 0.52)));
    const maxLineChars = Math.max(24, Math.floor(availableTextWidth / (lineSize * 0.52)));

    const titleY = paddingTop + titleSize;
    const firstLineY = titleY + Math.round(22 * scale);
    const contentHeight = firstLineY + (subtitleLines.length * lineHeight) + paddingBottom;
    const boxHeight = Math.max(contentHeight, hasIcon ? paddingTop + iconSize + paddingBottom : contentHeight);

    const iconX = boxWidth - iconSize - Math.round(5 * scale);
    const iconY = paddingTop;

    const SVG = CreateSVG({
        Width, Height,
        MapFeatures: !inConus ? [pathing.events] : [pathing.counties, pathing.states, pathing.events],
        Features: [
            `<rect x="${Math.round(9 * scale)}" y="${Math.round(10 * scale)}" width="${boxWidth}" height="${boxHeight}"  fill="rgba(0, 0, 0, 0.57)" />`,
            `<rect x="${Math.round(6 * scale)}" y="${Math.round(7 * scale)}" width="${boxWidth}" height="${boxHeight}" fill="rgba(16, 18, 24, 0.36)" stroke="rgba(255,255,255,0.12)" stroke-width="${Math.max(1, scale)}" />`,
            `<rect x="${Math.round(6 * scale)}" y="${Math.round(7 * scale)}" width="${accentWidth}" height="${boxHeight}" fill="${theme ?? `rgb(56, 72, 88)`}" />`,
            hasIcon && icon
                ? `<image href="${icon}" x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" preserveAspectRatio="xMidYMid meet" opacity="0.95" />`
                : ``,
            `<text x="${textStartX}" y="${titleY}" text-anchor="start" font-family="Arial, sans-serif" font-size="${titleSize}" font-weight="700" fill="white">${title.length > maxTitleChars ? title.slice(0, maxTitleChars - 3) + `...` : title}</text>`,
            ...subtitleLines.map((line, i) =>
                `<text x="${textStartX}" y="${firstLineY + (i * lineHeight)}" text-anchor="start" font-family="Arial, sans-serif" font-size="${lineSize}" fill="rgba(255,255,255,0.82)">${line.length > maxLineChars ? line.slice(0, maxLineChars - 3) + `...` : line}</text>`
            )
        ]
    });

    const { Directory, Name } = File ?? {};
    const dir = Directory ?? Bootstrap.Settings?.GlobalSettings?.ArchiveSettings?.ImageDirectory;
    const name = Name ?? event ?? `img`;
    const dist = region_abreviations_string ? join(dir, region_abreviations_string) : dir;
    await mkdir(dist, { recursive: true });
    await sharp(Buffer.from(SVG))
        .png()
        .toFile(join(dist, `${name}${name.includes(`.png`) ? `` : `.png`}`));
    await sharp(Buffer.from(SVG))
        .webp()
        .toFile(`example.png`);
    return dist + `/${name}${name.includes(`.png`) ? `` : `.png`}`; 
}