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

export const setAttentionTone = (ms: number, sampleRate: number): Int16Array => {
    const len = Math.floor(ms * sampleRate);
    const out = new Int16Array(len);
    const f1 = 853;
    const f2 = 960;
    const twoPi = Math.PI * 2;
    const amp = 0.1;
    const fadeLen = Math.floor(sampleRate * 0.00); 
    for (let i = 0; i < len; i++) {
        const t = i / sampleRate;
        const s = Math.sin(twoPi * f1 * t) + Math.sin(twoPi * f2 * t);
        let gain = 1;
        if (i < fadeLen) gain = i / fadeLen;
        else if (i > len - fadeLen) gain = (len - i) / fadeLen;
        const v = Math.max(-1, Math.min(1, (s / 2) * amp * gain));
        out[i] = Math.round(v * 32767);
    }
    return out;
}

