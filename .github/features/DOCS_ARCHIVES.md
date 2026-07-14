# File Archives (Text / GeoJSON)

File archive generation allows processed GeoJSON and raw text products to be stored as archived files with configurable expiration times. A custom `TTL` (seconds) value can be configured to automatically expire and remove archived file entries after the specified duration. This provides automated archive management while preventing outdated products from accumulating over time.

Sample outputs are available for a [Text Product](../samples/text_product_sample.txt) and a [GeoJSON Product](../samples/SAMPLE_GEOJSON.json).

This integration is optional and can be enabled through the `Manager.ListenerSettings` and `Manager.GlobalSettings.ArchiveSettings` initialization configurations:

```ts
ListenerSettings: [
	{
		Events: ["Considerable Severe Thunderstorm Warning"],
		Uploads: {
			JSON: true,
			File: true
		},
	}
],
GlobalSettings: {
	ArchiveSettings: {
		TTL: 30,
		EventDirectory: `ftp/@bucket/JSONProducts`,
		TextDirectory: `ftp/@bucket/TextProducts`,
	}
}