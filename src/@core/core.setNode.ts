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

import { bootstrap } from "../bootstrap";
import { setWarning } from "../@modules/@utilities/utilities.setWarning"
import { setEventEmit } from "../@modules/@utilities/utilities.setEventEmit";

interface GetAddChaserOptions {
    identifier: string
    delete?: boolean
    coordinates: { longitude: number; latitude: number }
}

export const setNode = (options: GetAddChaserOptions) => {
    const nodes = bootstrap.cache.nodes.features;
    const exists = nodes.find((node) => node.properties.identifier === options.identifier);
    if (options.delete) {
        if (exists) {
            const index = nodes.indexOf(exists);
            nodes.splice(index, 1);
            return setEventEmit({
                event: `onNodeDelete`,
                metadata: {
                    type: `node-delete`,
                    node: exists
                }
            })
        }
        return setWarning({ message: `Node with identifier '${options.identifier}' not found.` })
    }
    if (exists) {
        const index = nodes.indexOf(exists);
        nodes[index] = {
            ...exists,
            geometry: {
                type: "Point",
                coordinates: [options.coordinates.longitude, options.coordinates.latitude]
            }
        };
        return setEventEmit({
            event: `onNodeUpdate`,
            metadata: {
                type: `node-update`,
                node: nodes[index]
            }
        })
    }
    nodes.push({
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [options.coordinates.longitude, options.coordinates.latitude]
        },
        properties: {
            identifier: options.identifier
        }
    });
    return setEventEmit({
        event: `onNodeAdd`,
        metadata: {
            type: `node-add`,
            node: nodes[nodes.length - 1]
        }
    })
}