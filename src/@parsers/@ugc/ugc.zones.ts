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


export const zones = (header: string): string[] => {
    const splits = header.split('-');
    const zones: string[] = [];
    let state = splits[0].substring(0, 2);
    const format = splits[0].substring(2, 3);
    for (const part of splits) {
        if (/^[A-Z]/.test(part)) {
            state = part.substring(0, 2);
            if (part.includes('>')) {
                const [start, end] = part.split('>');
                const startNum = parseInt(start.substring(3), 10);
                const endNum = parseInt(end, 10);
                for (let j = startNum; j <= endNum; j++) {
                    zones.push(`${state}${format}${j.toString().padStart(3, '0')}`);
                }
            } else {
                zones.push(part);
            }
            continue;
        }
        if (part.includes('>')) {
            const [start, end] = part.split('>');
            const startNum = parseInt(start, 10);
            const endNum = parseInt(end, 10);
            for (let j = startNum; j <= endNum; j++) {
                zones.push(`${state}${format}${j.toString().padStart(3, '0')}`);
            }
        } else {
            zones.push(`${state}${format}${part}`);
        }
    }
    return zones.filter(item => item !== '');
}