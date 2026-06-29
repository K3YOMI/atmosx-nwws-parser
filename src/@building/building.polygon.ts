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

import { TypeEvent } from "../@types/type.event"
import { bootstrap } from "../bootstrap"
import { getEventGeometry } from "./building.geometry"
import { getShapeNearestPoint } from "../@modules/@utilities/utilities.getShapeNearestPoint"

interface GetEventNodesResponse { 
    nodes: {
        id?: string | number
        coordinates: [number, number]
        nearest: [number, number]
        miles: number | null
        kilometers: number | null
        proximity: boolean
    }[]
    filtered: boolean
    updated: number
}

export const getEventNodes = async (event: TypeEvent): Promise<GetEventNodesResponse> => {
    const metadata = { nodes: [], proximity: false, filtered: false }
    const geometry = await getEventGeometry(event);
    if (!geometry || !geometry.coordinates) {
        return { nodes: [], filtered: false, updated: Date.now() }
    }
    const nodes = bootstrap.cache.nodes.features;
    for (const node of nodes) {
        const [longitude, latitude] = node.geometry.coordinates;
        const getPoint = getShapeNearestPoint(geometry.coordinates, [longitude, latitude])
        const miles = getPoint.distance ?? null;
        const kilometers = Number((miles * 1.609344).toFixed(3));

        const info = {
            id: node.properties?.identifier,
            coordinates: [longitude, latitude],
            nearest: getPoint.point,
            miles,
            kilometers,
            proximity: getPoint.proximity
        }
        metadata.nodes.push(info)
        if (bootstrap.settings.GlobalSettings.EventFiltering.NodeLocationFiltering && miles < bootstrap.settings.GlobalSettings.NodeMinDistance) {
            metadata.proximity = true;
            info.proximity = true;
        }
    }
    return {
        nodes: metadata.nodes,
        filtered: metadata.proximity,
        updated: Date.now()
    }
}