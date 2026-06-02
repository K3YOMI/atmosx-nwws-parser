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


import { setAFSK } from "./eas.setAFSK";
import { setAsciiToBits } from "./eas.setAsciiToBits";
import { getMergedPCM16 } from "./eas.getMergedPCM16";

export const setSameHeader = (vtec: string, repeats: number, sampleRate: number = 8000, options: {preMarkSec?: number, gapSec?: number} = {}): Int16Array => {
    const preMarkSec = options.preMarkSec ?? 0.3;
    const gapSec = options.gapSec ?? 0.1;
    const bursts = [];
    const gap = new Int16Array(Math.floor(gapSec * sampleRate));
    for (let i = 0; i < repeats; i++) {
        const bodyBits = setAsciiToBits(vtec);
        const body = setAFSK(bodyBits, sampleRate);
        const extendedBodyDuration = Math.round(preMarkSec * sampleRate);
        const extendedBody = new Int16Array(extendedBodyDuration + gap.length);
        for (let j = 0; j < extendedBodyDuration; j++) { 
            extendedBody[j] = Math.round(body[j % body.length] * 0.2); 
        }
        extendedBody.set(gap, extendedBodyDuration);
        bursts.push(extendedBody);
        if (i !== repeats - 1) bursts.push(gap);
    }
    return getMergedPCM16(bursts);
}

