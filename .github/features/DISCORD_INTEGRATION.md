# Discord Webhook Integration

Integration with [Discord Webhooks](https://discord.com/developers/docs/resources/webhook) allows processed weather events and products to be sent directly to configured Discord channels.

Using Discord Webhooks, parsed events can be converted into Discord compatible messages and automatically posted when new weather products are received. Messages can include weather alert information, event metadata, affected locations, timestamps, severity details, tracking identifiers, and related attachments such as graphics or external resources.

This integration uses Discord's HTTP webhook system, allowing notifications to be sent without requiring a dedicated Discord bot or maintaining a persistent connection.

By default, timestamps use Discord's standard timestamp formatting. This allows Discord clients to automatically display event times in the user's local timezone regardless of their configured region.

This integration is optional and can be enabled through the `Manager.ListenerSettings` initialization configuration. See [ListenerSettings Documentation](.github/features/LISTENER_SETTINGS.md) for more formatting information:

```ts
ListenerSettings: [
	{
		Events: ["*Severe Thunderstorm Warning*"],
		Webhook: {
			Enabled: true,
			Destination: "https://discord.com/api/webhooks/...",
			Title: "AtmosphericX - Severe Thunderstorm Warnings",
			Message: "<@&XXXXXXXXXXXXXXXXX>",
			Ratelimit: 2
		},
	}
],
```

## Webook Example
```text
Considerable Severe Thunderstorm Warning (Issued)

Locations: Somerset, ME
Issued: an hour ago
Expires: 31 minutes ago
Damage Threat: CONSIDERABLE
Estimated Wind Gusts: 70 MPH (RADAR INDICATED)
Estimated Hail Size: 0.88 (Nickel) (RADAR INDICATED)
Tags: Radar Indicated, Nickel Size Hail
Sender: Portland, ME (KGYX)
Tracking: KGYX.SV.W.0034
Logs: 1

Description
	The National Weather Service in Gray Maine has issued a
	* Severe Thunderstorm Warning for...
	Northwestern Somerset County in west central Maine...
	* Until 145 PM EDT.
	* At 1250 PM EDT, a severe thunderstorm was located 29 miles north of
	Jackman, moving southeast at 60 mph.
	HAZARD...70 mph wind gusts and nickel size hail.
	SOURCE...Radar indicated.
	IMPACT...Expect considerable tree damage. Damage is likely to
	mobile homes, roofs, and outbuildings.
	* Locations impacted include...
	Jackman, Seboomook, Misery Gore, Sandwich Academy Grant, Moose
	River, Long Pond, Parlin Pond, Forsyth, Tomhegan, Dennistown
	Plantation, Chase Stream, Rockwood Strip, Soldiertown, Sandy Bay,
	Johnson Mountain, Plymouth, Taunton And Raynham Academy Grant,
	Pittston Academy Grant, Brassua, and Sapling.
	PRECAUTIONARY/PREPAREDNESS ACTIONS...
	For your prote
	[Message truncated due to length]

Attachments:
	• Public Safety: Anson/Madison/Starks Ambulance
	• Public Safety: Kennebec, Somerset, and Waldo ...
	• Public Safety: Somerset County Fire
```