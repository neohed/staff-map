# staff-map-client

This app requires a Google-maps API key to run. See section below for help.

## Configuring Google Maps API Key

1. Obtain an API key for google-maps:
[Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)
2. Create a ```.env.local``` file in project root (same level as ```package.json```)
3. Create an env var in that file: ```REACT_APP_GOOGLE_MAPS_API_KEY=<your API key obtained from step 1>```

> It's recommended to restrict your key by service. The required services are listed below:

* Directions API
* Geocoding API
* Maps JavaScript API
* Places API


