import React, {useState} from "react";
import {LoadScript} from '@react-google-maps/api'
import envVars from "../../../lib/env-vars";
import {libraries} from "./map-options";
import Layout from './Layout';
import Map from './Map';

const onLoad = () => console.log('script loaded')
const onError = (err: Error) => console.log('onError: ', err)
const Loading = <div>Loading...</div>;

const MapPage = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    return (
        <LoadScript
            id="staff-maps-id"
            googleMapsApiKey={envVars.GOOGLE_MAPS_API_KEY}
            region='EN'
            version='weekly'
            onLoad={onLoad}
            onError={onError}
            loadingElement={Loading}
            libraries={libraries}
            preventGoogleFontsLoading={false}
        >
            <Layout
                isReady={isLoaded}
                main={
                    <Map
                        setReady={setIsLoaded}
                    />
                }
            />
        </LoadScript>
    )
}

export default MapPage;