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

interface GetTextFromProductOptions {
    Message: string
    Find: string[]
    Append?: string
    Removal?: string[]
}

export const GetTextFromProduct = ({ Message, Find, Append, Removal }: GetTextFromProductOptions): string => {
    const lines = Message.split(`\n`);
    for (const line of lines) {
        const matchedFind = Find.find((find) => line.includes(find));
        if (matchedFind) {
            let result = line.slice(line.indexOf(matchedFind) + matchedFind.length).trim();
            if (Removal) {
                for (const str of Removal) {
                    result = result.toLowerCase().split(str.toLowerCase()).join('');
                }
                result = result.replace(matchedFind, '').replace('<', '').trim();
            }
            return result.toUpperCase() + (Append ?? ``);
        }
    }
    return null;
}