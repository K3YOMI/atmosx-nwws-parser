<div align="center">
	<a href="https://atmosphericx.scriptkitty.cafe">
		<img src="https://scriptkitty.cafe/ftp/@atmosphericx/assets/logo-event-product-parser.png" alt="@atmosx/event-product-parser" width="800"/>
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

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Sources](/.github/docs/docs-source-configuration.md)
	- 3.1 [NOAA Weather Wire Service](/.github/docs/docs-source-configuration.md#31---noaa-weather-wire-service)
	- 3.2 [National Weather Service API](/.github/docs/docs-source-configuration.md#32---national-weather-service-api)
	- 3.3 [NOAA Weather Wire Service vs NWS RESTful API](/.github/docs/docs-source-configuration.md#33---noaa-weather-wire-service-vs-nws-restful-api)
	- 3.4 [GeoJSON & WMO Formatting](/.github/docs/docs-source-configuration.md#34-geojson---wmo-formatting)
		- 3.4.1 [GeoJSON](/.github/docs/docs-source-configuration.md#341---geojson)
		- 3.4.2 [WMO Format](/.github/docs/docs-source-configuration.md#342---wmo-format)
	- 3.5 [Configuring NOAA Weather Wire Service](/.github/docs/docs-source-configuration.md#35---configuring-noaa-weather-wire-service)
		- 3.5.1 [Auto Reconnecting](/.github/docs/docs-source-configuration.md#351---auto-reconnecting)
		- 3.5.2 [Stanza Caching](/.github/docs/docs-source-configuration.md#352---stanza-caching)
		- 3.5.3 [Stanza Processing Settings](/.github/docs/docs-source-configuration.md#353---stanza-processing-settings)
	- 3.6 [Configuring National Weather Service API](/.github/docs/docs-source-configuration.md#36---configuring-national-weather-service-api)
4. [General Configurations](/.github/docs/docs-general-configurations.md)
	- 4.1 [Event Management & History](/.github/docs/docs-general-configurations.md#41---event-management---history)
	- 4.2 [Geometry Configurations](/.github/docs/docs-general-configurations.md#42---geometry-configurations)
		- 4.2.1 [Disable Geometry Processing](/.github/docs/docs-general-configurations.md#421---disable-geometry-processing)
		- 4.2.2 [Force Shapefile Coordinates](/.github/docs/docs-general-configurations.md#422---force-shapefile-coordinates)
		- 4.2.3 [Shapefile Skip Points](/.github/docs/docs-general-configurations.md#423---shapefile-skip-points)
	- 4.3 [Tracking Node Settings](/.github/docs/docs-general-configurations.md#43---tracking-node-settings)
		- 4.3.1 [NodeTTL](/.github/docs/docs-general-configurations.md#431---nodettl)
		- 4.3.2 [Max Distance](/.github/docs/docs-general-configurations.md#432---max-distance)
		- 4.3.3 [Tracking Node Properties](/.github/docs/docs-general-configurations.md#433---tracking-node-properties)
	- 4.4 [Advanced Event Filters](/.github/docs/docs-general-configurations.md#44---advanced-event-filters)
		- 4.4.1 [Events & Wildcards](/.github/docs/docs-general-configurations.md#441---events---wildcards)
		- 4.4.2 [ICAOs](/.github/docs/docs-general-configurations.md#442---icaos)
		- 4.4.3 [UGC](/.github/docs/docs-general-configurations.md#443---ugc)
		- 4.4.4 [States](/.github/docs/docs-general-configurations.md#444---states)
		- 4.4.5 [Ignoring Filters](/.github/docs/docs-general-configurations.md#445---ignoring-filters)
		- 4.4.6 [Node Location Filtering](/.github/docs/docs-general-configurations.md#446---node-location-filtering)
		- 4.4.7 [Test Products](/.github/docs/docs-general-configurations.md#447---test-products)
	- 4.5 [Archive Configurations](/.github/docs/docs-general-configurations.md#45---archive-configurations)
		- 4.5.1 [TTL (Time-to-Live)](/.github/docs/docs-general-configurations.md#451---ttl-time-to-live)
		- 4.5.2 [EAS Toneout](/.github/docs/docs-general-configurations.md#452---eas-toneout)
5. [Actions / Integrations](/.github/docs/docs-integrations.md)
	- 5.1 [Action Events & Wildcards](/.github/docs/docs-integrations.md#51---action-events---wildcards)
	- 5.2 [Discord Webhooks](/.github/docs/docs-integrations.md#52---discord-webhooks)
		- 5.2.1 [Ratelimiting](/.github/docs/docs-integrations.md#521---ratelimiting)
	- 5.3 [NTFY Push Notifications](/.github/docs/docs-integrations.md#53---ntfy-push-notifications)
		- 5.3.1 [Server Configuration](/.github/docs/docs-integrations.md#531---server-configuration)
		- 5.3.2 [Action Configuration](/.github/docs/docs-integrations.md#532---action-configuration)
	- 5.4 [Broadcastify Feed Attachments](/.github/docs/docs-integrations.md#54---broadcastify-feed-attachments)
		- 5.4.1 [Tag Filtering](/.github/docs/docs-integrations.md#541---tag-filtering)
	- 5.5 [Mock EAS Generator](/.github/docs/docs-integrations.md#55---mock-eas-generator)
		- 5.5.1 [Linux Prerequisites](/.github/docs/docs-integrations.md#551---linux-prerequisites)
		- 5.5.2 [Limitations](/.github/docs/docs-integrations.md#552---limitations)
	- 5.6 [Event Archiving](/.github/docs/docs-integrations.md#56---event-archiving)
		- 5.6.1 [Raw Text Product Archiving](/.github/docs/docs-integrations.md#561---raw-text-product-archiving)
		- 5.6.2 [GeoJSON Archiving](/.github/docs/docs-integrations.md#562---geojson-archiving)
6. [Listeners](/.github/docs/docs-listeners.md)
	- 6.1 [XMPP / NWS Status](/.github/docs/docs-listeners.md#61---xmpp---nws-status)
	- 6.2 [Test Products](/.github/docs/docs-listeners.md#62---test-products)
	- 6.3 [Expired Products](/.github/docs/docs-listeners.md#63---expired-products)
	- 6.4 [Specific Product Types](/.github/docs/docs-listeners.md#64---specific-product-types)
	- 6.5 [Filtered Products](/.github/docs/docs-listeners.md#65---filtered-products)
	- 6.6 [Cache Updates](/.github/docs/docs-listeners.md#66---cache-updates)
	- 6.7 [Tracking Node Updates](/.github/docs/docs-listeners.md#67---tracking-node-updates)
	- 6.8 [Storm Prediction Center Products](/.github/docs/docs-listeners.md#68---storm-prediction-center-products)
	- 6.9 [Debugging](/.github/docs/docs-listeners.md#69---debugging)
	- 6.10 [Logs / Journal](/.github/docs/docs-listeners.md#610---logs---journal)
	- 6.11 [Wildcard](/.github/docs/docs-listeners.md#611---wildcard)
7. [Functions](/.github/docs/docs-functions.md)
	- 7.1 [Dynamic Configuration Setter](/.github/docs/docs-functions.md#71---dynamic-configuration-setter)
	- 7.2 [Event Geometry Getter](/.github/docs/docs-functions.md#72---event-geometry-getter)
	- 7.3 [Random Event Getter](/.github/docs/docs-functions.md#73---random-event-getter)
	- 7.4 [Package Information Getter](/.github/docs/docs-functions.md#74---package-information-getter)
	- 7.5 [Cleaned Event Getter](/.github/docs/docs-functions.md#75---cleaned-event-getter)
	- 7.6 [Management Functions](/.github/docs/docs-functions.md#76---management-functions)
	- 7.7 [Creating & Configuring Tracking Nodes](/.github/docs/docs-functions.md#77---creating---configuring-tracking-nodes)
	- 7.8 [Event Cache Getter](/.github/docs/docs-functions.md#78---event-cache-getter)
	- 7.9 [Tracking Node Cache Getter](/.github/docs/docs-functions.md#79---tracking-node-cache-getter)
	- 7.10 [Creating Manual WMO Events](/.github/docs/docs-functions.md#710---creating-manual-wmo-events)
	- 7.11 [Database Queries](/.github/docs/docs-functions.md#711---database-queries)
		- 7.11.1 [Stanza Query](/.github/docs/docs-functions.md#7111---stanza-query)
	- 7.12 [Manual Mock EAS Generator](/.github/docs/docs-functions.md#712---manual-mock-eas-generator)
8. [Technical Parser Documentation](/.github/docs/docs-technical.md)
	- 8.1 [Workflow & Pipeline](/.github/docs/docs-technical.md#81---workflow---pipeline)
	- 8.2 [Core Parsing Logic](/.github/docs/docs-technical.md#82---core-parsing-logic)
		- 8.2.1 [VTEC](/.github/docs/docs-technical.md#821---vtec)
			- 8.2.1.1 [Product Dictionary](/.github/docs/docs-technical.md#8211---product-dictionary)
			- 8.2.1.2 [Tracking](/.github/docs/docs-technical.md#8212---tracking)
			- 8.2.1.3 [Event Dictionary](/.github/docs/docs-technical.md#8213---event-dictionary)
			- 8.2.1.4 [Status Dictionary](/.github/docs/docs-technical.md#8214---status-dictionary)
			- 8.2.1.5 [Organization Sender](/.github/docs/docs-technical.md#8215---organization-sender)
			- 8.2.1.6 [Expiry Parsing](/.github/docs/docs-technical.md#8216---expiry-parsing)
			- 8.2.1.7 [Watch Parsing](/.github/docs/docs-technical.md#8217---watch-parsing)
			- 8.2.1.8 [KWNS / SPC](/.github/docs/docs-technical.md#8218---kwns)
		- 8.2.2 [UGC](/.github/docs/docs-technical.md#822---ugc)
			- 8.2.2.1 [Extracting Headers](/.github/docs/docs-technical.md#8221---extracting-headers)
			- 8.2.2.2 [Getting Zones](/.github/docs/docs-technical.md#8222---getting-zones)
			- 8.2.2.3 [Extracting Expiry](/.github/docs/docs-technical.md#8223-extracting-expiry)
			- 8.2.2.4 [UGC to Zones](/.github/docs/docs-technical.md#8224-ugc-to-zones)
		- 8.2.3 [HVTEC](/.github/docs/docs-technical.md#823---hvtec)
			- 8.2.3.1 [Flood Severity](/.github/docs/docs-technical.md#8231---flood-severity)
			- 8.2.3.2 [Flood Causes](/.github/docs/docs-technical.md#8232---flood-causes)
			- 8.2.3.3 [Flood Records](/.github/docs/docs-technical.md#8233---flood-records)
		- 8.2.4 [Raw Text](/.github/docs/docs-technical.md#824---raw-text)
			- 8.2.4.1 [Extracting Descriptions](/.github/docs/docs-technical.md#8241---extracting-descriptions)
			- 8.2.4.2 [Extracting Coordinates](/.github/docs/docs-technical.md#8242---extracting-coordinates)
			- 8.2.4.3 [Extracting String Specifics](/.github/docs/docs-technical.md#8243---extracting-string-specifics)
			- 8.2.4.4 [Extracting XML](/.github/docs/docs-technical.md#8244---extracting-xml)
		- 8.2.5 [Building Properties](/.github/docs/docs-technical.md#825---building-properties)
		- 8.2.6 [Building Geometry](/.github/docs/docs-technical.md#826---building-geometry)
	- 8.3 [Event Validation & Filtering](/.github/docs/docs-technical.md#83---event-validation---filtering)
		- 8.3.1 [Enhanced Event Naming](/.github/docs/docs-technical.md#831---enhanced-event-naming)
		- 8.3.2 [Appending Attachments](/.github/docs/docs-technical.md#832---appending-attachments)
		- 8.3.3 [Generating Hashes](/.github/docs/docs-technical.md#833---generating-hashes)
	- 8.4 [Event & History Management](/.github/docs/docs-technical.md#84---event---history-management)
	- 8.5 [Action Workflow](/.github/docs/docs-technical.md#85---action-workflow)
9. [Workers & Performance](/.github/docs/docs-technical.md#9---workers---performance)
	- 9.1 [Setting up Workers](/.github/docs/docs-technical.md#91---setting-up-workers)
	- 9.2 [IO/CPU Issues](/.github/docs/docs-technical.md#92---iocpu-issues)
	- 9.3 [Recommended Hardware Specifications](/.github/docs/docs-technical.md#93---recommended-hardware-specifications)



## Introduction

Formerly known as `atmosx-nwws-parser`, **`@atmosx/event-product-parser`** is an open-source [TypeScript](https://www.typescriptlang.org/)/[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) library for ingesting, parsing, caching, and distributing [NOAA](https://www.noaa.gov/) and [NWS](https://www.weather.gov/) weather text products. The library handles event processing within [AtmosphericX](https://atmosxphericx.scriptkitty.cafe), providing a lightweight and extensible foundation for working with [GeoJSON](https://geojson.org/) and [WMO](https://www.wmo.int/) data. Built with simplicity and flexibility in mind, it is easy to integrate, straightforward to extend, and suitable for both standalone applications and larger services.

With support for the [NOAA Weather Wire Service Open Interface](https://www.weather.gov/nwws/) and the [National Weather Service API](https://www.weather.gov/documentation/services-web-api), the library enables reliable access to a wide range of operational weather products while providing a consistent interface for downstream processing and distribution.

Beyond core product processing, the library provides support for integrating [Storm Prediction Center](https://www.spc.noaa.gov) graphics, [Broadcastify](https://www.broadcastify.com) feeds, [NTFY](https://ntfy.sh) and [Discord Webhook](https://discord.com/developers/docs/resources/webhook) push notifications, as well as automated emergency audio generation.

**Note:** *This package is designed specifically for NOAA/NWS weather products and currently supports weather data originating from the United States and its territories.*


## Installation
**NPM**: 
```bash
$ npm install @atmosx/event-product-parser
```

**PNPM**:
```bash
$ pnpm install @atmosx/event-product-parser
```

After installation, import the package using `import` or `require`:

```ts
import { Manager } from "@atmosx/event-product-parser"
const client = new Manager({})
```

Using `require`:
```js
const { Manager } = require("@atmosx/event-product-parser")
const client = new Manager({})
```