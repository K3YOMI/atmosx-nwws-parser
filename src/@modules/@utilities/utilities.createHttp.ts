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

import request from 'request'

interface CreateHttpOptions { 
    proxy?: string
    url: string
    headers?: any
    timeout?: number
    method?: `GET` | `POST` | `PUT` | `DELETE`
    body?: any;
    formData?: any;
}

export const createHttp = async (options: CreateHttpOptions): Promise<any> => {
    return new Promise((resolve, reject) => {
        try {
            const requestOptions = { 
                url: options.url ?? `https://api.weather.gov/alerts/active`,
                headers: options.headers ?? {
                    "User-Agent": "AtmosphericX",
                    "Accept": "application/geo+json, text/plain, */*; q=0.9",
                    "Accept-Language": "en-US,en;q=0.9"
                }, 
                method: options.method ?? `GET`,
                timeout: options.timeout ?? 10e3,
                proxy: options.proxy ?? null,
                maxRedirects: 1, 
            };
            if (options.formData) {
                requestOptions['formData'] = options.formData;
            } else if (options.body) {
                requestOptions['body'] = options.body;
            }
            
            request(requestOptions, (error, response, body) => {
                if (error) { 
                    return resolve({
                        error: true,
                        options: requestOptions,
                        status: -1,
                        message: error.message ?? `Unknown Error`
                    })
                }
                if (response.statusCode < 200 || response.statusCode >= 300) {
                    return resolve({
                        error: true,
                        options: requestOptions,
                        status: response.statusCode ?? -1,
                        message: `HTTP Status Code ${response.statusCode ?? `Unknown Status Code`} (${body})`
                    })
                }
                if (body == undefined || body == null) { 
                    return resolve({
                        error: true,
                        options: requestOptions,
                        status: response.statusCode ?? -1,
                        message: `Empty Response Body`
                    })
                }
                resolve({
                    error: false,
                    options: requestOptions,
                    status: response.statusCode ?? -1,
                    message: body
                })  
            })
        } catch (error) {
            return resolve({
                error: true,
                options: {},
                status: -1,
                message: error.message ?? `Unknown Error`
            })
        }
    })
}
