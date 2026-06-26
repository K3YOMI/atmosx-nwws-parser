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

import { bootstrap } from "../../bootstrap"
import { createHttp } from '../@utilities/utilities.createHttp'
import { setWarning } from "../@utilities/utilities.setWarning";

export const importBroadcastify = async (): Promise<void> => {
    const settings = bootstrap.settings;
    
    const isBroadcastifyImported = bootstrap.database
        .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='broadcastify';`)
        .get();


    if (!settings.BroadcastifySettings.BroadcastifyAttachments) { return }
    if (isBroadcastifyImported) { return } 

    const broadcastify = await createHttp({
        url: settings.BroadcastifySettings.BroadcastifyDatabase,
        timeout: 5000,
    });
    if (!broadcastify.error) {  
        bootstrap.database.prepare(`CREATE TABLE broadcastify ( state TEXT, county TEXT, feed TEXT, type TEXT, link TEXT);`)
            .run();
        const states = JSON.parse(broadcastify.message);
        const insert = bootstrap.database.prepare(`INSERT INTO broadcastify (state, county, feed, type, link) VALUES (?, ?, ?, ?, ?)`);
        const transaction = bootstrap.database.transaction((rows: any[]) => {
            for (const row of rows) {
                insert.run(row);
            }
        });
        const batch: any[] = [];
        for (const state of states) {
            setWarning({ message: `Importing ${state.counties.length} counties from ${state.state} for Broadcastify` });
            for (const county of state.counties) {
                const countyName = county.county;
                for (const feed of county.feeds) {
                    batch.push([
                        state.state,
                        countyName,
                        feed.name,
                        feed.type,
                        feed.link
                    ]);
                }
            }
        }
        transaction(batch);
    }
};