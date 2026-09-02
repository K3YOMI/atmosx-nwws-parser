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
import { EnumThemes } from "@Enums/Themes"
import { TypeEvent } from "StaticTypes/Event"
import { Bootstrap } from "@Bootstrap"
import { GetMatched } from "@Utilities/GetMatched"
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

// 720
export const GenerateGraphic = async ({ File, Regions, Event, MaxMiles = 125, MinZoom = 0.4, Width = 1200, Height = 675 }: GenerateGraphicOptions): Promise<string> => {
    let polygons: GeoJSON.Polygon | GeoJSON.MultiPolygon | null
    let iconUrl: string | null = null;

    const ignored = [`HI`, `AK`];
    const { Directory, Name } = File ?? {};
    const S = Event?.properties?.geocode?.ugc?.map(ugc => ugc.match(/^([A-Z]{2})[CZ](\d{3})$/)?.[1]).filter(Boolean) ?? null;

    if (Event && !S) { return null; }
    if (S?.every(state => !EnumStates[state] || ignored.includes(state))) { return null; }


    const R = (Regions ?? null)?.length
        ? [...new Set(Regions ?? null)]
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
        iMode.fitExtent([[30, 30], [Width - 30, Height - 30]], jCollection);
    }

    const ePathing = gPolygons?.map(({ event, polygon: polys }) => {
        return GetSVGPath({ 
            Polygons: polys, 
            IPath: iPath, 
            Map: false,
            Settings: { BorderColor: `${event?.properties?.theme}`, BorderWidth: 2, FillColor: `${event?.properties?.theme}`, FillOpacity: 0.1 } 
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

    const isEvent = Boolean(Event);
    const title = isEvent
        ? (Event.properties?.event ?? `Event`)
        : (R?.length > 0 ? `Region: ${R.map(state => EnumStates[state] ?? state).join(`, `)}` : `Contiguous United States`);
    const subtitleLines = isEvent
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
        iconUrl = `data:image/png;base64,${Buffer.from(buffer).toString(`base64`)}`;
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
        MapFeatures: [cPathing, sPathing, ePathing],
        Features: [
            `<rect x="${Math.round(9 * scale)}" y="${Math.round(10 * scale)}" width="${boxWidth}" height="${boxHeight}"  fill="rgba(0, 0, 0, 0.57)" />`,
            `<rect x="${Math.round(6 * scale)}" y="${Math.round(7 * scale)}" width="${boxWidth}" height="${boxHeight}" fill="rgba(16, 18, 24, 0.36)" stroke="rgba(255,255,255,0.12)" stroke-width="${Math.max(1, scale)}" />`,
            `<rect x="${Math.round(6 * scale)}" y="${Math.round(7 * scale)}" width="${accentWidth}" height="${boxHeight}" fill="${Event?.properties?.theme ?? `rgb(56, 72, 88)`}" />`,
            hasIcon && iconUrl
                ? `<image href="${iconUrl}" x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" preserveAspectRatio="xMidYMid meet" opacity="0.95" />`
                : ``,
            `<text x="${textStartX}" y="${titleY}" text-anchor="start" font-family="Arial, sans-serif" font-size="${titleSize}" font-weight="700" fill="white">${title.length > maxTitleChars ? title.slice(0, maxTitleChars - 3) + `...` : title}</text>`,
            ...subtitleLines.map((line, i) =>
                `<text x="${textStartX}" y="${firstLineY + (i * lineHeight)}" text-anchor="start" font-family="Arial, sans-serif" font-size="${lineSize}" fill="rgba(255,255,255,0.82)">${line.length > maxLineChars ? line.slice(0, maxLineChars - 3) + `...` : line}</text>`
            )
        ]
    });

    const dir = Directory ?? Bootstrap.Settings?.GlobalSettings?.ArchiveSettings?.ImageDirectory;
    const name = Name ?? Event?.properties?.event ?? `img`;
    const dist = S ? join(dir, S.filter((state, index) => S.indexOf(state) === index).map(state => state).join(`-`)) : dir;
    await mkdir(dist, { recursive: true });
    await sharp(Buffer.from(SVG))
        .png()
        .toFile(join(dist, `${name}${name.includes(`.png`) ? `` : `.png`}`));
    return dist + `/${name}${name.includes(`.png`) ? `` : `.png`}`; 
}