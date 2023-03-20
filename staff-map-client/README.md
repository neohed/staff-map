# staff-map-client
This app requires a Google-maps API key to run. See section below for help.

## Todo resources
* https://www.youtube.com/watch?v=2po9_CIRW7I
* https://www.youtube.com/watch?v=8kxYqoY2WwE
* https://www.youtube.com/watch?v=-VJTh7OqoJI
* https://stackoverflow.com/questions/41250087/how-to-deploy-a-react-nodejs-express-application-to-aws
* https://www.opcito.com/blogs/managing-multiple-environment-configurations-in-react-app
* https://dev.to/ajinkabeer/run-a-dynamodb-instance-locally-with-node-js-without-an-aws-account-58k6
* https://bilalalghazi.medium.com/deploying-react-node-js-application-to-amazon-ec2-instance-a89140ab6aab
* https://developers.google.com/maps/documentation/javascript/layers
* https://martinfowler.com/articles/modularizing-react-apps.html


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


