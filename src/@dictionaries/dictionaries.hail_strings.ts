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

// match the size of the hail to the object like pingpong (etc)
export const hailstrings: Record<string, string> = {
    "0.75": "Penny",
    "0.88": "Nickel",
    "1.00": "Quarter",
    "1.25": "Half Dollar",
    "1.50": "Ping Pong Ball",
    "1.75": "Golf Ball",
    "2.00": "Hen Egg",
    "2.50": "Tennis Ball",
    "2.75": "Baseball",
    "4.00": "CD/DVD"
}