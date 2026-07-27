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

import { platform } from 'os'
import { writeFileSync } from "fs"
import { execSync } from 'child_process'

export const GetTTS = async (text: string, outputPath: string): Promise<void> => {
    const vPlatform = platform();
    switch (vPlatform) {
        case 'win32': {
            try {
                const txtPath = outputPath + ".txt";
                writeFileSync(txtPath, text, "utf8");
                const command = [
                    "Add-Type -AssemblyName System.Speech;",
                    `$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer;`,
                    `$text = Get-Content -Raw -LiteralPath '${txtPath}';`,
                    `$speak.SetOutputToWaveFile('${outputPath}');`,
                    `$speak.Speak($text);`,
                    `$speak.Dispose();`
                ].join(" ");
                execSync(`powershell -Command "${command}"`, { stdio: 'inherit' })
            } catch(error) {
                console.error('Error occurred while generating TTS:', error);
            }
            break;
        }
        case 'linux':
            try {
                execSync(`espeak -w "${outputPath}" "${text.replace(/"/g, '\\"')}"`);
            } catch {}
            break;
        default: break;
    }
};

