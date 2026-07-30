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


import { TypeSettings } from "types/Settings"
import { bootstrap } from "@bootstrap"
import { SetWarning } from "@utilities/SetWarning"
import { ImportShapefiles } from "@database/ImportShapefiles"
import { ImportBroadcastify } from "@database/ImportBroadcastify"
import { existsSync, writeFileSync } from "fs"
import sqlite3 from "better-sqlite3"

export const InitializeDatabase = async (): Promise<void> => {
    const settings = bootstrap.settings as TypeSettings;
    try { 
        if (!existsSync(settings.Database)) { 
            writeFileSync(settings.Database, '')
            SetWarning({ message: `Creating new database at ${settings.Database}` })
        }
        bootstrap.database = new sqlite3(settings.Database);
        bootstrap.database
            .prepare(`CREATE TABLE IF NOT EXISTS stanzas ( id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, issued TEXT, stanza TEXT )`)
            .run();
        bootstrap.database
            .prepare(`CREATE TABLE IF NOT EXISTS shapefiles (id TEXT PRIMARY KEY, location TEXT, geometry TEXT)`)
            .run();
        const isNeedingShapefiles = bootstrap.database
            .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='shapefiles';`)
            .get();
        const isNeedingBroadcastify = bootstrap.database
            .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='broadcastify';`)
            .get();

        if (!isNeedingShapefiles || !isNeedingBroadcastify) {
            SetWarning({message: `Required database tables are currently building, please ${bootstrap.ansi_colors.RED}DO NOT${bootstrap.ansi_colors.RESET} close your terminal. The building will not finish and will remain incomplete. If you do mess up, you will need to delete ${settings.Database} and restart the application.` })
            await ImportBroadcastify();
            await ImportShapefiles();
            SetWarning({ message: `Building has completed, you can now continue or close the terminal`})
        }
    } catch (error) {
        SetWarning({ message: `An error occurred while initializing the database: ${error.message}` })
    }
}