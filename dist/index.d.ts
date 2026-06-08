type TypeWebhook = {
    webhook: string;
    title: string;
    message: string;
    rate: number;
    events: string[];
};

type TypeSettings = {
    Database: string;
    EnableWireService: boolean;
    EnableJournal: boolean;
    NOAAWeatherWireServiceSettings: {
        ReconnectionSettings: {
            Enabled: boolean;
            ReconnectionInterval: number;
        };
        CredentialSettings: {
            Username: string | void;
            Password: string | void;
            Nickname: string | void;
        };
        CacheSettings: {
            Enabled: boolean;
            MaxDatabaseHistory: number;
            MaxRetentionHistory: number;
        };
        StanzaSettings: {
            DisableUGC: boolean;
            DisableVTEC: boolean;
            DisableText: boolean;
        };
    };
    NationalWeatherServiceSettings: {
        CallbackInterval: number;
        EventsEndpoint: string;
    };
    GlobalSettings: {
        EventManagement: boolean;
        BetterEventNames: boolean;
        DisableGeometryParsing: boolean;
        UseShapefileCoordinates: boolean;
        SPCWatchesOnly: boolean;
        ShapefileSkipPoints: number;
        NodeTTL: number;
        NodeMinDistance: number;
        WebhookSettings?: TypeWebhook;
        EventFiltering: {
            ListeningEvents: string[];
            ListeningICAO: string[];
            ListeningUGC: string[];
            ListeningStates: string[];
            IgnoredICAO: string[];
            IgnoredEvents: string[];
            NodeLocationFiltering: boolean;
            IgnoreTestProducts: boolean;
        };
        EASSettings: {
            ArchiveDirectory: string;
            IntroWavFile: string;
        };
    };
};

declare const setSettings: (newSettings: TypeSettings) => TypeSettings;

type TypeAttributes = {
    xmlns: string;
    id: string;
    issue: string;
    ttaaii: string;
    cccc: string;
    awipsid: string;
};

type TypeEventProperties = {
    locations: string;
    description: string;
    attributes: TypeAttributes;
    geocode: {
        office: {
            name: string;
            office: string;
        };
        organization: string;
        ugc: string[];
        polygon: string;
        polygon_generated: boolean;
    };
    parameters: {
        tags: string[];
        instructions: string;
        source: string;
        hazards: string;
        impacts: string;
        estimated_hail_size: string;
        estimated_wind_gusts: string;
        damage_threat: string;
        tornado_threat: string;
        flood_threat: string;
        wind_threat: string;
        hail_threat: string;
        max_hail_inches?: string;
        max_wind_gusts_surface_knots?: string;
        max_tops_x100feet?: string;
        mean_storm_motion_vector?: string;
        particularly_dangerous_situation?: string;
    };
    watch_parameters?: {
        watch_number: string;
        watch_type: string;
        additional_tornadoes_probability: string;
        strong_tornadoes_probability: string;
        severe_wind_probability: string;
        severe_hail_probability: string;
        hail_2in_probability: string;
        combined_hail_wind_probability: string;
        max_hail_in: string;
        max_wind_surface: string;
        max_tops_x100feet: string;
        pds_watch: boolean;
    };
    spc_parameters: {
        spc_max_tornado: string;
        spc_max_hail: string;
        spc_max_wind: string;
        spc_watch_issuance: string;
    };
};

type TypeHVTEC = {
    hvtec: string;
    severity: string;
    cause: string;
    record: string;
};

type TypePVTEC = {
    vtec: string;
    product: string;
    tracking: string;
    event: string;
    status: string;
    organization: string;
    expires: string;
    is_watch: boolean;
    prediction_center: boolean;
};

type TypeEvent = {
    type: string;
    geometry: {
        type: string;
        coordinates: number[][];
    };
    properties: {
        event: string;
        parent: string;
        status: string;
        issued: string;
        expires: string;
        status_metadata?: {
            is_issued?: boolean;
            is_updated?: boolean;
            is_expired?: boolean;
            is_test?: boolean;
            is_statement?: boolean;
        };
        metadata: {
            ms: number;
            source: string;
            tracking: string;
            hash?: string;
            header: string;
            vtec: TypePVTEC | null;
            hvtec: TypeHVTEC[];
            nodes?: {
                id?: string | number;
                coordinates: [number, number];
                nearest: [number, number];
                miles: number | null;
                kilometers: number | null;
                proximity: boolean;
            }[];
            filtered_proximity?: boolean;
            updated?: number;
            history: {
                description: string;
                issued: string;
                status: string;
            }[];
        };
    } & TypeEventProperties;
};

interface GetGeometryResponse {
    type: `Polygon` | `MultiPolygon`;
    coordinates: any[];
}
declare const getEventGeometry: (event: TypeEvent) => Promise<GetGeometryResponse>;

declare const getCleanedEvent: <T extends Record<string, any>>(event: T) => T;

declare const startService: (settings: TypeSettings) => Promise<void>;

declare const stopService: () => Promise<void>;

interface GenerateEASOptions {
    message: string;
    header: string;
}
declare const setEasTone: (options: GenerateEASOptions) => Promise<string>;

interface GetAddChaserOptions {
    identifier: string;
    delete?: boolean;
    coordinates: {
        longitude: number;
        latitude: number;
    };
}
declare const setNode: (options: GetAddChaserOptions) => void;

declare const getEvents: () => any;

declare const getNodes: () => any;

declare const getRandomEvent: () => any;

declare const clearEvents: () => void;

declare class Manager {
    constructor(settings: TypeSettings);
    on(event: string, callback: () => void): void;
    trycatch(): void;
}

export { Manager, type TypeEvent, clearEvents, Manager as default, getCleanedEvent, getEventGeometry, getEvents, getNodes, getRandomEvent, setEasTone, setNode, setSettings, startService, stopService };
