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

import fs from 'fs'
import sqlite3 from 'better-sqlite3'
import { TypeSettings } from "../../@types/type.settings"
import { bootstrap } from "../../bootstrap"
import { setWarning } from '../@utilities/utilities.setWarning'
import { importShapefiles } from './database.shapefiles'

export const initializeDatabase = async (): Promise<void> => {
    const settings = bootstrap.settings as TypeSettings;
    try { 
        if (!fs.existsSync(settings.Database)) { 
            fs.writeFileSync(settings.Database, '')
            setWarning({ message: `Creating new database at ${settings.Database}` })
        }
        bootstrap.database = new sqlite3(settings.Database);
        bootstrap.database
            .prepare(`CREATE TABLE IF NOT EXISTS stanzas ( id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, issued TEXT, stanza TEXT )`)
            .run();
        bootstrap.database
            .prepare(`CREATE TABLE IF NOT EXISTS shapefiles (id TEXT PRIMARY KEY, location TEXT, geometry TEXT)`)
            .run();
        await importShapefiles();
    } catch (error) {
        setWarning({ message: `An error occurred while initializing the database: ${error.message}` })
    }
}