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

export const GetPolygonFromProduct = (message: string): number[][] => {
    const coordinates: number[][] = [];
    const match = message.match(
        /LAT\.\.\.LON\s+([\s\S]*?)(?=\n[A-Z]{2,}(?:\.\.\.|:)|\$\$|&&|$)/i
    );
    if (!match) return coordinates;
    const text = match[1];
    const values = text.match(/\d{4,8}/g);
    if (!values) return coordinates;

    if (values.every(v => v.length === 8)) {
        for (const value of values) {
            const lat = parseInt(value.slice(0, 4), 10) / 100;
            const lon = -parseInt(value.slice(4, 8), 10) / 100;
            if (Number.isFinite(lat) && Number.isFinite(lon)) {
                coordinates.push([lon, lat]);
            }
        }
    }

    else {
        for (let i = 0; i + 1 < values.length; i += 2) {
            const lat = parseInt(values[i], 10) / 100;
            const lon = -parseInt(values[i + 1], 10) / 100;
            if (Number.isFinite(lat) && Number.isFinite(lon)) {
                coordinates.push([lon, lat]);
            }
        }
    }
    if (coordinates.length > 2) {
        coordinates.push([...coordinates[0]]);
    }
    return coordinates;
};