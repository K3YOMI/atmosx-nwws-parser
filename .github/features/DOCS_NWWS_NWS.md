## 3.1 - NOAA Weather Wire Service + National Weather Service API

By default, `@atmosx/event-product-parser` uses the [National Weather Service API](https://www.weather.gov/documentation/services-web-api) for product retrieval, as the [NOAA Weather Wire Service Open Interface](https://www.weather.gov/nwws/) (NWWS-OI) requires authentication credentials.

Both sources provide access to NOAA/NWS weather products, but NWWS-OI is recommended for real time applications due to its event based delivery model, faster product availability, and improved reliability. Configuring NWWS-OI credentials enables additional capabilities, including live product ingestion, update tracking, and more complete event handling.

| Feature | NWS API | NWWS-OI |
| --- | --- | --- |
| Credentials Required | ❌ | ✅ |
| Automatic Product Updates | ❌ | ✅ |
| Polling Required | ✅ | ❌ |
| Low Latency Delivery | ❌ | ✅ |
| Continuous Monitoring | ⚠️ Limited | ✅ |
| Production Deployments | ⚠️ Limited | ✅ |
| Event Coverage | ⚠️ Limited | ✅ |
| Product Cache Management | ❌ | ✅ |

## 3.2 - GeoJSON + WMO Formats

`@atmosx/event-product-parser` supports parsing both structured [GeoJSON](https://en.wikipedia.org/wiki/GeoJSON) products and raw text products distributed using the [WMO Format](https://repository.library.noaa.gov/view/noaa/11444).

By default, products retrieved from the [National Weather Service API](https://www.weather.gov/documentation/services-web-api) or [NOAA Weather Wire Service Open Interface](https://www.weather.gov/nwws/) (NWWS-OI) are processed through the library's parsing pipeline, where they are decoded, normalized, and converted into a consistent `GeoJSON` format.

For applications that provide their own product data, manual parsing is also supported. This uses the same NWWS-OI parsing pipeline while bypassing automatic retrieval and stanza caching, allowing raw weather products to be processed directly.



## 3.3 - NOAA Weather Wire Service Authentication

To use the NOAA Weather Wire Service (NWWS-OI), you **must** obtain authentication credentials from the National Weather Service. These credentials are required to establish an XMPP connection and receive real time weather products.

You can request NWWS-OI credentials through the official [NOAA Weather Wire Service request page](https://www.weather.gov/nwws/nwws_oi_request).

> **Note:** Credential requests are manually reviewed by the National Weather Service. Approval may take several business days.


```ts
import { Manager } from "@atmosx/event-product-parser"

const client = new Manager({
    EnableWireService: true, // Use NWWS-OI instead of the NWS API
    NOAAWeatherWireServiceSettings: {
        CredentialSettings: {
            Username: "username", // Provided by NOAA/NWWS-OI
            Password: "password", // Provided by NOAA/NWWS-OI
            Nickname: "ATMSX-B1 (@atmosx/event-product-parser/3.0)", // Nickname
        },
    },
})

// Apply a listener to see if we have connection issues
client.on(`onServiceStatus`, (object) => {
	if (object.type == `online`) {
		console.log(`[ONLINE] ${object.message}`)
	}
})
```

## 3.4 - NWWS-OI Reconnecting

XMPP connections can occasionally be interrupted due to network instability, server maintenance, or temporary outages. To help maintain a persistent connection, `@atmosx/event-product-parser` includes configurable automatic reconnection support.

Automatic reconnection can be enabled or disabled, and the interval between reconnection attempts is measured from the last successfully received stanza. If no stanza is received within the configured interval, the library will automatically attempt to reconnect.

```ts
import { Manager } from "@atmosx/event-product-parser"

const client = new Manager({
    NOAAWeatherWireServiceSettings: {
        ReconnectionSettings: {
            Enabled: true, // Enable automatic reconnection
            ReconnectionInterval: 60, // Seconds since the last received stanza
        },
    },
})

// Apply a listener to see if we have connection issues
client.on("onServiceStatus", (status) => {
    if (status.type === `reconnect`) {
        console.log(`[RECONNECT ATTEMPT] ${status.message}`)
    }
	if (status.type == `online`) {
		console.log(`[ONLINE] ${status.message}`)
	}
})
```

## 3.5 - Stanza Caching

When using the [NOAA Weather Wire Service](https://www.weather.gov/nwws/) (NWWS-OI), previously received stanzas are not replayed when a new connection is established. This is expected behavior due to the real time streaming nature of XMPP.

To handle missed products or recover recent events, `@atmosx/event-product-parser` provides optional stanza caching. This feature allows the library to store a configurable number of received stanzas and optionally load a specified number of previous stanzas when starting or reconnecting. Once the cache limit is reached, older stanzas are removed as new ones are received.

Cached stanzas are ordered by timestamp, allowing recent products to be restored and processed in the correct sequence. Keep in mind that a single stanza may contain multiple events depending on the received product.

```ts
import { Manager } from "@atmosx/event-product-parser"

const client = new Manager({
    NOAAWeatherWireServiceSettings: {
        CacheSettings: {
            Enabled: true, // Enable stanza caching
            MaxDatabaseHistory: 50000, // Maximum stanzas stored
            MaxRetentionHistory: 250, // Maximum stanzas loaded on startup
        },
    },
})
```

When enabled, the cache must complete loading before the XMPP connection is established. This prevents additional load during connection initialization and ensures cached products are available before receiving new events.

> **Tip**: Setting `MaxRetentionHistory` above **500** stanzas may increase startup and recovery times due to the number of events that must be processed. For faster recovery, consider reducing `MaxRetentionHistory`, adjusting filter settings, or disabling unnecessary listeners events uploads and posts.

## 3.6 - Stanza Settings

Stanza settings allow you to enable or disable specific stanza types during processing. Each stanza is categorized based on its characteristics, such as UGC, VTEC, or RawText.

Depending on the detected characteristics, stanzas are routed to the appropriate parsing handler. This provides fine-grained control over which product formats are processed and helps reduce unnecessary parsing overhead.

```ts
import { Manager } from "@atmosx/event-product-parser"

const client = new Manager({
    NOAAWeatherWireServiceSettings: {
        StanzaSettings: {
            DisableUGC: false,   // Disable UGC stanza processing
            DisableVTEC: false,  // Disable VTEC stanza processing
            DisableText: false,  // Disable raw text stanza processing
        },
    },
})
```

> **Notice**: Products such as LSRs, Climate Outlooks, SPC Outlooks, and similar text based products are categorized as RawText because they do not contain UGC or VTEC data. Mesoscale Discussions and Special Weather Statements are processed through UGC parsing. If you are unsure which stanza types to disable, keep all options enabled initially and gradually disable individual types to determine which products your application requires.

## 3.7 - Configuring National Weather Service API

The [National Weather Service API](https://www.weather.gov/documentation/services-web-api) is the default data source used by `@atmosx/event-product-parser`. Unlike NWWS-OI, it does not require authentication and uses a request-based REST API model.

While setup is minimal, the library provides configuration options to customize product retrieval, polling intervals, parsing behavior, caching, and event handling when using the NWS API.

```ts
import { Manager } from "@atmosx/event-product-parser"

const client = new Manager({
    EnableWireService: false, // Use the NWS API instead of NWWS-OI
    NationalWeatherServiceSettings: {
        CallbackInterval: 30, // API polling interval in seconds (Minimum: 15)
        EventsEndpoint: "https://api.weather.gov/alerts/active", // NWS API endpoint
    },
})
```