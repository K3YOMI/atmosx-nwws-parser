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

import { TypeEvent } from "types-lower/Event"
import { Bootstrap } from "@bootstrap"
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
    const nodes = Bootstrap.Cache.Nodes.features;
    if (!nodes || nodes.length === 0) {
        return { nodes: [], filtered: false, updated: Date.now() };
    }
    const metadata = { nodes: [], proximity: false, filtered: false };
    const geometry = await GetEventGeometry(event);
    if (!geometry || !geometry.coordinates) {
        return { nodes: [], filtered: false, updated: Date.now() }
    }
    for (const node of nodes) {
        const [longitude, latitude] = node.geometry.coordinates;
        const getPoint = GetShapeNearestPoint({ Coordinates: geometry.coordinates, Point: [longitude, latitude] });
        const miles = getPoint.Distance ?? null;
        const kilometers = Number((miles * 1.609344).toFixed(3));

        const info = {
            id: node.properties?.identifier,
            coordinates: [longitude, latitude],
            nearest: getPoint.Point,
            miles,
            kilometers,
            proximity: false
        }
        if (miles != null && (miles < Bootstrap.Settings.GlobalSettings.NodeMaxDistance)) {
            info.proximity = true;
            metadata.proximity = true;
        }
        metadata.nodes.push(info)
    }
    return {
        nodes: metadata.nodes,
        filtered: metadata.proximity,
        updated: Date.now()
    }
}