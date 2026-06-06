/*
              _                             _               _     __   __
         /\  | |                           | |             (_)    \ \ / /
        /  \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ _  ___ \ V / 
       / /\ \| __| '_ ` _ \ / _ \/ __| '_ \| '_ \ / _ \ '__| |/ __| > <  
      / ____ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ |  | | (__ / . \ 
     /_/    \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  |_|\___/_/ \_\
                                     | |                            
                                     |_|                                                                                                                

    Created with ♥ by the AtmosphericX Team (KiyoWx, StarflightWx, Everwatch1, & CJ Ziegler)
    Discord: https://atmosphericx-discord.scriptkitty.cafe
    Ko-Fi: https://ko-fi.com/k3yomi
    Documentation: http://localhost/documentation | https://atmosphericx.scriptkitty.cafe/documentation

    Internal Package: @atmosx/event-product-parser

*/

import fs from 'fs'
import { resolve, extname} from 'path'
import { loadAsync } from 'jszip'
import { read } from 'shapefile'
import { TypeSettings } from "../../@types/types.settings"
import { bootstrap } from "../../bootstrap"
import { setSleep } from '../@utilities/utilities.setSleep'
import { setWarning } from '../@utilities/utilities.setWarning'
import { shapefileLinks } from '../../@dictionaries/dictionaries.shapefileLinks'

export const importShapefiles = async (): Promise<void> => {
    const settings = bootstrap.settings as TypeSettings;
    try { 
        const tShapefiles = bootstrap.database
            .prepare(`SELECT COUNT(*) AS count FROM shapefiles`)
            .get().count;
        if (tShapefiles === 0) {
            await setSleep({timeout: 1e3});
            setWarning({ message: `Shapefiles are currently building, please DO NOT close your terminal. The shapefiles will not finish and will remain incomplete. If you do mess up, you will need to delete ${settings.Database} and restart the application.` })
            for (const shapefile of shapefileLinks) {
                const response = await fetch(shapefile.link);
                const arrayBuff = await response.arrayBuffer();
                const content = await loadAsync(arrayBuff);
                const directory = resolve(__dirname, `../../shapefiles`);
                if (!fs.existsSync(directory)) {
                    fs.mkdirSync(directory, { recursive: true });
                }
                for (const file of Object.keys(content.files)) {
                    if (file.endsWith('.shp') || file.endsWith('.dbf')) {
                        const data = await content.files[file].async(`nodebuffer`)
                        const output = resolve(directory, `${shapefile?.name ?? ``}_${shapefile?.id ?? ``}${extname(file)}`)
                        fs.writeFileSync(output, data)
                    }
                }
                const filepath = resolve(__dirname, '../../shapefiles', shapefile.name + '_' + shapefile.id)
                const { features } = await read(
                    filepath,
                    filepath,
                );
                setWarning({ message: `Importing ${features.length} features from ${shapefile.name}_${shapefile.id}` })
                const insert = bootstrap.database
                    .prepare(`INSERT OR REPLACE INTO shapefiles (id, location, geometry) VALUES (?, ?, ?)`)
                const transaction = bootstrap.database.transaction((entries: any[]) => {
                    for (const entry of entries) {
                        const { properties, geometry } = entry;
                        let final: string, location: string;
                        if (properties.FIPS) {
                            final = `${properties.STATE}${shapefile.id}${properties.FIPS.substring(2)}`;
                            location = `${properties.COUNTYNAME}, ${properties.STATE}`;
                        }
                        else if (properties.FULLSTAID) {
                            final = `${properties.ST}${shapefile.id}${properties.WFO}`;
                            location = `${properties.CITY}, ${properties.STATE}`;
                        }
                        else if (properties.STATE) {
                            final = `${properties.STATE}${shapefile.id}${properties.ZONE ?? properties.SITE_ID}`;
                            location = `${properties.NAME ?? `${properties.RFC_NAME} ${properties.RFC_CITY}`}, ${properties.STATE}`;
                        }
                        else {
                            final = properties.ID ?? properties.WFO
                            location = properties.NAME;
                        }
                        insert.run(final, location, JSON.stringify(geometry));
                    }
                })
                fs.unlinkSync(`${filepath}.shp`)
                fs.unlinkSync(`${filepath}.dbf`)
                setWarning({ message: `Cleaned up temporary files for ${shapefile.name}_${shapefile.id}` })
                transaction(features)
            }
            setWarning({ message: `Shapefiles have finished compiling, you can now continue and close this terminal` })
            fs.rm(resolve(__dirname, '../../shapefiles'), { recursive: true, force: true }, () => {});
        }
    } catch (error) {
        setWarning( {message: `An error occurred while compiling shapefiles: ${error.message}` }) 
    }
}