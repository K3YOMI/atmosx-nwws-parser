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
    Database: `shapefile-manager.db`,
    EnableWireService: false,
    EnableJournal: true,
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
            MaxDatabaseHistory: 5000,
            MaxRetentionHistory: 555,
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
    GlobalSettings: {
        BetterEventNames: true,
        DisableGeometryParsing: false,
        UseShapefileCoordinates: true,
        NodeTTL: 60,
        NodeMinDistance: 120,
        EventFiltering: {
            ListeningEvents: [
                "Tornado Emergency", "PDS Tornado Warning", "Tornado Warning",
                "Confirmed Tornado Warning", "Radar Indicated Tornado Warning",
                "Special Marine Warning (TPROB)", "PDS Tornado Watch", "Tornado Watch",
                "EDS Severe Thunderstorm Warning (TPROB)", "EDS Severe Thunderstorm Warning",
                "Destructive Severe Thunderstorm Warning (TPROB)", "Destructive Severe Thunderstorm Warning",
                "Considerable Severe Thunderstorm Warning (TPROB)", "Considerable Severe Thunderstorm Warning",
                "Severe Thunderstorm Warning (TPROB)", "Severe Thunderstorm Warning",
                "Severe Thunderstorm Watch",
                "Flash Flood Emergency", "Flash Flood Warning",
                "Flash Flood Watch",
                "Tsunami Warning", "Tsunami Watch",
                "Tsunami Advisory", "Special Marine Warning",
                "Earthquake Warning",
                "Hurricane Warning", "Hurricane Watch",
                "Tropical Storm Warning",
                "Winter Storm Warning", "Blizzard Warning",
                "Ice Storm Warning", "Snow Squall Warning",
                "Winter Weather Advisory", "Extreme Cold Watch"
            ],
            ListeningICAO: [],
            IgnoredICAO: [],
            IgnoredEvents: [],
            ListeningUGC: [],
            ListeningStates: [],
            NodeLocationFiltering: false,
            IgnoreTestProducts: true,
        },
        EASSettings: {
            ArchiveDirectory: null,
            IntroWavFile: null,
        }
    }
})
```
### General Settings
- **Database**: The database file name and location, please make sure to include the `.db` extension.
- **EnableWireService**: Whether to enable `NOAA Weather Wire Service` within the parser. This requires credentials from [NOAA Weather Wire Service](https://www.weather.gov/nwws/).
- **EnableJournal**: Whether to output logs without requiring event `listeners`.

### NOAAWeatherWireServiceSettings
- **ReconnectionSettings**: When the XMPP client gets disconnected or has an error, choose to reconnect to the service again. This contains a reconnection check interval.
- **CredentialSettings**: The username (nickname) and password that is required for using `NOAA Weather Wire Service`.
- **CacheSettings**: The ability to use the cache system so when you relaunch the parser, it will have a event retention history of all the stanzas collected.
- **StanzaSettings**: Modify what type of products metadata you'd like to receive. (UGC, VTEC, RawText)

### NationalWeatherServiceSettings
- **CallbackInterval**: The interval at which the parser will check for new alerts from the National Weather Service API.
- **EventsEndpoint**: The URL that directs to the API.

### GlobalSettings
- **BetterEventNames**: Changes events to a more specific version depending on parameters, message types, etc. `(Ex. "Tornado Warning" -> "Observed Tornado Warning")`
- **DisableGeometryParsing**: Disable automatically appending GeoJSON geometry data to the events to save on memory consumption.
- **UseShapefileCoordinates**: Whether to use the shapefile database to obtain the coordinates for events with specified UGC zones.
- **NodeTTL**: How often nodes should be checked per event. (Tracking/Filtering)
- **NodeMinDistance**: The minimum distance to filter events from the node (Miles)
- **ListeningEvents**: Events you'd like to listen for. If this array is left empty, it will listen for **ALL** events and products.
- **ListeningICAO**: ICAO codes for the weather stations you'd like to listen for. Filtering all events that do not contain the codes. `(Ex. ["KLOT", "TORD"])`
- **IgnoredICAO**: Ignored ICAO codes `(Ex. ["KWNS"])`
- **IgnoredEvents**: Ignored events / products.
- **ListeningUGC**: Zones you'd like to listen to `(Ex. ["ILZ001"])`
- **ListeningStates**: States you'd like to listen to `(Ex. ["IL"])`
- **NodeLocationFiltering**: If you want tracking nodes to filter out events based on radius. (Miles)\
- **IgnoreTextProducts**: If you want to ignore test products and events.
- **ArchiveDirectory**: The directory you'd like to store generated EAS audio files.
- **IntroWavFile**: The PCM16 bit WAV audio file to append to the EAS message.



## Events and Listeners

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


### Function `getNodes`
Fetches the list of tracking nodes from the parser.
```ts
import { getNodes } from "@atmosx/event-product-parser"
const nodes = getNodes()
console.log(nodes)
```

### Function `setEasTone`
Fetches an EAS audio message for an event (Simulated)
```ts
import { setEasTone } from "@atmosx/event-product-parser"
const event = {...}
await setEasTone(event.properties.description, event.properties.metadata.header)
```

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
[Code of Conduct](/CODE_OF_CONDUCT.md) |
[Contributing](/CONTRIBUTING.md) |
[License](/LICENSE) | 
[Security](/SECURITY.md) | 
[Changelogs](/CHANGELOGS.md) |

## Acknowledgements
- [k3yomi](https://github.com/k3yomi)
