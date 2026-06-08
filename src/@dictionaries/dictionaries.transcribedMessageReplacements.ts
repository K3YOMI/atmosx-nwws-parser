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

export const transcribedMessageReplacements: { regex: RegExp, replacement: string }[] = [
    { regex: /\*/g, replacement: "" },
    { regex: /\.{3,}/g, replacement: "" },
    { regex: /\bUTC\b/g, replacement: 'Coordinated Universal Time' },
    { regex: /\bGMT\b/g, replacement: 'Greenwich Mean Time' },
    { regex: /\bEST\b(?!\w)/g, replacement: 'Eastern Standard Time' },
    { regex: /\bEDT\b(?!\w)/g, replacement: 'Eastern Daylight Time' },
    { regex: /\bCST\b(?!\w)/g, replacement: 'Central Standard Time' },
    { regex: /\bCDT\b(?!\w)/g, replacement: 'Central Daylight Time' },
    { regex: /\bMST\b(?!\w)/g, replacement: 'Mountain Standard Time' },
    { regex: /\bMDT\b(?!\w)/g, replacement: 'Mountain Daylight Time' },
    { regex: /\bPST\b(?!\w)/g, replacement: 'Pacific Standard Time' },
    { regex: /\bPDT\b(?!\w)/g, replacement: 'Pacific Daylight Time' },
    { regex: /\bAKST\b(?!\w)/g, replacement: 'Alaska Standard Time' },
    { regex: /\bAKDT\b(?!\w)/g, replacement: 'Alaska Daylight Time' },
    { regex: /\bHST\b(?!\w)/g, replacement: 'Hawaii Standard Time' },
    { regex: /\bHDT\b(?!\w)/g, replacement: 'Hawaii Daylight Time' },
    { regex: /\bmph\b(?!\w)/g, replacement: 'miles per hour' },
    { regex: /\bkm\/h\b(?!\w)/g, replacement: 'kilometers per hour' },
    { regex: /\bkmh\b(?!\w)/g, replacement: 'kilometers per hour' },
    { regex: /\bkt\b(?!\w)/g, replacement: 'knots' },
    { regex: /\bNE\b(?!\w)/g, replacement: 'northeast' },
    { regex: /\bNW\b(?!\w)/g, replacement: 'northwest' },
    { regex: /\bSE\b(?!\w)/g, replacement: 'southeast' },
    { regex: /\bSW\b(?!\w)/g, replacement: 'southwest' },
    { regex: /\bNM\b(?!\w)/g, replacement: 'nautical miles' },
    { regex: /\bdeg\b(?!\w)/g, replacement: 'degrees' },
    { regex: /\btstm\b(?!\w)/g, replacement: 'thunderstorm' },
    { regex: /\bmm\b(?!\w)/g, replacement: 'millimeters' },
    { regex: /\bcm\b(?!\w)/g, replacement: 'centimeters' },
    { regex: /\bin.\b(?!\w)/g, replacement: 'inches' },
    { regex: /\bft\b(?!\w)/g, replacement: 'feet' },
    { regex: /\bmi\b(?!\w)/g, replacement: 'miles' },
    { regex: /\bhr\b(?!\w)/g, replacement: 'hour' },
    { regex: /\bhourly\b(?!\w)/g, replacement: 'per hour' },
    { regex: /\bkg\b(?!\w)/g, replacement: 'kilograms' },
    { regex: /\bg\/kg\b(?!\w)/g, replacement: 'grams per kilogram' },
    { regex: /\bmb\b(?!\w)/g, replacement: 'millibars' },
    { regex: /\bhPa\b(?!\w)/g, replacement: 'hectopascals' },
    { regex: /\bPa\b(?!\w)/g, replacement: 'pascals' },
    { regex: /\bKPa\b(?!\w)/g, replacement: 'kilopascals' },
    { regex: /\bC\/hr\b(?!\w)/g, replacement: 'degrees Celsius per hour' },
    { regex: /\bF\/hr\b(?!\w)/g, replacement: 'degrees Fahrenheit per hour' },
    { regex: /\bC\/min\b(?!\w)/g, replacement: 'degrees Celsius per minute' },
    { regex: /\bF\/min\b(?!\w)/g, replacement: 'degrees Fahrenheit per minute' },
    { regex: /\bC\b(?!\w)/g, replacement: 'degrees Celsius' },
    { regex: /\bF\b(?!\w)/g, replacement: 'degrees Fahrenheit' },
];
    