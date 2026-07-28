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

import { TypeSettings } from "../../@types/Settings";
import { bootstrap } from "../../bootstrap";
import { SetWarning } from "../@utilities/SetWarning";
import { GetWavPCM16 } from "./GetWavPCM16";
import { GetSampledPCM16 } from "./GetSampledPCM16";
import { SetRadioEffect } from "./SetRadioEffect";
import { SetSameHeader } from "./SetSameHeader";
import { SetAttentionTone } from "./SetAttentionTone";
import { GetMergedPCM16 } from "./GetMergedPCM16";
import { SetNoise } from "./SetNoise";
import { GetPCM16 } from "./GetPCM16";
import { GetTTS } from "./GetTTS";
import { GetCleanDescription } from "./GetCleanDescription";
import { SetDebug } from "../@utilities/SetDebug";
import { join } from 'path'
import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from 'fs'
import { execSync } from 'child_process'
import { platform } from 'os'


interface GenerateEASMessageOptions { 
    message: string
    header: string
    title: string
}

export const GenerateEASMessage = async (options: GenerateEASMessageOptions): Promise<string> => {
    const tick = performance.now()
    const settings = bootstrap.settings as TypeSettings;
    const directory = settings.GlobalSettings.ArchiveSettings.EasDirectory;
    const prefix = settings.GlobalSettings.ArchiveSettings.EasToneout;
    let message = options.message;
    let header = options.header;
    let title = (options.title ?? `${Math.random().toString(36).substring(2, 15)}-${header.replace(/[^a-zA-Z0-9]/g, '')}`).replace(/[\\:*?"<>|]/g, "_").replace(/\s+/g, " ").trim();
    if (!message || !header) {
        SetWarning({
            title: `EAS`,
            message: `Message and header are required to generate an EAS tone.`
        })
        return null;
    }
    let buffTTS: Buffer;
    let buffRadio: any;
    let buffFull: any[] = [];

    if (!existsSync(directory)) {
        mkdirSync(directory, { recursive: true });
    }
    const tmpTTS = join(directory, `/${title}-tts.wav`)
    const outTTS = join(directory, `/${title}.wav`)
    const vPlatform = platform();

    if (vPlatform === 'darwin') {
        SetWarning({
            title: `EAS`,
            message: `EAS tone generation is not supported on macOS.`
        });
        return null
    }


    await new Promise<void>((resolve, reject) => {
        const tMsg = GetCleanDescription(message)
        GetTTS(tMsg, tmpTTS).then(() => {
            resolve();
        });
    });
    if (!existsSync(tmpTTS)) {
        return null;
    }
    buffTTS = readFileSync(tmpTTS);
    const vWav = GetWavPCM16(buffTTS);
    const vSamples = GetSampledPCM16(vWav.samples, vWav.sampleRate, 8000)
    const vRadio = SetRadioEffect(vSamples, 8000)

    if (existsSync(prefix)) {
        let tBuffer = readFileSync(prefix);
        let tWav = GetWavPCM16(tBuffer);

        if (tWav == null) {
            try {
                const converted = join(directory, `/${title}-tts-fixed.wav`)
                execSync(`ffmpeg -y -i "${prefix}" -ar 8000 -ac 1 -sample_fmt s16 "${converted}"`, { stdio: 'ignore' })
                if (existsSync(converted)) {
                    tBuffer = readFileSync(converted)
                    tWav = GetWavPCM16(tBuffer)
                    try { unlinkSync(converted) } catch {}
                }
            } catch (e) {}
        }

        if (tWav == null) {
            SetWarning({ title: `EAS`, message: `Intro tone isn't a valid .WAV file or isn't in PCM 16-bit format. Converted attempt failed; please convert it then try again.` })
            return null;
        }

        const tSamples = (tWav.sampleRate != 8000 ? GetSampledPCM16(tWav.samples, tWav.sampleRate, 8000) : tWav.samples)
        buffRadio = SetRadioEffect(tSamples, 8000)
    }

    buffFull = buffRadio != null ? [buffRadio, new Int16Array(Math.floor(0.5 * 8000))] : [];
    buffFull.push(
        SetSameHeader(header, 3, 8000, {
            preMarkSec: 1.1,
            gapSec: 0.5,
        }),
        new Int16Array(Math.floor(0.5 * 8000)),
        SetAttentionTone(8, 8000),
        new Int16Array(Math.floor(0.5 * 8000)),
        vRadio
    )
    for (let i = 0; i < 3; i++) {
        buffFull.push(SetSameHeader(header, 1, 8000, { preMarkSec: 0.5, gapSec: 0.1 }))
        buffFull.push(new Int16Array(Math.floor(0.5 * 8000)));
    }
    const aSamples = GetMergedPCM16(buffFull);
    const aFinal = SetNoise(aSamples, 0.002);
    const aBuffer = GetPCM16(Array.from(aFinal).map(v => ({ value: v })), 8000);
    writeFileSync(outTTS, aBuffer)
    try{ unlinkSync(tmpTTS) } catch {}
    SetDebug({ title: `GenerateEASMessage`, message: `${Math.round(performance.now() - tick)}ms` })
    return outTTS;
}


