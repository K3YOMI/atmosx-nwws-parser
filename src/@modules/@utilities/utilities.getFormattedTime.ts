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

export const getFormattedTime = (date: string): string => {
    const now = Date.now();
    const then = typeof date === "number" ? date : new Date(date).getTime()
    const seconds = Math.floor((now - then) / 1000);
    const absSeconds = Math.abs(seconds);
    const isPast = seconds > 0;
    const units: [string, number][] = [
        ["year", 31536000], ["month", 2592000],
        ["day", 86400], ["hour", 3600],
        ["minute", 60], ["second", 1],
    ];
    for (const [name, value] of units) {
        const interval = Math.floor(absSeconds / value);
        if (interval >= 1) {
            return isPast
                ? `${interval} ${name}${interval > 1 ? "s" : ""} ago`
                : `in ${interval} ${name}${interval > 1 ? "s" : ""}`;
        }
    }
    return "just now";
}


