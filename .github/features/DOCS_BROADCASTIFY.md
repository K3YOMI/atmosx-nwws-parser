# Broadcastify Feed Attachments

[Broadcastify](https://broadcastify.com) feed data can be automatically sourced and stored in the configured feed table within the database path defined by the configuration settings. Feed information is matched against processed events using geographic metadata, allowing related Broadcastify feeds and audio URLs to be attached directly to generated events.

This integration allows processed events to include nearby live communication sources associated with affected areas. Supported feed categories include **Public Safety**, **NOAA Weather Radio**, **Marine**, **Aviation**, **Amateur Radio**, **Rail**, and other available Broadcastify feed types based on the counties, zones, or locations associated with an event.

When combined with the [Discord Webhook Integration](./DOCS_WEBHOOK.md), attached Broadcastify feeds can be included in outgoing notifications, providing direct access to related audio sources from delivered weather alerts.

This integration is optional and can be enabled through the `Manager` initialization:

```ts
BroadcastifySettings: {
	BroadcastifyAttachments: true,
	BroadcastifyTags: [
		`Public Safety`,
		`Amateur Radio`,
		`Other`,
		`Rail`,
		`Aviation`,
		`Marine`
	]
},
```

## Attachment Structure
When enabled, matching Broadcastify feeds are added to the event metadata as attachments. These attachments follow the same structure used by other event attachments and can be consumed by additional integrations.

Example event output containing Broadcastify feed attachments:

```json
{
	"type": "Feature",
	"properties": {
		"metadata": {
			"attachments": [
				{
					"name": "Rail: CSX Charleston Subdivision - Mile Post 378.9 - Goose Creek",
					"link": "https://www.broadcastify.com/listen/feed/40832"
				},
				{
					"name": "Other: NOAA Weather Radio Charleston, SC (KHB29)",
					"link": "https://www.broadcastify.com/listen/feed/43760"
				},
				{
					"name": "Public Safety: Berkeley County Fire/EMS Dispatch - VHF",
					"link": "https://www.broadcastify.com/listen/feed/45129"
				}
			]
		}
	}
}
```