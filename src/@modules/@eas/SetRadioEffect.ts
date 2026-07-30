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

import { GetPCMToFloat } from "@eas/GetPCMToFloat"
import { GetFloatPCM16 } from "@eas/GetFloatPCM16"

export const SetRadioEffect = (int16: Int16Array, sampleRate: number): Int16Array => {
    const hpCut = 3555;
    const lpCut = 1600;
    const x = GetPCMToFloat(int16);
    const dt = 1 / sampleRate;
    const rcHP = 1 / (2 * Math.PI * hpCut);
    const aHP = rcHP / (rcHP + dt);
    let yHP = 0, xPrev = 0;
    for (let i = 0; i < x.length; i++) {
        const xi = x[i];
        yHP = aHP * (yHP + xi - xPrev);
        xPrev = xi;
        x[i] = yHP;
    }
    const rcLP = 1 / (2 * Math.PI * lpCut);
    const aLP = dt / (rcLP + dt);
    let yLP = 0;
    for (let i = 0; i < x.length; i++) {
        yLP = yLP + aLP * (x[i] - yLP);
        x[i] = yLP;
    }
    const compGain = 2.0;
    const norm = Math.tanh(compGain);
    for (let i = 0; i < x.length; i++) x[i] = Math.tanh(x[i] * compGain) / norm;
    return GetFloatPCM16(x);
}

