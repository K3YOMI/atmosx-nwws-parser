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

import { TypeEvent } from "types/Event"
import { bootstrap } from "@bootstrap"
import { GetEventGeometry } from "@building/GetEventGeometry"
import { GetShapeNearestPoint } from "@utilities/GetShapeNearestPoint"

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

export const GetEventNodes = async (event: TypeEvent): Promise<GetEventNodesResponse> => {
    const nodes = bootstrap.cache.nodes.features;
    if (!nodes || nodes.length === 0) {
        return { nodes: [], filtered: true, updated: Date.now() };
    }
    const metadata = { nodes: [], proximity: false, filtered: false };
    const geometry = await GetEventGeometry(event);
    if (!geometry || !geometry.coordinates) {
        return { nodes: [], filtered: false, updated: Date.now() }
    }
    for (const node of nodes) {
        const [longitude, latitude] = node.geometry.coordinates;
        const getPoint = GetShapeNearestPoint(geometry.coordinates, [longitude, latitude])
        const miles = getPoint.distance ?? null;
        const kilometers = Number((miles * 1.609344).toFixed(3));

        const info = {
            id: node.properties?.identifier,
            coordinates: [longitude, latitude],
            nearest: getPoint.point,
            miles,
            kilometers,
            proximity: false
        }
        metadata.nodes.push(info)
        if (miles != null && (bootstrap.settings.GlobalSettings.EventFiltering.NodeLocationFiltering) && (miles < bootstrap.settings.GlobalSettings.NodeMaxDistance)) {
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