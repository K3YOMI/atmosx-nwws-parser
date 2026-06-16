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

import { TypeStanza } from "../@types/types.stanza";
import { bootstrap } from "../bootstrap";

interface QueryOptions {
    search: string
    max?: number
}

type RowQuery = {
    rowid: number
    stanza: string
}

export const query = async (options: QueryOptions): Promise<TypeStanza[]> => {
    const get = await bootstrap.database.prepare(
        `SELECT * FROM stanzas WHERE stanza LIKE ? LIMIT ?`)
    .all(`%${options.search}%`, options.max ?? 100) as RowQuery[];
    const events = get.map((row) => JSON.parse(row.stanza));
    return events as TypeStanza[];
}