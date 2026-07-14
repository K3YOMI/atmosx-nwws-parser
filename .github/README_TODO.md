# AtmosphericX - Event Product Parser

<div align="center">
	<div align="center" style="border: none;">
		<img alt="Stars" src="https://img.shields.io/github/stars/AtmosphericX/event-product-parser">
		<img alt="Forks" src="https://img.shields.io/github/forks/AtmosphericX/event-product-parser">
		<img alt="Issues" src="https://img.shields.io/github/issues/AtmosphericX/event-product-parser">
		<img alt="PRs" src="https://img.shields.io/github/issues-pr/AtmosphericX/event-product-parser">
	</div>
</div>

## Introduction

`@atmosx/event-product-parser` is a data processing library designed to ingest, parse, normalize, cache, and distribute weather products from NOAA and the National Weather Service (NWS). It provides the core product handling layer used by [AtmosphericX](https://github.com/AtmosphericX), while remaining flexible enough to be integrated into independent applications and services.

The parser supports multiple NWS data sources, including the [NOAA Weather Wire Service Open Interface](https://www.weather.gov/nwws/), the [National Weather Service API](https://www.weather.gov/documentation/services-web-api), and raw text products distributed using the [WMO Format](https://repository.library.noaa.gov/view/noaa/11444). Incoming products are processed and converted into structured [GeoJSON](https://en.wikipedia.org/wiki/GeoJSON) data that can be consumed by applications, services, and automated systems.

> **Note:** This package is designed for NOAA/NWS products and currently only supports weather data from the United States and its territories.

## Supported Sources

`@atmosx/event-product-parser` supports multiple official NOAA and NWS data sources. Each source provides weather products in a different way depending on the use case.

| Source | Description | Best For |
| --- | --- | --- |
| [NOAA Weather Wire Service](https://www.weather.gov/nwws/) | A real-time data stream that delivers raw NWS weather products as they are issued. Products are provided using formats such as [WMO headers](https://repository.library.noaa.gov/view/noaa/11444) and require account credentials. | Applications that need immediate access to weather alerts, warnings, and operational products. |
| [National Weather Service API](https://www.weather.gov/documentation/services-web-api) | A public REST API that provides structured NWS weather data through standard HTTP requests. No special account is required. | Applications that need forecasts, observations, alerts, or weather data on demand. |