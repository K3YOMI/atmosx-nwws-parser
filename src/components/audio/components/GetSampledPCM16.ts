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

interface GetSampledPCM16Options {
    Int16: Int16Array
    OriginalRate: number
    TargetRate: number
}

export const GetSampledPCM16 = ({ Int16, OriginalRate, TargetRate }: GetSampledPCM16Options): Int16Array => {
    if (OriginalRate === TargetRate) return Int16;
    const ratio = TargetRate / OriginalRate;
    const outLen = Math.max(1, Math.round(Int16.length * ratio));
    const out = new Int16Array(outLen);
    for (let i = 0; i < outLen; i++) {
        const pos = i / ratio;
        const i0 = Math.floor(pos);
        const i1 = Math.min(i0 + 1, Int16.length - 1);
        const frac = pos - i0;
        const v = Int16[i0] * (1 - frac) + Int16[i1] * frac;
        out[i] = Math.round(v);
    }
    return out;
}

