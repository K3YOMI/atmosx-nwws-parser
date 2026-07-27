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

interface GetXMLOptions {
    message: string
    targets: string[]
}

export const GetXML = (options: GetXMLOptions): Record<string, string> => {
    const extracted: Record<string, any> = {};   
    const findValueByKey = (obj: any, searchKey: string) => {
        const results = [];
        if (obj === null || typeof obj !== 'object') {
            return results;
        }
        const searchKeyLower = searchKey.toLowerCase();
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && key.toLowerCase() === searchKeyLower) {
                results.push(obj[key]);
            }
        }
        if (Array.isArray(obj)) {
            for (const item of obj) {
                if (item.valueName && item.valueName.toLowerCase() === searchKeyLower && item.value !== undefined) {
                    results.push(item.value);
                }
                const nestedResults = findValueByKey(item, searchKey);
                results.push(...nestedResults);
            }
        }
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const nestedResults = findValueByKey(obj[key], searchKey);
                results.push(...nestedResults);
            }
        }
        return results;
    };
    for (const key of options.targets) {
        const values = findValueByKey(options.message, key);
        const uniqueValues = [...new Set(values)];
        extracted[key] = uniqueValues.length === 0 ? null : (uniqueValues.length === 1 ? uniqueValues[0] : uniqueValues);
    }
    return extracted;
}