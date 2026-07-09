# Project AtmosphericX - Event Product Parser (v3.0.0)

<div align="center">
	<div align="center" style="border: none;">
		<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/AtmosphericX/event-product-parser">
		<img alt="GitHub forks" src="https://img.shields.io/github/forks/AtmosphericX/event-product-parser">
		<img alt="GitHub issues" src="https://img.shields.io/github/issues/AtmosphericX/event-product-parser">
		<img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/AtmosphericX/event-product-parser">
	</div>
</div>

## What is `@atmosx/event-product-parser`
This repository contains the primary function to obtain, parse, cache, and deliver products and events from the National Weather Service. There are two primary sources to obtain these products. By default, the repository uses the **National Weather Service API**. However, there is **FULL** support for **NOAA Weather Wire Service (Open Interface)**. This parser is intended for developers who want to integrate real-time weather alerts, watches, warnings, and forecast data from the NWS seamlessly into their applications or services without having to use external APIs from other sources / parsers. If you wish to access data without programming, consider using our end user project, which leverages this parser and provides an easy-to-use interface for tracking weather alerts. See [Documentation](https://atmosphericx.scriptkitty.cafe).

## Installation (NPM)
```bash
npm install @atmosx/event-product-parser
```

## Configurations & Usage
```ts
const { Manager } = require(`@atmosx/event-product-parser`) // CJS Importing
import { Manager } from '@atmosx/event-product-parser' // EJS Importing

const Client = new Manager({
    Database: `event-product-parser.db`,
    EnableWireService: false,
    EnableJournal: true,
    EnableDebugging: false,
    NOAAWeatherWireServiceSettings: {
        ReconnectionSettings: {
            Enabled: true,
            ReconnectionInterval: 60,
        },
        CredentialSettings: {
            Username: `username`,
            Password: `password`,
            Nickname: "nickname (@atmosx/event-product-parser/3.0)",
        },   
        CacheSettings: {
            Enabled: true,
            MaxDatabaseHistory: 50000,
            MaxRetentionHistory: 1500,
        },
        StanzaSettings: {
            DisableUGC: false,
            DisableVTEC: false,
            DisableText: false,
        }
    },
    NationalWeatherServiceSettings: {
        CallbackInterval: 30,
        EventsEndpoint: `https://api.weather.gov/alerts/active`,
    },
    BroadcastifySettings: {
        BroadcastifyAttachments: true,
        BroadcastifyDatabase: `https://scriptkitty.cafe/ftp/@atmosphericx/assets/broadcastify.json`,
        BroadcastifyTags: [`Public Safety`, `Amateur Radio`, `Other`, `Rail`, `Aviation`, `Marine`, `Disaster Event`, `Special Event`]
    },
    NotifyServer: {
        Enabled: false,
        Server: "https://ntfy.scriptkitty.cafe",
        Attachments: "https://scriptkitty.cafe/ftp/@bucket/EAS/encoded",
        Credentials: {
            Username: "username",
            Password: "password"
        }
    },
    ListenerSettings: [
        {
            Events: ["*Extreme Heat Warning*"],
            NotificationServer: {
                Enabled: false,
                Topic: "heat-warnings",
                Priority: 5
            },
            Uploads: {
                EAS: true,
                File: true,
                JSON: true
            }
        }
    ],
    GlobalSettings: {
        EventManagement: true,
        BetterEventNames: true,
        DisableGeometryParsing: false,
        UseShapefileCoordinates: true,
        SPCWatchesOnly: true,
        ShapefileSkipPoints: 0,
        NodeTTL: 60,
        NodeMinDistance: 125,
        EventFiltering: {
            ListeningEvents: [
               "*Warning*"
            ],
            ListeningICAO: [],
            ListeningUGC: [],
            ListeningStates: [],
            IgnoredICAO: [],
            IgnoredEvents: [],
            NodeLocationFiltering: false,
            IgnoreTestProducts: true,
        },
        ArchiveSettings: {
            TTL: 30,
            EventDirectory: `@bucket/ParsedProducts`,
            TextDirectory: `@bucket/RawTextProducts`,
            EasDirectory: `@bucket/EAS`,
            EasToneout: `eas-toneout.wav`,
        }
    }
})
```

## How do custom listeners work?

Custom listeners are case insensitive rules used by `ListeningEvents`, `IgnoredEvents`, and ListenerSettings `events` to determine whether an input matches.

They support:
- Exact matches (e.g. `"Tornado Watch"`)
- Global wildcard (`"*"` matches everything)
- Partial wildcards (`*text*` matches anything containing that text)

Example rules:
```json
["*Severe Thunderstorm Warning*", "Tornado Watch", "*Flash Flood Warning*"]
```

Example Results:
- Considerable Severe Thunderstorm Warning: ✅
- Tornado Warning: ❌
- Severe Thunderstorm Warning (TPROB): ✅
- Flash Flood Emergency: ❌

## Events and Listeners

### Event `*`
Triggers for every event and product received by the parser. This is useful if you want to handle all events with a single listener.
```ts
Client.on(`*`, (data: any) => {
   	/*
		event: string
		data: object
	*/
})
```

### Event `onServiceStatus`
Triggers when an update to the XMPP / API service status occurs.
```ts
Client.on(`onServiceStatus`, (xmpp) => {
	/*
		message: string
		data: object
		type: string
		error: boolean
	*/
})
```

### Event `onTestProduct`
Triggers when a event is labeled as a **test message**. See [`types.event.ts`](./src/@types/type.event.ts) for properties.
```ts
Client.on(`onTestProduct`, (product: TypeEvent) => {})
```

### Event `onExpiredProduct`
Triggers when a event is cancelled, expired, or terminated. See [`types.event.ts`](./src/@types/type.event.ts) for properties.
```ts
Client.on(`onExpiredProduct`, (product: TypeEvent) => {})
```

### Event `onProductType`
Supports all events and product, simply append the event name to the end like `onProductTypeRadarIndicatedTornadoWarning` and you will receive the event in the listener.
**If the event has been filtered, it will not include attachments and coordinates.** See [`types.event.ts`](./src/@types/type.event.ts) for properties.

```ts
This listener returns [`types.event.ts`](./src/@types/type.event.ts).
```ts
Client.on(`onProductTypeRadarIndicatedTornadoWarning`, (product: TypeEvent) => {})
```

### Event `onFilteredEvent`, `onIgnoredEvent`, `onFilteredICAO`, `onIgnoredICAO`, `onFilteredUGC`, `onFilteredState`
These events all support [`types.event.ts`](./src/@types/type.event.ts) and are used to filter out events and products based on your settings.
```ts
Client.on(`onFilteredEvent`, (product: TypeEvent) => {})
```

### Event `onEventCache`
When all events in a batch have finished processing, a cache update will trigger allowing you to get a copy of all registered events in a listener. (**GeoJSON**)
```ts
Client.on(`onEventCache`, (cache) => {})
```

### Event `onNodeAdd`,  `onNodeUpdate`, `onNodeDelete`
Triggers when a tracking node gets added, updated, or deleted.
```ts
Client.on(`onNodeAdd`, (cache) => {
	/*
		type: string
		node: object
	*/
})
```

### Event `onStormPredictionWatch`, `onNonStormPredictionWatch`
Triggers when a SPC watch gets added, updated, or cancelled. This will also add a custom message if using jorunal or the `log` listener.
```ts
Client.on(`onProductTypeRadarIndicatedTornadoWarning`, (product: TypeEvent) => {})
```

### Event `onEventStatus`
Triggers when a single event gets added, updated, or cancelled. This will also add a custom message if using jorunal or the `log` listener.
```ts
Client.on(`onEventStatus`, (cache) => {
	/*
		type: string
		event: <TypeEvent>
	*/
})
```

### Event `debug`
Triggers when a debug message gets emitted, this can automatically be used without the listener by enabling `EnableDebugger`. This also includes the `parent` and the `function` names.
```ts
Client.on(`debug`, (debug) => {
	/*
		message: string
		parent: string
		function: string
	*/
})
```

### Function `setSettings`
Allows you to dynamically update parser settings without restarting the service.
```ts
import { setSettings } from "@atmosx/event-product-parser"
setSettings({
	Database: `NewDatabaseFile.db`
})
```

### Function `getEventGeometry`
Fetches the `events` geometry (GeoJSON) coordinates table.
```ts
import { getEventGeometry } from "@atmosx/event-product-parser"
const event = {...}
const geometry = await getEventGeometry(event); // Returns GeoJSON 
```

### Function `getRandomEvent`
Fetches a random event from the cache
```ts
import { getRandomEvent } from "@atmosx/event-product-parser"
const event = getRandomEvent(event); // Returns GeoJSON of an event.
```

### Function `getVersion`
Returns the current version of the parser.
```ts
import { getVersion } from "@atmosx/event-product-parser"
const version = getVersion(); // Returns the current version of the parser.
```


### Function `getCleanedEvent`
Removed any `NULL` values from the event itself. Therefore cleaning it up from any properties that are `NULL`.
```ts
import { getCleanedEvent } from "@atmosx/event-product-parser"
const event = {...}
const cleanedEvent = await getCleanedEvent(event); // Returns cleaned event object.
```


### Function `startService`
Starts the event product parser service.
```ts
import { startService } from "@atmosx/event-product-parser"
startService()
```


### Function `setNode`
Sets up a tracking node using an identifier, longitude, and latitude values.
```ts
import { setNode } from "@atmosx/event-product-parser"
setNode({
	identifier: `TestNode`, 
	coordinates: {longitude: -122.4194, latitude: 37.7749}, 
	delete: false
})
```


### Function `getEvents`
Fetches the list of events from the parser.
```ts
import { getEvents } from "@atmosx/event-product-parser"
const events = getEvents() // Returns in GeoJSON (Similar to the onEventCache listener)
console.log(events)
```

### Function `clearEvents`
Clears the event cache of all events.
```ts
import { clearEvents } from "@atmosx/event-product-parser"
clearEvents() // Clears the event cache of all events.
```

### Function `getNodes`
Fetches the list of tracking nodes from the parser.
```ts
import { getNodes } from "@atmosx/event-product-parser"
const nodes = getNodes()
console.log(nodes)
```

### Function `manualEvent`
Creates a new event in the parser.
```ts
import { manualEvent } from "@atmosx/event-product-parser"
manualEvent({
    message: `__DESCRIPTION__`,
    attributes: {
        "issue": new Date().toISOString(),
        "cccc": "KLOT",
        "awipsid": "TORLOT",
    }
})
```

### Function `query`
Queries the event cache (datbase) for specific events based on text.
```ts 
import { query } from "@atmosx/event-product-parser"
query({search: "Tornado Warning", limit: 3}).then(results => {
    console.log(results)
})
````

### Function `setEasTone`
Fetches an EAS audio message for an event (Simulated)
```ts
import { setEasTone } from "@atmosx/event-product-parser"
const event = {...}
await setEasTone({message: event.properties.description, header: event.properties.metadata.header, title: `eas_audio_message`})
```


## Types
[Event](./src/@types/type.event.ts) | 
[Properties](./src/@types/type.properties.ts)  |
[HVTec](./src/@types/type.hvtec.ts) |
[PVTec](./src/@types/type.pvtec.ts) |\
[UGC](./src/@types/type.ugc.ts) |
[Stanzas](./src/@types/type.stanza.ts) |
[Attributes](./src/@types/type.attributes.ts) |

## Supported Events
`@atmosx/event-product-parser` natively supports and ingests **300+** NWS Text products using VTEC, UGC, and various text parsing techniues.
If you wish to view all supported products, please see: [SUPPORTED_EVENTS.md](./SUPPORTED_EVENTS.md)


## Performance Recommendations
- Enable cache retention
- Disable geometry parsing if GeoJSON is unnecessary.

## References
[NOAA NWWS Information](https://www.weather.gov/nwws/) | 
[NWS API Documentation](https://www.weather.gov/documentation/services-web-api) |
[XMPP Protocol](https://xmpp.org/about/technology-overview/) |
[AtmosphericX](https://github.com/k3yomi/AtmosphericX) |\
[Documentation](https://atmosphericx.scriptkitty.cafe/documentation) |
[Discord Server](https://atmosphericx-discord.scriptkitty.cafe) |
[Project Board](https://github.com/users/AtmosphericX/projects/2) |\
[Code of Conduct](/.github/CODE_OF_CONDUCT.md) |
[Contributing](/.github/CONTRIBUTING.md) |
[License](/.github/LICENSE) | 
[Security](/.github/SECURITY.md) | 

## Acknowledgements
- [k3yomi](https://github.com/k3yomi)
