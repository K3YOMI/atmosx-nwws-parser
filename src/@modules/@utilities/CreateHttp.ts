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

interface CreateHttpOptions { 
    url: string
    headers?: any
    timeout?: number
    auth?: {
        username: string
        password: string
    }
    method?: `GET` | `POST` | `PUT` | `DELETE`
    body?: any;
    formData?: any;
}

export const CreateHttp = async (options: CreateHttpOptions): Promise<any> => {
	const requestOptions: RequestInit = {
        method: options.method ?? "GET",
        headers: options.headers ?? {
            "User-Agent": "AtmosphericX",
            "Accept": "application/geo+json, text/plain, */*; q=0.9",
            "Accept-Language": "en-US,en;q=0.9",
        },
        signal: AbortSignal.timeout(options.timeout ?? 10_000),
        redirect: "follow"
    };


	const returnHttp = function(error: boolean,status: number, message: string) {
		return { error: error, options: requestOptions, status, message };
	}

    if (options?.auth) {
        const authString = `${options.auth.username}:${options.auth.password}`;
        const encodedAuth = Buffer.from(authString).toString("base64");
        requestOptions.headers = {
            ...requestOptions.headers,
            "Authorization": `Basic ${encodedAuth}`
        };
    }

	if (options?.formData) { 
		requestOptions.body = options.formData;
	} else if (options?.body != undefined) {
        requestOptions.body =
        options.body instanceof FormData
            ? options.body
            : typeof options.body === "string"
                ? options.body
                : JSON.stringify(options.body);
	}

	try { 
		const response = await fetch(
			options?.url ?? `https://api.weather.gov/alerts/active`,
			requestOptions
		)
		const body = await response.text();
		if (!response.ok) { 
			return returnHttp(true, response.status, `HTTP Status Code ${response.status} (${response.statusText})`)
		}
		return returnHttp(false, response.status, body)
	} catch (error) {
		return returnHttp(true, 500, `Internal Server Error: ${error}`)
	}
}
