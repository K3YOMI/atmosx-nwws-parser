# NTFY Integration

Integration with [ntfy](https://ntfy.sh) allows processed weather events and products to be published to configured ntfy topics. Parsed events are converted into notification payloads and delivered to subscribed clients, allowing applications and services to receive real-time updates without maintaining a direct connection to the event processing system.

The ntfy integration uses a topic-based publish and subscribe system, allowing multiple clients to receive the same event notifications. Supported ntfy clients can receive messages across desktop applications, mobile devices, and self-hosted ntfy deployments.

By default, authentication credentials are not required when using a public ntfy server. Username and password credentials are only required when the configured ntfy server has authentication enabled for publishing or subscribing. To setup NTFY locally, follow the guide [here](https://ntfy.sh/docs/install/).

If you don't require `username` and `password` for authentication, simply remove the `Credentials` section.


The ntfy client is available through the [Google Play Store](https://play.google.com/store/apps/details?id=io.heckel.ntfy) and the [Apple App Store](https://apps.apple.com/app/ntfy/id1625396347).

This integration is optional and can be enabled through the `Manager` initialization. See [Listener Documentation](./DOCS_LISTENERS.md) for additional formatting options:

```ts
NotifyServer: {
	Enabled: false,
	Server: "https://ntfy.domainname.xxx",
	Attachments: "https://domainname.xxx/ftp/@bucket/EAS/encoded",
	Credentials: {
		Username: "username",
		Password: "password"
	}
},
ListenerSettings: [
	{
		Events: ["Considerable Severe Thunderstorm Warning"],
		NotificationServer: {
			Enabled: true,
			Topic: "severe-thunderstorm-warnings",
			Priority: 5 // 1-5
		},
	}
],
```
> **Attachments** should be the directory where EAS audio messages are stored. Please make sure it's valid and is being properly hosted so NTFY can obtain a direct link to the files

## Post Notification Card Example
The following example demonstrates a generated ntfy notification containing structured weather event information, including event metadata, affected locations, severity information, tracking identifiers, tags, and available attachments.

```text
Considerable Severe Thunderstorm Warning (Issued)

Locations: Somerset, ME
Issued: Tue, 14 Jul 2026 16:51:00 GMT
Expires: Tue, 14 Jul 2026 17:45:00 GMT
Damage Threat: CONSIDERABLE
Estimated Wind Gusts: 70 MPH (RADAR INDICATED)
Estimated Hail Size: 0.88 in (Nickel) (RADAR INDICATED)
Sender: Portland, ME (KGYX)
Tracking: KGYX.SV.W.0034
Tags: Radar Indicated, Nickel Size Hail

Attachments:
[Listen] [View Graphic]
```