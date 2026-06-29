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

import { validateEvents } from "../@building/building.validate";

interface CreateEventOptions { 
    event: string
    status: string
    issued: Date
    expires: Date
    locations: string
    description: string
    coordinates: number[][]
}

export const createEvent = (options: CreateEventOptions): void => {
    const tick = performance.now()
    validateEvents([{
        type: `Feature`,
        geometry: {
            type: `Point`,
            coordinates: options.coordinates
        },
        properties: { 
            event: options.event,
            parent: options.event,
            status: options.status,
            issued: options.issued.toISOString(),
            expires: options.expires.toISOString(),
            locations: options.locations,
            locations_array: options.locations ? options.locations.split(';') : [],
            description: options.description,
            geocode: {
                office: {
                    office: `ATMX`,
                    name: `AtmosphericX Manual Event`,
                },
                organization: `AtmosphericX`,
                ugc: [],
                polygon: options.coordinates.length > 0 ? Buffer.from(JSON.stringify([options.coordinates[0]])).toString('base64') : null,
                polygon_generated: options.coordinates.length > 0 ? true : false,
            },
            status_metadata: {
                is_issued: options.status == `Issued`,
                is_updated: options.status == `Updated`,
                is_expired: options.status == `Expired`,
                is_test: options.status == `Test`,
                is_statement: options.status == `Statement`
            },
            metadata: {
                ms: performance.now() - tick,
                source: `events.manual`,
                tracking: `ATMX-M-W-01`,
                header: `ZCZC-ATMOSX-ATMX-M-W-01`,
                raw: options.description,
                history: [
                    {
                        description: options.description,
                        issued: options.issued.toISOString(),
                        status: options.status ?? null,
                    }
                ]
            }
        }
    }]) 
}
