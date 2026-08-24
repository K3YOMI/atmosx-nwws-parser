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


import { TypeSettings } from "Types/Settings"
import { Bootstrap } from "@Bootstrap"
import { SetWarning } from "@Utilities/SetWarning"
import { ImportShapefiles } from "@Database/ImportShapefiles"
import { ImportBroadcastify } from "@Database/ImportBroadcastify"
import { existsSync, writeFileSync } from "fs"
import sqlite3 from "better-sqlite3"

export const InitializeDatabase = async (): Promise<void> => {
    const settings = Bootstrap.Settings as TypeSettings;
    try { 
        if (!existsSync(settings.Database)) { 
            writeFileSync(settings.Database, '')
            SetWarning({ Message: `Creating new database at ${settings.Database}` })
        }
        Bootstrap.Database = new sqlite3(settings.Database);
        Bootstrap.Database
            .prepare(`CREATE TABLE IF NOT EXISTS stanzas ( id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, issued TEXT, stanza TEXT )`)
            .run();
        Bootstrap.Database
            .prepare(`CREATE TABLE IF NOT EXISTS shapefiles (id TEXT PRIMARY KEY, location TEXT, geometry TEXT)`)
            .run();
        const isNeedingShapefiles = Bootstrap.Database
            .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='shapefiles';`)
            .get();
        const isNeedingBroadcastify = Bootstrap.Database
            .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='broadcastify';`)
            .get();

        if (!isNeedingShapefiles || !isNeedingBroadcastify) {
            SetWarning({Message: `Required database tables are currently building, please ${Bootstrap.Colors.Red}DO NOT${Bootstrap.Colors.Reset} close your terminal. The building will not finish and will remain incomplete. If you do mess up, you will need to delete ${settings.Database} and restart the application.` })
            await ImportBroadcastify();
            await ImportShapefiles();
            SetWarning({ Message: `Building has completed, you can now continue or close the terminal`})
        }
    } catch (error) {
        SetWarning({ Message: `An error occurred while initializing the database: ${error.message}` })
    }
}