import React from "react";
import {LoadScript} from '@react-google-maps/api'
import envVars from "../../../lib/env-vars";
import {libraries} from "./map-options";
import Layout from './Layout';
import Map from './Map';
import MapLoading from "./MapLoading";

const onLoad = () => console.log('script loaded')
const onError = (err: Error) => console.log('onError: ', err)

const MapPage = () => {
    //const [isLoaded, setIsLoaded] = useState<boolean>(false);

    return (
        <LoadScript
            id="staff-maps-id"
            googleMapsApiKey={envVars.GOOGLE_MAPS_API_KEY}
            region='EN'
            version='weekly'
            onLoad={onLoad}
            onError={onError}
            loadingElement={<MapLoading />}
            libraries={libraries}
            preventGoogleFontsLoading={false}
        >
            <Layout
                main={
                    <Map
                    />
                }
            />
        </LoadScript>
    )
}

export default MapPage;
