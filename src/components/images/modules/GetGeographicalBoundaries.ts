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

import { EnumStateFIPS } from "@Enums/States"
import { CreateQuery } from "@Database/CreateQuery"

interface GetGeographicalBoundariesOptions {
    Regions: string[] | null
}

interface GeographicalBoundariesResponse {
    states: any[]
    counties: any[]
}

export const GetGeographicalBoundaries = ({ Regions }: GetGeographicalBoundariesOptions): GeographicalBoundariesResponse => {
    const states = []
    const counties = []
    if (!Regions) {
        const stateBoundaries = CreateQuery({
            Query: `SELECT * FROM boundaries WHERE type = 'state' AND state NOT IN ('AK', 'HI')`,
        })
        const countyBoundaries = CreateQuery({
            Query: `SELECT * FROM boundaries WHERE type = 'county' AND state NOT IN ('AK', 'HI')`,
        })
        states.push(...stateBoundaries)
        counties.push(...countyBoundaries)
        return { states, counties }
    }
    for (const region of Regions) {
        const match = region.match(/^([A-Z]{2})[CZ](\d{3})$/i) ?? null
        if (!match) { 
              const children = CreateQuery({ 
                Query: `SELECT * FROM boundaries WHERE type = 'county' AND state = ?`, 
                Parameters: [region] 
            })
            const parent = CreateQuery({ 
                Query: `SELECT * FROM boundaries WHERE type = 'state' AND state = ?`, 
                Parameters: [region]
            })
            for (const child of children) {
                counties.push(child)
            }
            states.push(...parent)
        } else { 
            const [, state, county] = match
            const fips = Object.entries(EnumStateFIPS).find(([, value]) => value === state)?.[0]
            const child =  CreateQuery({ 
                Query: `SELECT * FROM boundaries WHERE type = 'county' AND id = ?`, 
                Parameters: [fips + county] 
            })
            counties.push(...child);
        }
    }
    return { states, counties }
}