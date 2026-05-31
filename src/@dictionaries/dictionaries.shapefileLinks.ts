/*
              _                             _               _     __   __
         /\  | |                           | |             (_)    \ \ / /
        /  \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ _  ___ \ V / 
       / /\ \| __| '_ ` _ \ / _ \/ __| '_ \| '_ \ / _ \ '__| |/ __| > <  
      / ____ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ |  | | (__ / . \ 
     /_/    \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  |_|\___/_/ \_\
                                     | |                            
                                     |_|                                                                                                                

    Created with ♥ by the AtmosphericX Team (KiyoWx, StarflightWx, Everwatch1, & CJ Ziegler)
    Discord: https://atmosphericx-discord.scriptkitty.cafe
    Ko-Fi: https://ko-fi.com/k3yomi
    Documentation: http://localhost/documentation | https://atmosphericx.scriptkitty.cafe/documentation

    Internal Package: @atmosx/event-product-parser

*/

interface ShapefilesResponse {
    name: string
    id: string
    link: string
}

export const shapefileLinks: ShapefilesResponse[] = [
    {name: "us_counties", id: "C", link: "https://www.weather.gov/source/gis/Shapefiles/County/c_16ap26.zip"},
    {name: "us_states_territories", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/County/s_16ap26.zip"},
    {name: "fire_weather_zones", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/fz16ap26.zip"},
    {name: "costal_marine_zones", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/mz16ap26.zip"},
    {name: "offshore_marine_zones", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/oz16ap26.zip"},
    {name: "public_forecast_zones", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/z_16ap26.zip"},
    {name: "county_warning_areas", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/w_16ap26.zip"},
    {name: "river_forecast_boundaries", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/Misc/rf05mr24.zip"},
    {name: "high_seas_marine_zones", id: "Z", link: "https://www.weather.gov/source/gis/Shapefiles/WSOM/hz17fe26.zip"}
]