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

export const getPolygonFromProduct = (message: string): number[][] => {
    const coordinates: [number, number][] = [];
    const match = message.match(/LAT\.{3}LON\s+([\d\s]+)/i);
    if (!match || !match[1]) return coordinates;
    const coordStrings = match[1].replace(/\n/g, ' ').trim().split(/\s+/);
    for (let i = 0; i < coordStrings.length - 1; i += 2) {
        const lat = parseFloat(coordStrings[i]) / 100;
        const lon = -parseFloat(coordStrings[i + 1]) / 100;
        if (!isNaN(lat) && !isNaN(lon)) { coordinates.push([lon, lat]); }
    }
    if (coordinates.length > 2) { coordinates.push(coordinates[0]); }
    return coordinates;
}