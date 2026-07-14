# Broadcastify Integration

[Broadcastify](https://broadcastify.com) feeds are automatically sourced and stored in your `database` file. Feed information can be linked to processed events using location and metadata matching. This integration allows related Broadcastify feeds and audio URLs to be attached to events, making it easier to access nearby live communications for affected areas. Supported feed sources include **Public Safety**, **NOAA Weather Radio**, **Marine**, **Aviation**, and **Amateur Radio** based on the counties or zones associated with an event. Additionally, this will auto append with the [Discord Webhook Integration](./github/features/DISCORD_INTEGRATION.md) for a more seamless notification experience.

This integration is optional and can be enabled through the `Manager` initialization:
```ts
BroadcastifySettings: {
	BroadcastifyAttachments: true,
	BroadcastifyDatabase: `https://scriptkitty.cafe/ftp/@atmosphericx/assets/broadcastify.json`,
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
When enabled, matching Broadcastify feeds are added to the event metadata as attachments.
Example event output with Broadcastify attachments:

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
