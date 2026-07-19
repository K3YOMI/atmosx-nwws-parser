/*
              _                             _               _     __   __
         /\  | |                           | |             (_)    \ \ / /
        /  \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ _  ___ \ V / 
       / /\ \| __| '_ ` _ \ / _ \/ __| '_ \| '_ \ / _ \ '__| |/ __| > <  
      / ____ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ |  | | (__ / . \ 
     /_/    \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  |_|\___/_/ \_\
                                     | |                            
                                     |_|                                                                                                                

    Created with ♥ by the AtmosphericX Team (KiyoWx, StarflightWx, & CJ Ziegler)
    Discord: https://atmosphericx-discord.scriptkitty.cafe
    Ko-Fi: https://ko-fi.com/k3yomi
    Documentation: http://localhost/documentation | https://atmosphericx.scriptkitty.cafe/documentation

    Internal Package: @atmosx/event-product-parser

*/

export const dict_tags = {
    TORNADO: [
        { match: /A Large And Extremely Dangerous Tornado/i, tag: "Large and Dangerous Tornado" },
        { match: /This Is A Particularly Dangerous Situation/i, tag: "Particularly Dangerous Situation" },
        { match: /Weather Spotters Confirmed Tornado/i, tag: "Weather Spotters Confirmed Tornado" },
        { match: /Law Enforcement Confirmed Tornado/i, tag: "Law Enforcement Confirmed Tornado" },
        { match: /Public Confirmed Tornado/i, tag: "Public Confirmed Tornado" },
        { match: /Radar Confirmed/i, tag: "Radar Confirmed" },
        { match: /Radar Indicated Rotation/i, tag: "Radar Indicated Rotation" },
        { match: /Radar Indicated(?! Rotation)/i, tag: "Radar Indicated" },
        { match: /A Tornado Is On The Ground/i, tag: "Tornado On The Ground" },
        { match: /Tornado Was Reported Briefly On The Ground/i, tag: "Tornado Briefly On Ground" },
        { match: /Weather Spotters Reported Funnel Cloud/i, tag: "Confirmed Funnel Cloud" },
        { match: /Spotters Indicate That A Funnel Cloud Continues With This Storm/i, tag: "Funnel Cloud Continues" },
        { match: /A Severe Thunderstorm Capable Of Producing A Tornado/i, tag: "Tornado Possible" },
        { match: /A Tornado May Develop At Any Time/i, tag: "Tornado May Develop" },
        { match: /A Tornado Watch Remains In Effect/i, tag: "Active Tornado Watch" },
        { match: /Complete Destruction Is Possible/i, tag: "Extremely Damaging Tornado" },
        { match: /Potentially Deadly Tornado/i, tag: "Deadly Tornado" },
        { match: /Life-Threatening Situation/i, tag: "Life Threatening Situation" },
        { match: /Capable Of Producing A Landspout/i, tag: "Landspout Possible" },
    ],

    WIND: [
        { match: /Expect Wind Damage/i, tag: "Wind Damage" },
        { match: /Destructive Winds/i, tag: "Destructive Winds" },
        { match: /Widespread Wind Damage/i, tag: "Widespread Wind Damage" },
        { match: /Significant Wind Damage/i, tag: "Significant Wind Damage" },
        { match: /Tornado Like Wind Speeds/i, tag: "Tornado-Like Wind Speeds" },
        { match: /Wind Damage With This Storm Will Occur/i, tag: "Immediate Wind Damage Threat" },
        { match: /90 mph wind gusts/i, tag: "90 MPH Wind Gusts" },
        { match: /Winds Will Strengthen/i, tag: "Strengthening Winds" },
        { match: /Wind Gusts Of \d+ To \d+ MPH/i, tag: "Strong Wind Gusts" },
        { match: /Wind Gusts Of \d+ MPH/i, tag: "Strong Wind Gusts" },
        { match: /Gusty Winds/i, tag: "Gusty Winds" },
        { match: /Could Knock Down Tree Limbs/i, tag: "Tree Damage Possible" },
        { match: /Blow Around Unsecured Objects/i, tag: "Loose Object Damage Possible" },
    ],

    HAIL: [
        { match: /Hail Damage To Vehicles Is Expected/i, tag: "Vehicle Damaging Hail" },
        { match: /Extremely Large Hail/i, tag: "Extremely Large Hail" },
        { match: /(?<!Extremely )Large Hail/i, tag: "Large Hail" },
        { match: /Tennis Ball Size Hail/i, tag: "Tennis Ball Size Hail" },
        { match: /Baseball Size Hail/i, tag: "Baseball Size Hail" },
        { match: /Golf Ball Size Hail/i, tag: "Golf Ball Size Hail" },
        { match: /Quarter Size Hail/i, tag: "Quarter Size Hail" },
        { match: /Ping Pong Ball Size Hail/i, tag: "Ping Pong Ball Size Hail" },
        { match: /Nickel Size Hail/i, tag: "Nickel Size Hail" },
        { match: /Hail Driven By Severe Winds/i, tag: "Wind Driven Hail" },
        { match: /Prepare Immediately For Large Hail/i, tag: "Large Hail" },
        { match: /Half Inch Hail/i, tag: "Half Inch Hail" },
        { match: /0\.50 IN/i, tag: "Half Inch Hail" },
    ],

    LIGHTNING: [
        { match: /Frequent Lightning/i, tag: "Frequent Lightning" },
        { match: /Deadly Cloud To Ground Lightning/i, tag: "Deadly Cloud To Ground Lightning" },
        { match: /Continuous Cloud To Ground Lightning/i, tag: "Continuous Cloud To Ground Lightning" },
        { match: /Lightning Can Strike Out To 15 Miles/i, tag: "Extreme Lightning Range" },
        { match: /Frequent Cloud To Ground Lightning/i, tag: "Frequent Cloud To Ground Lightning" },
        { match: /Lightning Can Strike \d+ Miles Away/i, tag: "Lightning Safety Threat" },
    ],

    FLOODING: [
        { match: /Flash Flooding Caused By Thunderstorms/i, tag: "Thunderstorm Flash Flooding" },
        { match: /Flash Flooding Caused By Heavy Rain/i, tag: "Heavy Rain Flash Flooding" },
        { match: /Torrential Rainfall/i, tag: "Torrential Rainfall" },
        { match: /May Lead To Flash Flooding/i, tag: "Flash Flooding Possible" },
        { match: /Minor Flooding Is Occurring/i, tag: "Minor Flooding Occurring" },
        { match: /Do Not Drive Your Vehicle Through Flooded Roadways/i, tag: "Flooded Roadways" },
        { match: /Localized Flooding/i, tag: "Localized Flooding Possible" },
    ],

    WINTER: [
        { match: /Frostbite And Hypothermia Are Likely/i, tag: "Frostbite and Hypothermia Likely" },
        { match: /Very Cold Temperatures Can Lead To Hypothermia/i, tag: "Hypothermia Risk" },
        { match: /Hypothermia If Precautions Are Not Taken/i, tag: "Hypothermia Risk" },
        { match: /Frostbite And Hypothermia Will Occur If Unprotected Skin/i, tag: "Frostbite Risk" },
        { match: /Temperatures Could Cause Ruptured Water Pipes/i, tag: "Ruptured Water Pipes Possible" },
        { match: /Blowing Snow Which Could Reduce Visibility/i, tag: "Reduced Visibility From Blowing Snow" },
        { match: /Lake Effect Snow Expected/i, tag: "Lake Effect Snow" },
        { match: /Slick And Icy Spots On Roads/i, tag: "Icy Roads" },
        { match: /Hazardous Roadways And Black Ice/i, tag: "Black Ice" },
        { match: /Icy Patches May Be More Common On Bridges/i, tag: "Bridge Icing" },
    ],

    MARINE: [
        { match: /Rip Currents Can Sweep Even The Best Swimmer/i, tag: "Dangerous Rip Currents" },
        { match: /Small Craft Could Be Damaged/i, tag: "Small Craft Damage Possible" },
        { match: /No Tsunami Threat/i, tag: "No Tsunami Threat" },
        { match: /Tsunami Threat Exists/i, tag: "Tsunami Threat Exists" },
        { match: /Tsunami Threat(?! Exists)/i, tag: "Active Tsunami Threat" },
    ],

    SAFETY: [
        { match: /Seek Shelter Now/i, tag: "Seek Shelter Now" },
        { match: /Seek Shelter Immediately/i, tag: "Seek Shelter Immediately" },
        { match: /Move To An Interior Room/i, tag: "Move To Interior Room" },
        { match: /Potentially Deadly Storm/i, tag: "Potentially Deadly Storm" },
        { match: /Serious Injury And Significant Property Damage/i, tag: "Serious Damage Possible" },
        { match: /People And Animals Outdoors Will Be Injured/i, tag: "Outdoor Injury Risk" },
        { match: /IMMINENT DANGEROUS WEATHER CONDITIONS/i, tag: "Imminent Dangerous Weather" },
        { match: /If Outdoors, Consider Seeking Shelter/i, tag: "Seek Shelter If Outdoors" },
        { match: /Persons In Campgrounds Should Consider Seeking Sturdy Shelter/i, tag: "Campground Shelter Recommended" },
        { match: /Move To Safe Shelter Now/i, tag: "Move To Safe Shelter" },
    ],

    SOURCES: [
        { match: /Trained Weather Spotters/i, tag: "Confirmed By Storm Spotters" },
        { match: /Source\.\.\.Public/i, tag: "Confirmed By Public" },
        { match: /Source\.\.\.Amateur Radio/i, tag: "Confirmed By Amateur Radio" },
        { match: /Source\.\.\.Emergency Management/i, tag: "Confirmed By Emergency Management" },
        { match: /Source\.\.\.Law Enforcement Reported/i, tag: "Confirmed By Law Enforcement" },
        { match: /Doppler Radar And Automated Gauges/i, tag: "Confirmed By Radar and Gauges" },
        { match: /Doppler Radar(?! And Automated Gauges)/i, tag: "Confirmed By Radar" },
        { match: /Broadcast Media/i, tag: "Confirmed By Broadcast Media" },
        { match: /Media Reported/i, tag: "Confirmed By Media" },
    ],

    GENERAL: [
        { match: /Travel Could Be Very Difficult/i, tag: "Difficult Travel Conditions" },
        { match: /Expect Disruptions/i, tag: "Travel Disruptions Expected" },
        { match: /Slow Down And Allow Extra Time/i, tag: "Allow Extra Travel Time" },
        { match: /Should Exercise Caution/i, tag: "Exercise Caution" },
        { match: /Heat Illnesses/i, tag: "Heat Illness Risk" },
        { match: /\bIntensifying\b/i, tag: "Intensifying Conditions" },
    ],
};