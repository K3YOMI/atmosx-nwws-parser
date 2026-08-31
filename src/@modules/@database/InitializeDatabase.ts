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
import { ImportBoundaries } from "@Database/ImportBoundaries"
import { CreateQuery } from "@Database/CreateQuery"
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
        CreateQuery({ Query: `CREATE TABLE IF NOT EXISTS stanzas ( id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, issued TEXT, stanza TEXT )` })
        const isNeedingShapefiles = CreateQuery({ Query: `SELECT name FROM sqlite_master WHERE type='table' AND name='shapefiles';` }) as { name: string }[];
        const isNeedingBroadcastify = CreateQuery({ Query: `SELECT name FROM sqlite_master WHERE type='table' AND name='broadcastify';` }) as { name: string }[];
        const isNeedingBoundaries = CreateQuery({ Query: `SELECT name FROM sqlite_master WHERE type='table' AND name='boundaries';` }) as { name: string }[];

        if (isNeedingShapefiles.length === 0 || isNeedingBroadcastify.length === 0 || isNeedingBoundaries.length === 0) {
            CreateQuery({ Query: `CREATE TABLE IF NOT EXISTS broadcastify ( state TEXT, county TEXT, feed TEXT, type TEXT, link TEXT)` })
            CreateQuery({ Query: `CREATE TABLE IF NOT EXISTS shapefiles ( id, location TEXT, source TEXT, geometry TEXT )` })
            CreateQuery({ Query: `CREATE INDEX IF NOT EXISTS idx_shapefiles_id ON shapefiles (id)` })
            CreateQuery({ Query: `CREATE TABLE IF NOT EXISTS boundaries (id TEXT PRIMARY KEY, type TEXT NOT NULL, state TEXT, name TEXT, geometry TEXT NOT NULL );` })
            SetWarning({Message: `Required database tables are currently building, please ${Bootstrap.Colors.Red}DO NOT${Bootstrap.Colors.Reset} close your terminal. The building will not finish and will remain incomplete. If you do mess up, you will need to delete ${settings.Database} and restart the application.` })
            if (isNeedingBroadcastify.length === 0) {
                await ImportBroadcastify();
            }
            if (isNeedingBoundaries.length === 0) {
                await ImportBoundaries();
            }
            if (isNeedingShapefiles.length === 0) {
                await ImportShapefiles();
            }
            SetWarning({ Message: `Database initialization complete. You may now close your terminal or continue using the application.` })
        }
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        SetWarning({ Message: `An error occurred while initializing the database: ${message}` })
    }
}