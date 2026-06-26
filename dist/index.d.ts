type TypeListener = {
    events: string[];
    webhook?: {
        enabled: boolean;
        destination: string;
        ratelimit: number;
        title: string;
        message: string;
    };
    uploads?: {
        file?: boolean;
        eas?: boolean;
        event?: boolean;
    };
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
    BroadcastifySettings: {
        BroadcastifyAttachments: boolean;
        BroadcastifyDatabase: string;
        BroadcastifyTags: string[];
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
        ListenerSettings?: TypeListener[];
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
        ArchiveSettings: {
            TTL: number;
            EventDirectory: string;
            TextDirectory: string;
            EasDirectory: string;
            EasToneout: string;
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
    locations_array: string[];
    description: string;
    attributes?: TypeAttributes;
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
    parameters?: {
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
    discussion_parameters?: {
        discussion_number: string;
        discussion_concerning: string;
        discussion_max_tornado: string;
        discussion_max_hail: string;
        discussion_max_wind: string;
        discussion_watch_issuance: string;
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
            vtec?: TypePVTEC | null;
            hvtec?: TypeHVTEC[] | null;
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
            attachments?: {
                name: string;
                link: string;
            }[];
            raw: string;
        };
    } & TypeEventProperties;
};

interface GetGeometryResponse {
    type: `Polygon` | `MultiPolygon`;
    coordinates: any[];
}
declare const getEventGeometry: (event: TypeEvent) => Promise<GetGeometryResponse>;

declare const getCleanedEvent: <T extends Record<string, any>>(event: T) => T;

declare const startService: (configurations: TypeSettings) => Promise<void>;

declare const stopService: () => Promise<void>;

interface GenerateEASOptions {
    message: string;
    header: string;
    title: string;
}
declare const setEasTone: (options: GenerateEASOptions) => Promise<string>;

interface GetNodeOptions {
    identifier: string;
    delete?: boolean;
    coordinates: {
        longitude: number;
        latitude: number;
    };
}
declare const setNode: (options: GetNodeOptions) => void;

declare const getEvents: () => any;

declare const getNodes: () => any;

interface CreateEventOptions {
    event: string;
    status: string;
    issued: Date;
    expires: Date;
    locations: string;
    description: string;
    coordinates: number[][];
}
declare const createEvent: (options: CreateEventOptions) => void;

declare const getRandomEvent: () => any;

type TypeStanza = {
    getChild(arg0: string): unknown;
    is(arg0: string): unknown;
    name: string;
    parent: TypeStanza | null;
    children: any;
    attrs: {
        xmlns: string;
        id: string;
        issue: string;
        ttaaii: string;
        cccc: string;
        awipsid: string;
        from: string;
        to: string;
        type: string;
    };
};

interface QueryOptions {
    search: string;
    max?: number;
}
declare const query: (options: QueryOptions) => Promise<TypeStanza[]>;

declare const clearEvents: () => void;

declare class Manager {
    constructor(settings: TypeSettings);
    on(event: string, callback: () => void): void;
    trycatch(): void;
}

export { Manager, type TypeEvent, clearEvents, createEvent, Manager as default, getCleanedEvent, getEventGeometry, getEvents, getNodes, getRandomEvent, query, setEasTone, setNode, setSettings, startService, stopService };
