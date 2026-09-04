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

import { SetAFSK } from "@AudioComponents/SetAFSK"
import { SetAsciiToBits } from "@AudioComponents/SetAsciiToBits"
import { GetMergedPCM16 } from "@AudioComponents/GetMergedPCM16"

interface SetSameHeaderOptions {
    VTEC: string
    Repeats: number
    SampleRate?: number
    PreMarkSec?: number
    GapSec?: number
}

export const SetSameHeader = ({ VTEC, Repeats, SampleRate, PreMarkSec, GapSec }: SetSameHeaderOptions): Int16Array => {
    const preMarkSec = PreMarkSec ?? 0.3;
    const gapSec = GapSec ?? 0.1;
    const bursts = [];
    const gap = new Int16Array(Math.floor(gapSec * SampleRate));
    for (let i = 0; i < Repeats; i++) {
        const bodyBits = SetAsciiToBits(VTEC);
        const body = SetAFSK({ Bits: bodyBits, SampleRate: SampleRate});
        const extendedBodyDuration = Math.round(preMarkSec * SampleRate);
        const extendedBody = new Int16Array(extendedBodyDuration + gap.length);
        for (let j = 0; j < extendedBodyDuration; j++) { 
            extendedBody[j] = Math.round(body[j % body.length] * 0.2); 
        }
        extendedBody.set(gap, extendedBodyDuration);
        bursts.push(extendedBody);
        if (i !== Repeats - 1) bursts.push(gap);
    }
    return GetMergedPCM16(bursts);
}

