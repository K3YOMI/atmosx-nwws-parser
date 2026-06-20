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

import { TypeSettings } from "../../@types/types.settings";
import { bootstrap } from "../../bootstrap";
import { setWarning } from "../@utilities/utilities.setWarning";
import { getWavPCM16 } from "./eas.getWavPCM16";
import { getSampledPCM16 } from "./eas.getSampledPCM16";
import { setRadioEffect } from "./eas.setRadioEffect";
import { setSameHeader } from "./eas.setSameHeader";
import { setAttentionTone } from "./eas.setAttentionTone";
import { getMergedPCM16 } from "./eas.getMergedPCM16";
import { setNoise } from "./eas.setNoise";
import { getPCM16 } from "./eas.getPCM16";
import { getTTS } from "./eas.getTTS";
import { getCleanDescription } from "./eas.getCleanDescription";
import { join } from 'path'
import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync } from 'fs'
import { execSync } from 'child_process'
import { platform } from 'os'

interface GenerateEASOptions { 
    message: string
    header: string
}

export const setEasTone = async (options: GenerateEASOptions): Promise<string> => {
    const settings = bootstrap.settings as TypeSettings;
    const directory = settings.GlobalSettings.EASSettings.ArchiveDirectory;
    const prefix = settings.GlobalSettings.EASSettings.IntroWavFile;
    let message = options.message;
    let header = options.header;
    if (!message || !header) {
        setWarning({
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
    if (!existsSync(join(directory, `/temp`))) {
        mkdirSync(join(directory, `/temp`), { recursive: true });
    }
    if (!existsSync(join(directory, `/output`))) {
        mkdirSync(join(directory, `/output`), { recursive: true });
    }

    const tmpTTS = join(directory, `/temp/${Math.random().toString(36).substring(2, 15)}-${header.replace(/[^a-zA-Z0-9]/g, '')}.wav`)
    const outTTS = join(directory, `/output/${Math.random().toString(36).substring(2, 15)}-${header.replace(/[^a-zA-Z0-9]/g, '')}.wav`)
    const vPlatform = platform();

    if (vPlatform === 'darwin') {
        setWarning({
            title: `EAS`,
            message: `EAS tone generation is not supported on macOS.`
        });
        return null
    }


    await new Promise<void>((resolve, reject) => {
        const tMsg = getCleanDescription(message)
        getTTS(tMsg, tmpTTS).then(() => {
            buffTTS = readFileSync(tmpTTS);
            resolve();
        });
    });
    const vWav = getWavPCM16(buffTTS);
    const vSamples = getSampledPCM16(vWav.samples, vWav.sampleRate, 8000)
    const vRadio = setRadioEffect(vSamples, 8000)

    if (existsSync(prefix)) {
        let tBuffer = readFileSync(prefix);
        let tWav = getWavPCM16(tBuffer);

        if (tWav == null) {
            try {
                const converted = join(directory, `/temp/${Math.random().toString(36).substring(2, 15)}.converted.wav`)
                execSync(`ffmpeg -y -i "${prefix}" -ar 8000 -ac 1 -sample_fmt s16 "${converted}"`, { stdio: 'ignore' })
                if (existsSync(converted)) {
                    tBuffer = readFileSync(converted)
                    tWav = getWavPCM16(tBuffer)
                    try { unlinkSync(converted) } catch {}
                }
            } catch (e) {}
        }

        if (tWav == null) {
            setWarning({ title: `EAS`, message: `Intro tone isn't a valid .WAV file or isn't in PCM 16-bit format. Converted attempt failed; please convert it then try again.` })
            return null;
        }

        const tSamples = (tWav.sampleRate != 8000 ? getSampledPCM16(tWav.samples, tWav.sampleRate, 8000) : tWav.samples)
        buffRadio = setRadioEffect(tSamples, 8000)
    }

    buffFull = buffRadio != null ? [buffRadio, new Int16Array(Math.floor(0.5 * 8000))] : [];
    buffFull.push(
        setSameHeader(header, 3, 8000, {
            preMarkSec: 1.1,
            gapSec: 0.5,
        }),
        new Int16Array(Math.floor(0.5 * 8000)),
        setAttentionTone(8, 8000),
        new Int16Array(Math.floor(0.5 * 8000)),
        vRadio
    )
    for (let i = 0; i < 3; i++) {
        buffFull.push(setSameHeader(header, 1, 8000, { preMarkSec: 0.5, gapSec: 0.1 }))
        buffFull.push(new Int16Array(Math.floor(0.5 * 8000)));
    }
    const aSamples = getMergedPCM16(buffFull);
    const aFinal = setNoise(aSamples, 0.002);
    const aBuffer = getPCM16(Array.from(aFinal).map(v => ({ value: v })), 8000);
    writeFileSync(outTTS, aBuffer)
    try{ unlinkSync(tmpTTS) } catch {}
    return outTTS;
}


