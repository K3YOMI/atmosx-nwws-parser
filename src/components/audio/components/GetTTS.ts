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

import { platform } from "os"
import { writeFileSync, unlinkSync} from "fs"
import { execSync } from "child_process"


interface GetTTSOptions {
    Text: string
    OutputPath: string
}

export const GetTTS = async ({ Text, OutputPath }: GetTTSOptions): Promise<void> => {
    const vPlatform = platform();
    switch (vPlatform) {
        case 'win32': {
            try {
                const txtPath = OutputPath + ".txt";
                writeFileSync(txtPath, Text, "utf8");
                const command = [
                    "Add-Type -AssemblyName System.Speech;",
                    `$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer;`,
                    `$text = Get-Content -Raw -LiteralPath '${txtPath}';`,
                    `$speak.SetOutputToWaveFile('${OutputPath}');`,
                    `$speak.Speak($text);`,
                    `$speak.Dispose();`
                ].join(" ");
                execSync(`powershell -Command "${command}"`, { stdio: 'inherit' })
                try{ unlinkSync(txtPath) } catch {}
            } catch(error) {
                console.error('Error occurred while generating TTS:', error);
            }
            break;
        }
        case 'linux':
            try {
                execSync(`espeak -w "${OutputPath}" "${Text.replace(/"/g, '\\"')}"`);
            } catch {}
            break;
        default: break;
    }
};

