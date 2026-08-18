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

interface getWavPCM16Response { 
    Samples: Int16Array
    SampleRate: number
    Channels: number
    BitsPerSample: number
}

export const GetWavPCM16 = (buffer: Buffer): getWavPCM16Response => {
    if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WAVE") { return null; }
    let fmt = null;
    let data = null;
    let i = 12;
    while (i + 8 <= buffer.length) {
        const id = buffer.toString("ascii", i, i + 4);
        const size = buffer.readUInt32LE(i + 4);
        const start = i + 8;
        const end = start + size;
        if (id === "fmt ") fmt = buffer.slice(start, end);
        if (id === "data") data = buffer.slice(start, end);
        i = end + (size % 2); 
    }
    if (!fmt || !data) return null;
    const audioFormat = fmt.readUInt16LE(0);
    const channels = fmt.readUInt16LE(2);
    const sampleRate = fmt.readUInt32LE(4);
    const bitsPerSample = fmt.readUInt16LE(14);
    if (audioFormat !== 1 || bitsPerSample !== 16 || channels !== 1) { return null; }
    const samples = new Int16Array(data.buffer, data.byteOffset, data.length / 2);
    return { Samples: new Int16Array(samples), SampleRate: sampleRate, Channels: channels, BitsPerSample: bitsPerSample };
}


