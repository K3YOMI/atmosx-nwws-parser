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

interface CreateHttpOptions { 
    URL: string
    Headers?: any
    Timeout?: number
    Auth?: {
        Username: string
        Password: string
    }
    Method?: `GET` | `POST` | `PUT` | `DELETE`
    Body?: any;
    Form?: any;
}

export const CreateHttp = async ({ URL, Headers, Timeout, Auth, Method, Body, Form }: CreateHttpOptions): Promise<any> => {
	const requestOptions: RequestInit = {
        method: Method ?? "GET",
        headers: Headers ?? {
            "User-Agent": "AtmosphericX",
            "Accept": "application/geo+json, text/plain, */*; q=0.9",
            "Accept-Language": "en-US,en;q=0.9",
        },
        signal: AbortSignal.timeout(Timeout ?? 10_000),
        redirect: "follow"
    };


	const returnHttp = function(error: boolean,status: number, message: string) {
		return { error: error, options: requestOptions, status, message };
	}

    if (Auth) {
        const authString = `${Auth.Username}:${Auth.Password}`;
        const encodedAuth = Buffer.from(authString).toString("base64");
        requestOptions.headers = {
            ...requestOptions.headers,
            "Authorization": `Basic ${encodedAuth}`
        };
    }

	if (Form) { 
		requestOptions.body = Form;
	} else if (Body != undefined) {
        requestOptions.body =
        Body instanceof FormData
            ? Body
            : typeof Body === "string"
                ? Body
                : JSON.stringify(Body);
	}

	try { 
		const response = await fetch(
			URL ?? `https://api.weather.gov/alerts/active`,
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
