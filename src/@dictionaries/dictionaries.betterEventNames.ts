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

type EnhancedEventType = {
    description?: string
    append?: boolean
    tornado?: string
    damage?: string
}

export const betterEventNames: Record<string, Record<string, EnhancedEventType>> = {
    "Tornado Warning": {
        "Tornado Emergency": { 
            description: "tornado emergency"
        },
        "PDS Tornado Warning": { 
            description: "particularly dangerous situation", 
            damage: `CONSIDERABLE`
        },
        "Radar Confirmed Tornado Warning": {
            description: "source...radar confirmed tornado.",
            tornado: `OBSERVED`
        },
        "Confirmed Tornado Warning": { 
            tornado: `OBSERVED`
        },
        "Radar Indicated Tornado Warning": { },
    },
    "Special Marine Warning": {
        "Special Marine Warning (TPROB)": { 
            tornado: `POSSIBLE`
        },
    },
    "Tornado Watch": {
        "PDS Tornado Watch": { 
            description: "particularly dangerous situation"
        }
    },
    "Flash Flood Warning": {
        "Flash Flood Emergency": { 
            description: "flash flood emergency" 
        },
        "Considerable Flash Flood Warning": { 
            damage: `CONSIDERABLE`
        },
    },
    "Severe Thunderstorm Warning": {
        "EDS Severe Thunderstorm Warning (TPROB)": { 
            description: "extremely dangerous situation",
            tornado: "POSSIBLE"
        },
        "EDS Severe Thunderstorm Warning": {
            description: "extremely dangerous situation"
        },
        "Destructive Severe Thunderstorm Warning (TPROB)": {
            damage: `DESTRUCTIVE`,
            tornado: `POSSIBLE`
        },
        "Destructive Severe Thunderstorm Warning": {
            damage: `DESTRUCTIVE`
        },
        "Considerable Severe Thunderstorm Warning (TPROB)": {
            damage: `CONSIDERABLE`,
            tornado: `POSSIBLE`
        },
        "Considerable Severe Thunderstorm Warning": {
            damage: `CONSIDERABLE`
        },
        "Severe Thunderstorm Warning (TPROB)": {
            tornado: `POSSIBLE`
        },
    },
}