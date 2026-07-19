<div align="center">
	<a href="https://atmosphericx.scriptkitty.cafe">
		<img src="../logo.png" alt="@atmosx/event-product-parser" width="800"/>
	</a>
	<br>
	<p>A TypeScript/JavaScript library for parsing and ingesting NOAA and NWS Weather Text Products</p>
	<small>A project built and maintained with ❤️ by the AtmosphericX team</small>
	<p align="center">
		<a href="https://atmosphericx.scriptkitty.cafe"><b>Documentation</b></a> |
		<a href="https://github.com/AtmosphericX"><b>Repositories</b></a> |
		<a href="https://www.npmjs.com/search?q=%40atmosx"><b>NPM Packages</b></a> |
		<a href="https://atmosphericx-discord.scriptkitty.cafe"><b>Community Discord</b></a>
	</p>
</div>
<br><br>


# 4.0 - General Configurations

`@atmosx/event-product-parser` provides a wide range of configuration options, from basic event handling and management to advanced filtering capabilities and customizable event properties. This section provides a comprehensive overview of every available configuration, including event settings, filtering options, and parser behavior, along with detailed explanations and practical examples to help you configure the parser for your specific use case.

# 4.1 - Event Management & History

**EventManagement** is a core configuration that controls how parsed events are managed throughout their lifecycle. When enabled, the parser automatically stores events in an internal, memory-safe cache, allowing it to efficiently track event issuance, updates, cancellations, upgrades, and expiration. This eliminates the need to implement and maintain your own event caching solution while ensuring event state remains consistent and up to date.

Enabling **EventManagement** also unlocks the [ActionSettings](TODO) configuration, which allows you to define actions that are automatically executed after events have been parsed.

```ts
import { Manager } from '@atmosx/event-product-parser';

const client = new Manager({
	GlobalSettings: {
		EventManagement: true, // Enable event management
	},
});
```

* Disabling **EventManagement** prevents the parser from tracking previously seen events. As a result, event expiration, cancellation, and update notifications will no longer be emitted. It is **strongly recommended** to leave this option enabled unless you have a specific reason to disable it.


# 4.2 - Geometry Configurations

`@atmosx/event-product-parser` provides configuration options for managing geometry properties associated with each event. These settings allow you to control how event geometries are handled during the receiving, parsing, and memory management stages of the event lifecycle.

```ts
GlobalSettings: {
	DisableGeometryParsing: false, // Disables geometry parsing
	UseShapefileCoordinates: true, // Uses UGC shapefile coordinate database
	ShapefileSkipPoints: 0, // Skips points while building geometry for shapefiles
},
```

## 4.2.1 - Disable Geometry Parsing

The **DisableGeometryParsing** configuration is used to disable event geometry parsing. It was originally introduced as a way to reduce memory usage and improve parsing performance. However, with the introduction of memory-safe event caching, this configuration is now considered redundant and provides limited benefits in most use cases.

It is recommended to keep geometry parsing enabled unless you have a specific requirement to exclude geometry data from processed events.

```ts
GlobalSettings: {
	DisableGeometryParsing: true,
},
```

## 4.2.2 – Force Shapefile Coordinates

The **UseShapefileCoordinates** configuration allows you to obtain geographic coordinates and location information for spatial features. Shapefiles store geometry data such as points, lines, and polygons, which can be used to identify the exact position of features on a map.

When this feature is enabled, coordinate data is retrieved from the shapefile database instead of relying on raw polygon coordinate values. Disabling this feature will use the polygon coordinates provided directly in the raw text data.

```ts
GlobalSettings: {
	UseShapefileCoordinates: true
}
```

Example raw polygon coordinates:

```text
LAT...LON 4587 6965 4585 6968 4588 6971 4587 6972
          4584 6970 4576 6972 4576 6976 4577 6978
          4574 6981 4566 6974 4565 6970 4558 6971
          4553 6978 4530 6970 4567 7054 4573 7038
          4580 7042 4589 7026 4596 7026 4598 6968
```

## 4.2.3 - Shapefile Skip Points

The **ShapefileSkipPoints** configuration allows you to skip a specified number of points when building geometry for shapefiles. This can be useful for reducing the complexity of the resulting geometry or for performance reasons. This uses the [polygon-clipping](https://www.npmjs.com/package/polygon-clipping) library.

```ts
GlobalSettings: {
	ShapefileSkipPoints: 2, // Skip every 2nd point
},
```

# 4.3 – Tracking Node Settings

Tracking nodes are GPS-based longitude/latitude filters used to monitor and manage geographic locations. They allow the system to match, filter, and process data based on specified coordinate positions.

Each tracking node is defined by a longitude and latitude location, which is used to determine whether incoming geographic data falls within the configured tracking criteria. This enables location-based filtering and tracking of relevant points or areas. For more information, see [Creating & Configuring Tracking Nodes](TODO).


```ts
GlobalSettings: {
	NodeTTL: 60 // Time-To-Live (Event Updating)
	NodeMaxDistance: 125 // Miles (Radius)
}
```

## 4.3.1 - NodeTTL

**NodeTTL** defines how frequently events are updated against your configured tracking node filters.
During each update cycle, the system evaluates:

* Whether the event is inside the tracking node area.
* The distance from the tracking node (in miles and kilometers).
* The nearest point distance from the associated polygon boundary.

## 4.3.2 - Max Distance

**NodeMaxDistance**, defined in *miles*, specifies the maximum distance an event can be from a tracking node before it is filtered out. Events within this distance threshold will continue to be processed by the tracking node filters, while events beyond the configured distance will be ignored.

## 4.3.3 - Tracking Node Properties
```json
{
	"type": "Feature",
	"geometry": {
		"type": "Polygon",
		"coordinates": [[]]
	},
	"properties": {
		"metadata": {
			"nodes": [
				{
					"id": "Tracking Node Test",
					"coordinates": [[]],
					"nearest": [0, 0],
					"miles": 52.1,
					"kilometers": 83.8,
					"proximity": false
				}
			],
			"filtered_proximity": false,
			"updated": 000000000000
		}
	}
}
```

# 4.4 - Advanced Event Filters
Filtering is a critical component of `@atmosx/event-product-parser`, allowing your service to selectively process or ignore incoming data. Advanced event filters provide control over events, ICAO identifiers, [UGC (Universal Geographic Code)](https://www.weather.gov/media/documentation/docs/NWS_Geolocation.pdf) areas, states, and geographic locations.

These settings allow you to define which data should be processed, as well as exclude unwanted events, locations, or test products.


```ts
GlobalSettings: {
	EventFiltering: {
		ListeningEvents: [],
		ListeningICAO: [],
		ListeningUGC: [],
		ListeningStates: [],
		IgnoredICAO: [],
		IgnoredEvents: [],
		NodeLocationFiltering: false,
		IgnoreTestProducts: true,
	}
}
```

## 4.4.1 – Events & Wildcards

Events can be filtered by using either the **wildcard** syntax or by providing the complete event name.

Using wildcards allows you to match multiple related events without needing to define each event individually. For more precise filtering, the full event name can be provided to match only a specific event type.

```ts
GlobalSettings: {
	EventFiltering: {
		ListeningEvents: [
			`*Tornado Warning*`, 
			`Tornado Emergency`,
			`*Thunderstorm Warning*`,
			`Fire Weather Warning`
		]
	}
}
```
In the configuration above, the `*` character is used as a wildcard to match any text before or after the specified value.

* `*Tornado Warning*` matches any event containing **"Tornado Warning"** anywhere in the name.
* `Tornado Emergency` matches only the exact name **"Tornado Emergency"**.
* `*Thunderstorm Warning*` matches any event containing **"Thunderstorm Warning"** anywhere in the name.
* `Fire Weather Warning` matches only the exact name **"Fire Weather Warning"**.

Additionally, all events can be processed by setting **ListeningEvents** to an empty array (`[]`). This disables event name filtering and allows all available events to be accepted.



## 4.4.2 - ICAOs
## 4.4.3 - UGC
## 4.4.4 - States
## 4.4.5 - Ignoring Filters
## 4.4.6 - Node Location Filtering
## 4.4.7 - Test Products
# 4.5 - Archive Configurations
## 4.5.1 - TTL (Time-To-Live)
## 4.5.2 - EAS Toneout