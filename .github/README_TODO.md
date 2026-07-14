# AtmosphericX - Event Product Parser




<div align="center">
	<a href="https://atmosphericx.scriptkitty.cafe">
		<img src="./logo.png" alt="@atmosx/event-product-parser" width="800"/>
	</a>
	<br>
	<p>A TypeScript/JavaScript NWWS-OI & NWS API weather product parser and ingestion library.</p>
	<p align="center">
		<a href="https://atmosphericx.scriptkitty.cafe"><b>Documentation</b></a> |
		<a href="https://github.com/AtmosphericX"><b>Repository</b></a> |
		<a href="https://atmosphericx-discord.scriptkitty.cafe"><b>Discord</b></a>
	</p>
	<a>
		<a href="https://www.npmjs.com/package/@atmosx/event-product-parser">
		<img src="https://img.shields.io/npm/v/@atmosx/event-product-parser.svg?style=flat-square" alt="npm version">
	</a>
		<a href="https://npm-stat.com/charts.html?package=@atmosx/event-product-parser">
		<img src="https://img.shields.io/npm/dm/@atmosx/event-product-parser.svg?style=flat-square" alt="npm downloads">
	</a>
		<a href="https://github.com/AtmosphericX/event-product-parser/stargazers">
		<img src="https://img.shields.io/github/stars/AtmosphericX/event-product-parser.svg?style=flat-square" alt="GitHub stars">
	</a>
		<a href="https://github.com/AtmosphericX/event-product-parser/issues">
		<img src="https://img.shields.io/github/issues/AtmosphericX/event-product-parser.svg?style=flat-square" alt="GitHub issues">
	</a>
		<a href="https://github.com/AtmosphericX/event-product-parser/network">
		<img src="https://img.shields.io/github/forks/AtmosphericX/event-product-parser.svg?style=flat-square" alt="GitHub forks">
	</a>
		<a href="./CONTRIBUTORS.md">
		<img src="https://img.shields.io/github/contributors/AtmosphericX/event-product-parser.svg?style=flat-square" alt="Contributors">
	</a>
</div>




## Table of contents
- [1. Introduction](#introduction)
- [2. Installation](#installation)
- [3. NWWS-OI & NWS API](.github/features/DOCS_NWWS_NWS.md)
	- [3.1 NOAA Weather Wire Service + National Weather Service API](.github/features/DOCS_NWWS_NWS.md#31-noaa-weather-wire-service--national-weather-service-api)
	- [3.2 GeoJSON + WMO Formats](.github/features/DOCS_NWWS_NWS.md#32-geojson--wmo-formats)
	- [3.3 NOAA Weather Wire Service Authentication](.github/features/DOCS_NWWS_NWS.md#33-noaa-weather-wire-service-authentication)
	- [3.4 NWWS-OI Reconnecting](.github/features/DOCS_NWWS_NWS.md#34-nwws-oi-reconnecting)
	- [3.5 Stanza Caching](.github/features/DOCS_NWWS_NWS.md#35-stanza-caching)
	- [3.6 Stanza Settings](.github/features/DOCS_NWWS_NWS.md#36-stanza-settings)
	- [3.7 Configuring National Weather Service API](.github/features/DOCS_NWWS_NWS.md#37-configuring-national-weather-service-api)
- [4. External Integrations](.github/features/DOCS_CUSTOM_INTEGRATIONS.md)
	- [4.1 Broadcastify Integration](.github/features/DOCS_CUSTOM_INTEGRATIONS.md#41-broadcastify-integration)
	- [4.2 NTFY Notifications](.github/features/DOCS_CUSTOM_INTEGRATIONS.md#42-ntfy-notifications)

- [5. Notifications & Outputs](.github/features/DOCS_LISTENERS.md)
	- [5.1 Event Handling](.github/features/DOCS_LISTENERS.md#51-event-handling)
	- [5.2 NTFY Push Notifications](.github/features/DOCS_LISTENERS.md#52-ntfy-push-notifications)
	- [5.3 Discord Webhook Notifications](.github/features/DOCS_LISTENERS.md#53-discord-webhook-notifications)
	- [5.4 File Upload Handling](.github/features/DOCS_LISTENERS.md#54-file-upload-handling)

- [6. Global Configuration](.github/features/DOCS_GLOBAL_SETTINGS.md)
	- [6.1 Event Management](.github/features/DOCS_GLOBAL_SETTINGS.md#61-event-management)
	- [6.2 Event Naming](.github/features/DOCS_GLOBAL_SETTINGS.md#62-event-naming)
	- [6.3 Geometry Configuration](.github/features/DOCS_GLOBAL_SETTINGS.md#63-geometry-configuration)
	- [6.4 Tracking Node Configuration](.github/features/DOCS_GLOBAL_SETTINGS.md#64-tracking-node-configuration)
	- [6.5 Advanced Event Filtering](.github/features/DOCS_GLOBAL_SETTINGS.md#65-advanced-event-filtering)
	- [6.6 Archive Configuration](.github/features/DOCS_GLOBAL_SETTINGS.md#66-archive-configuration)

- [7. Event Callbacks](.github/features/DOCS_EVENT_LISTENERS.md)
	- [7.1 Service Status Events](.github/features/DOCS_EVENT_LISTENERS.md#71-service-status-events)
	- [7.2 Test Product Events](.github/features/DOCS_EVENT_LISTENERS.md#72-test-product-events)
	- [7.3 Expired Product Events](.github/features/DOCS_EVENT_LISTENERS.md#73-expired-product-events)
	- [7.4 Product Type Events](.github/features/DOCS_EVENT_LISTENERS.md#74-product-type-events)
	- [7.5 Event Filtering Callbacks](.github/features/DOCS_EVENT_LISTENERS.md#75-event-filtering-callbacks)
	- [7.6 Event Cache Update Events](.github/features/DOCS_EVENT_LISTENERS.md#76-event-cache-update-events)
	- [7.7 Tracking Node Events](.github/features/DOCS_EVENT_LISTENERS.md#77-tracking-node-events)
	- [7.8 Storm Prediction Center Events](.github/features/DOCS_EVENT_LISTENERS.md#78-storm-prediction-center-events)
	- [7.9 Debug Events](.github/features/DOCS_EVENT_LISTENERS.md#79-debug-events)

- [8. Utility Functions](.github/features/DOCS_FUNCTIONS.md)
	- [8.1 Dynamic Settings Management](.github/features/DOCS_FUNCTIONS.md#81-dynamic-settings-management)
	- [8.2 Retrieving Event Geometry](.github/features/DOCS_FUNCTIONS.md#82-retrieving-event-geometry)
	- [8.3 Selecting Random Events](.github/features/DOCS_FUNCTIONS.md#83-selecting-random-events)
	- [8.4 Retrieving Package Version](.github/features/DOCS_FUNCTIONS.md#84-retrieving-package-version)
	- [8.5 Cleaning Event Data](.github/features/DOCS_FUNCTIONS.md#85-cleaning-event-data)
	- [8.6 Manually Starting the Manager](.github/features/DOCS_FUNCTIONS.md#86-manually-starting-the-manager)
	- [8.7 Creating and Configuring Tracking Nodes](.github/features/DOCS_FUNCTIONS.md#87-creating-and-configuring-tracking-nodes)
	- [8.8 Retrieving Events](.github/features/DOCS_FUNCTIONS.md#88-retrieving-events)
	- [8.9 Retrieving Tracking Nodes](.github/features/DOCS_FUNCTIONS.md#89-retrieving-tracking-nodes)
	- [8.10 Creating Manual Events](.github/features/DOCS_FUNCTIONS.md#810-creating-manual-events)
	- [8.11 Database Queries](.github/features/DOCS_FUNCTIONS.md#811-database-queries)
	- [8.12 Generating EAS Audio](.github/features/DOCS_FUNCTIONS.md#812-generating-eas-audio)

## Introduction

`@atmosx/event-product-parser` is an open-source TypeScript/JavaScript weather data processing library designed to ingest, parse, normalize, cache, and distribute NOAA and National Weather Service (NWS) products. It serves as the core product processing layer behind [AtmosphericX](https://github.com/AtmosphericX/AtmosphericX.git), while remaining lightweight, extensible, and straightforward to integrate into independent applications and services.

Built for large-scale weather data processing, the library supports parsing and handling over **500+ event products**, providing a unified experience for working with a wide range of meteorological products, alerts, and operational data. It supports multiple data sources, including the [NOAA Weather Wire Service Open Interface](https://www.weather.gov/nwws/) (NWWS-OI), the [National Weather Service API](https://www.weather.gov/documentation/services-web-api), and raw text products distributed using the [WMO Format](https://repository.library.noaa.gov/view/noaa/11444). 

Incoming products are decoded, normalized, and transformed into structured [GeoJSON](https://en.wikipedia.org/wiki/GeoJSON) data, with built-in management capabilities for tracking issuances, updates, corrections, upgrades, and cancellations.

Beyond core product processing, the library provides support for integrating [Storm Prediction Center](https://www.spc.noaa.gov) graphics, [Broadcastify](https://www.broadcastify.com) feeds, [NTFY](https://ntfy.sh) and [Discord Webhook](https://discord.com/developers/docs/resources/webhook) push notifications, as well as automated emergency audio generation.

> **Note:** This package is designed specifically for NOAA/NWS weather products and currently supports weather data originating from the United States and its territories.


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