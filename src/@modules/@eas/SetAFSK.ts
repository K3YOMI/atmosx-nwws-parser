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

interface SetAFSKOptions {
    Bits: number[]
    SampleRate: number
}

export const SetAFSK = ({ Bits, SampleRate }: SetAFSKOptions): Int16Array => {
    const baud = 520.83;
    const markFreq = 2083.3;
    const spaceFreq = 1562.5;
    const amplitude = 0.6;
    const twoPi = Math.PI * 2;
    const result = [];
    let phase = 0;
    let frac = 0;
    for (let b = 0; b < Bits.length; b++) {
        const bit = Bits[b];
        const freq = bit ? markFreq : spaceFreq;
        const samplesPerBit = SampleRate / baud + frac;
        const n = Math.round(samplesPerBit);
        frac = samplesPerBit - n;
        const inc = twoPi * freq / SampleRate;
        for (let i = 0; i < n; i++) {
            result.push(Math.round(Math.sin(phase) * amplitude * 32767));
            phase += inc;
            if (phase > twoPi) phase -= twoPi;
        }
    }
    const fadeSamples = Math.floor(SampleRate * 0.002);
    for (let i = 0; i < fadeSamples; i++) {
        const gain = i / fadeSamples;
        result[i] = Math.round(result[i] * gain);
        result[result.length - 1 - i] = Math.round(result[result.length - 1 - i] * gain);
    }
    return Int16Array.from(result);
}

