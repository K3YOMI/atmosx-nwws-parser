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
		<a href="https://atmosphericx-discord.scriptkitty.cafe"><b>Community Discord</b></a>
	</p>
</div>
<br><br>


# 3.0 - Source Configurations
`@atmosx/event-product-parser` supports two primary source configurations for ingesting weather data from the [National Weather Service](https://www.weather.gov/) (NWS) and the [National Oceanic and Atmospheric Administration](https://www.noaa.gov/) (NOAA).

The [NOAA Weather Wire Service](#31-noaa-weather-wire-service) provides real-time weather product delivery through a persistent [XMPP](https://xmpp.org/) connection using the standard [WMO Header Format](#314-geojson-&-wmo-formatting).

The [National Weather Service API](#32-national-weather-service-api) provides access to weather data through a RESTful API.

# 3.1 - NOAA Weather Wire Service
`NOAA Weather Wire Service` is a real-time dissemination service that delivers official weather information, alerts, and warnings in text format from NWS Weather Forecast Offices and National Centers.

This service is designed for television and radio broadcasters, emergency managers, commercial alerting providers, private weather services, and other organizations that require rapid access to weather products.


Each alert, forecast, and observation is delivered over [XMPP](https://xmpp.org/) using the standardized [WMO Header Format](#314-geojson-&-wmo-formatting). This provides a consistent structure for automated processing, although the format can be challenging to parse due to the complexity and variety of available weather products.

Accessing the NOAA Weather Wire Service requires credentials, which can be obtained by sending an email to [NWWS.Issue@noaa.gov](mailto:NWWS.Issue@noaa.gov).

When requesting access, provide the following information:

* Name (First and Last)
* Company
* Address
* State, City, and ZIP Code
* Telephone Number
* Account Information: Single or Multiple Accounts


# 3.2 - National Weather Service API
The `National Weather Service` provides a [RESTful API](https://www.weather.gov/documentation/services-web-api) for programmatically accessing weather data and products.

Compared to the `NOAA Weather Wire Service`, the API introduces additional latency, with data typically delayed by 1 to 2 minutes on average. This delay is one of the primary tradeoffs when using the API instead of the `NOAA Weather Wire Service` for real-time weather product ingestion.

The NWS API is best suited for applications that require on demand access to weather data rather than the lowest possible latency delivery of operational weather products. All responses are provided in [GeoJSON](https://geojson.org/) format, making the data straightforward to parse and integrate into applications.


# 3.3 - NOAA Weather Wire Service vs NWS RESTful API
There are significant differences between these two sources. `NOAA Weather Wire Service` requires authenticated access and is optimized for real-time product delivery, while the NWS RESTful API is publicly accessible and designed for on demand data retrieval.

| Feature | NOAA Weather Wire Service | NWS RESTful API |
| --- | --- | --- |
| Authentication | ✅ | ❌ |
| real-time Delivery | ✅ | ❌ |
| WMO Header Format | ✅ | ❌ |
| Persistent Connection | ✅ | ❌ |
| Low Latency Products | ✅ | ❌ |


# 3.4 - GeoJSON & WMO Formatting

`@atmosx/event-product-parser` supports two primary data formats when ingesting weather products. The `NOAA Weather Wire Service` uses [WMO Format](#342-wmo-format), while the `National Weather Service API` uses [GeoJSON](#341-geojson).

## 3.4.1 GeoJSON
[GeoJSON](https://geojson.org/) is a format for encoding a variety of geographic data structures. It is based on the JavaScript Object Notation (JSON) standard and is widely used for representing geographic features in web applications. You can view a real-world sample [here](/.github/samples/SAMPLE_GEOJSON.json).

```json
{
	"type": "Feature",
	"geometry": {
		"type": "Polygon",
		"coordinates": [[]]
	},
	"properties": {}
}
```



## 3.4.2 WMO Format
[WMO Format](https://wmo.int/) is a standard for the exchange of meteorological data, including weather observations, forecasts, and warnings. It is widely used by meteorological services around the world to ensure consistency and interoperability in the sharing of weather information. You can view a real-world sample [here](/.github/samples/SAMPLE_TEXT_PRODUCT.txt).
```text
000
WUUS51 KLOT 000000
SVRGYX
ILC001-ILC002-
/O.NEW.XXXX.XX.X.0000.000000T0000Z-000000T0000Z/

BULLETIN - IMMEDIATE BROADCAST REQUESTED

Severe Thunderstorm Warning

National Weather Service

XXXX PM Timezone Weekday Month DD 2026

TEST EXAMPLE - TEXT EXAMPLE TEST -EXAMPLE

&&



LAT...LON 4587 6965 4585 6968 4588 6971 4587 6972

      4584 6970 4576 6972 4576 6976 4577 6978

      4574 6981 4566 6974 4565 6970 4558 6971

      4553 6978 4530 6970 4567 7054 4573 7038

      4580 7042 4589 7026 4596 7026 4598 6968

TIME...MOT...LOC 1650Z 313DEG 52KT 4600 7042
```


# 3.5 - Configuring NOAA Weather Wire Service

Configuring `@atmosx/event-product-parser` to use the [NOAA Weather Wire Service](#31-noaa-weather-wire-service) requires setting up the necessary credentials and connection parameters to establish a persistent connection to the service. This can be configured through the `Manager` class within your application.

* Keep in mind that settings configured within `NOAAWeatherWireServiceSettings` only apply to the `NOAA Weather Wire Service` source and do not affect the `National Weather Service API` source.

```ts
import { Manager } from '@atmosx/event-product-parser';

const client = new Manager({
	EnableWireService: true, // Enable NOAA Weather Wire Service (NWWS)
	NOAAWeatherWireServiceSettings: {
		CredentialSettings: {
			Username: `USERNAME`, // Case sensitive
			Password: `PASSWORD`, // Case sensitive
			Nickname: `NICKNAME`, // Visible to other connected users
		},
	},
});
```

* Only **one** source can be enabled at a time. (*This project does not use fallback sources*)

## 3.5.1 - Auto Reconnecting

With [XMPP](https://xmpp.org/) connections, `@atmosx/event-product-parser` can automatically reconnect to the NOAA Weather Wire Service if the connection is interrupted.

This ensures your application can maintain a persistent connection and continue receiving weather products without requiring manual intervention after temporary network failures or service disruptions.

* This configuration only applies to the `NOAA Weather Wire Service` using `XMPP`. The NWS API source does not require auto reconnect configuration.

```ts
NOAAWeatherWireServiceSettings: {
	ReconnectionSettings: {
		Enabled: true, // Enable auto reconnect
		ReconnectionInterval: 60, // Time since last stanza before reconnecting (seconds)
	},
},
```

## 3.5.2 - Stanza Caching

Optionally, you can enable stanza caching to retain previously processed XMPP stanzas. This can help prevent data loss in the event that your application requires a fresh restart.

* Keep in mind that increasing `MaxRetentionHistory` will increase the amount of time required for `@atmosx/event-product-parser` to initialize, as more cached stanzas must be loaded and processed during startup.

```ts
NOAAWeatherWireServiceSettings: {
	CacheSettings: {
		Enabled: true, // Enable stanza caching
		MaxDatabaseHistory: 50000, // Maximum stanzas to store in the database
		MaxRetentionHistory: 1200, // Maximum stanzas to load during startup
	},
},
```

## 3.5.3 - Stanza Processing Settings

While processing stanzas, each one is categorized based on its contents and characteristics. This includes formats such as [CAP (Common Alerting Protocol) v1.2](https://docs.oasis-open.org/emergency/cap/v1.2/CAP-v1.2-os.html), [VTEC](https://www.weather.gov/vtec/), [UGC](https://www.weather.gov/gis/AWIPSShapefiles), and **Raw Text** products. By default, all product categories are enabled by default which includes: 

* UGC Only Products
* VTEC/HVTEC Only Products
* Raw Text (No UGC/VTEC Present)

Please keep in mind that the **Common Alerting Protocol** text products will always be skipped as they tend to be slower for ingestion and require extra steps which include parsing [XML](https://www.w3.org/TR/REC-xml/). There is **NO** longer support for this category.


```ts
NOAAWeatherWireServiceSettings: {
	StanzaSettings: {
		DisableUGC: false, // Disables all UGC Categories
		DisableVTEC: false, // Disables all VTEC/HVTEC Categories
		DisableText: false, // Disables all RawText Categories
	}
},
```


# 3.6 - Configuring National Weather Service API

The `National Weather Service API` requires minimal configuration compared to the `NOAA Weather Wire Service`. While there are fewer available settings, the API source is designed to provide simple access to weather data through RESTful requests without requiring authentication or persistent connections.

```ts
import { Manager } from '@atmosx/event-product-parser';

const client = new Manager({
	EnableWireService: false, // Enable NOAA Weather Wire Service (NWWS)
	NationalWeatherServiceSettings: {
        CallbackInterval: 30, // How often it retrieves new products (Minimum: 15 seconds)
        EventsEndpoint: `https://api.weather.gov/alerts/active`, // RESTful API
    },
});
```