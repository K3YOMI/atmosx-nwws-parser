# EAS Audio Generation (Text-to-Speech)

[Emergency Alert System (EAS)](https://www.fcc.gov/emergency-alert-system) audio generation allows simulated EAS-style audio messages to be created using text-to-speech synthesis and generated EAS tones.

This feature is intended for development, testing, and demonstration purposes by generating audio output from processed weather events without requiring access to broadcast equipment or live EAS systems. You can view a [sample generation here](../samples/eas_generation_sample.wav).

> **Note:** Generated audio messages do not contain real broadcast EAS headers or official activation tones. They are intended for private listening, testing, and development purposes only and must not be used as actual emergency broadcasts.

This integration is optional and can be enabled through the `Manager.ListenerSettings` and `Manager.GlobalSettings.ArchiveSettings` initialization configurations. See [ListenerSettings Documentation](./LISTENER_SETTINGS.md) for additional configuration options:

```ts
ListenerSettings: [
	{
		Events: ["*Severe Thunderstorm Warning*"],
		Uploads: {
			EAS: true
		},
	}
],
GlobalSettings: {
	ArchiveSettings: {
		TTL: 30,
		EasDirectory: `/ftp/@bucket/EAS`,
		EasToneout: `toneout.wav`,
	}
}
```

Generated EAS audio files are stored using the configured archive directory and are automatically managed using the `TTL` (time-to-live) value. The `TTL` setting controls how long generated audio files remain available before they are automatically expired and removed, helping prevent outdated alert audio from accumulating over time. Additionally, a custom tone-out message can be configured to be prepended to the generated TTS audio before speech synthesis begins. This allows custom alert tones, announcements, or other audio segments to play before the generated message. The custom tone-out file must be provided as a .wav file using 16-bit PCM (PCM_S16LE) encoding with a mono channel layout and an 8 kHz sample rate.

> **Performance Notice**: Generating custom audio for every incoming event can significantly increase processing time and CPU usage. Text-to-speech generation requires additional resources and may delay event processing when enabled for high-volume event streams. It is recommended to limit audio generation to specific event types or priority alerts.