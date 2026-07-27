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

export const GetPCM16 = (samples: Record<string, number>[], sampleRate: number): Buffer => {
    let o = 0;
    const bytesPerSample = 2;
    const blockAlign = 1 * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const subchunk2Size = samples.length * bytesPerSample;
    const chunkSize = 36 + subchunk2Size;
    const buffer = Buffer.alloc(44 + subchunk2Size);
 
    buffer.write("RIFF", o); o += 4;
    buffer.writeUInt32LE(chunkSize, o); o += 4;
    buffer.write("WAVE", o); o += 4;

    buffer.write("fmt ", o); o += 4;
    buffer.writeUInt32LE(16, o); o += 4;                 
    buffer.writeUInt16LE(1, o); o += 2;                  
    buffer.writeUInt16LE(1, o); o += 2;
    buffer.writeUInt32LE(sampleRate, o); o += 4;
    buffer.writeUInt32LE(byteRate, o); o += 4;
    buffer.writeUInt16LE(blockAlign, o); o += 2;
    buffer.writeUInt16LE(16, o); o += 2;

    buffer.write("data", o); o += 4;
    buffer.writeUInt32LE(subchunk2Size, o); o += 4;

    for (let i = 0; i < samples.length; i++, o += 2) {
        buffer.writeInt16LE(samples[i].value, o);
    }
    return buffer;
}


