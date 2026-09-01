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

interface GetMatchedOptions {
    Strings: string[]
    String: string
}

export const GetMatched = ({ Strings, String }: GetMatchedOptions): boolean => {
    const isMatched = Strings.some(pattern => {
        if (!pattern) return false;
        const lowerP = pattern.toLowerCase();
        const lowerS = String.toLowerCase()
        if (lowerP === "*" || lowerP === lowerS) return true;
        if (lowerP.includes("*")) {
            const regex = "^" + lowerP.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$";
            return new RegExp(regex).test(lowerS);
        }
        return false;
    });
    return isMatched;
}
