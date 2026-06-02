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

export type TypeSettings = {
    Database: string
    EnableWireService: boolean
    EnableJournal: boolean
    NOAAWeatherWireServiceSettings: {
        ReconnectionSettings: {
            Enabled: boolean
            ReconnectionInterval: number
        }
        CredentialSettings: {
            Username: string | void
            Password: string | void
            Nickname: string | void
        }
        CacheSettings: {
            Enabled: boolean
            MaxDatabaseHistory: number
            MaxRetentionHistory: number
        }
        StanzaSettings: {
            DisableUGC: boolean
            DisableVTEC: boolean
            DisableText: boolean
        }
    }
    NationalWeatherServiceSettings: {
        CallbackInterval: number
        EventsEndpoint: string
    }
    GlobalSettings: {
        BetterEventNames: boolean
        DisableGeometryParsing: boolean
        UseShapefileCoordinates: boolean
        ShapefileSkipPoints: number
        EventFiltering: {
            ListeningEvents: string[]
            ListeningICAO: string[]
            IgnoredICAO: string[]
            IgnoredEvents: string[]
            ListeningUGC: string[]
            ListeningStates: string[]
            IgnoreTestProducts: boolean
        },
        EASSettings: {
            ArchiveDirectory: string | void,
            IntroWavFile: string | void,
        }
    }
}