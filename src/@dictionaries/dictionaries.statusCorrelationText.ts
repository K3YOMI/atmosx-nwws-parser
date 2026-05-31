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

type TypeCorrelations = {
    type: string
    name: string
    isCancel: boolean
    isUpdate: boolean
    isIssued: boolean
}

export const statusCorrelationText: TypeCorrelations[] = [
    {type: "Update", name: "Updated", isCancel: false, isUpdate: true, isIssued: false},
    {type: "Cancel", name: "Cancelled", isCancel: true, isUpdate: false, isIssued: false},
    {type: "Alert", name: "Issued", isCancel: false, isUpdate: false, isIssued: true},
    {type: "Updated", name: "Updated", isCancel: false, isUpdate: true, isIssued: false},
    {type: "Expired", name: "Expired", isCancel: true, isUpdate: false, isIssued: false},
    {type: "Issued", name: "Issued", isCancel: false, isUpdate: false, isIssued: true},
    {type: "Extended", name: "Extended", isCancel: false, isUpdate: true, isIssued: false},
    {type: "Correction", name: "Correction", isCancel: false, isUpdate: true, isIssued: false},
    {type: "Upgraded", name: "Upgraded", isCancel: false, isUpdate: true, isIssued: false},
    {type: "Cancelled", name: "Cancelled", isCancel: true, isUpdate: false, isIssued: false},
    {type: "Routine", name: "Routine", isCancel: false, isUpdate: true, isIssued: false},
]
