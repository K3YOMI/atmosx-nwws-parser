const { Manager, setSettings, getSettings, getListener } = require(`../dist/cjs/index.cjs`)

const NOAAWeatherWireService = new Manager({
    database: `shapefile-manager.db`,
    wire: true,
    journal: false,
    noaa_weather_wire_service_settings: {
        reconnection_settings: {
            enabled: true,
            interval: 60,
        },
        credentials: {
            username: `username_here`,
            password: `password_here`,
            nickname: "nick_name_here (@atmosx/event-product-parser/3.0)",
        },   
        cache: {
            enabled: true,
            max_db_history: 15000,
            max_db_cache_size: 500,
        },
        preferences: {
            disable_ugc: false,
            disable_vtec: false,
            disable_text: false,
        }
    },
    national_weather_service_settings: {
        interval: 15,
        endpoint: `https://api.weather.gov/alerts/active`,
    },
    global_settings: {
        better_event_parsing: true,
        ignore_geometry_parsing: false,
        shapefile_coordinates: true,
        filtering: {
            events: [
                "Tornado Emergency", "PDS Tornado Warning", "Tornado Warning",
                "Confirmed Tornado Warning", "Radar Indicated Tornado Warning",
                "Special Marine Warning (TPROB)", "PDS Tornado Watch", "Tornado Watch",
                "EDS Severe Thunderstorm Warning (TPROB)", "EDS Severe Thunderstorm Warning",
                "Destructive Severe Thunderstorm Warning (TPROB)", "Destructive Severe Thunderstorm Warning",
                "Considerable Severe Thunderstorm Warning (TPROB)", "Considerable Severe Thunderstorm Warning",
                "Severe Thunderstorm Warning (TPROB)", "Severe Thunderstorm Warning",
                "Severe Thunderstorm Watch",
                "Flash Flood Emergency", "Flash Flood Warning",
                "Flash Flood Watch",
                "Tsunami Warning", "Tsunami Watch",
                "Tsunami Advisory", "Special Marine Warning",
                "Earthquake Warning",
                "Hurricane Warning", "Hurricane Watch",
                "Tropical Storm Warning",
                "Winter Storm Warning", "Blizzard Warning",
                "Ice Storm Warning", "Snow Squall Warning",
                "Winter Weather Advisory", "Extreme Cold Watch"
            ],
            filtered_icao: [],
            ignored_icao: [],
            ignored_events: [],
            ugc_filter: [],
            state_filter: [],
            ignore_test_products: true,
        },
        eas_settings: {
            directory: null,
            intro_wav: null,
        }
    }
})


NOAAWeatherWireService.on(`log`, (data) => {
    console.log(data)
})

NOAAWeatherWireService.on(`onEventStatus`, (data) => { 
    console.log(`[${data.type}]: ${data.event.properties.event} (${data.event.properties.status}) (${data.event.properties.metadata.tracking})`)
})