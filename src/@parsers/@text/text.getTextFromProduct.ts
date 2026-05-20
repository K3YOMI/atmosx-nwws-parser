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

interface GetTextFromProductOptions {
    message: string
    find: string[]
    append?: string
    removal?: string[]
}


export const getTextFromProduct = (options: GetTextFromProductOptions): string => {
    const lines = options.message.split(`\n`);
    for (const line of lines) {
        const matchedFind = options.find.find((find) => line.includes(find));
        if (matchedFind) {
            let result = line.slice(line.indexOf(matchedFind) + matchedFind.length).trim();
            if (options.removal) {
                for (const str of options.removal) {
                    result = result.toLowerCase().split(str.toLowerCase()).join('');
                }
                result = result.replace(matchedFind, '').replace('<', '').trim();
            }
            return result.toUpperCase() + (options?.append ?? ``);
        }
    }
    return null;
}