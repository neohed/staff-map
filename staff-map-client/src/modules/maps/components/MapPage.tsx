import React, {useReducer} from "react";
import {LoadScript} from '@react-google-maps/api'
import envVars from "../../../lib/env-vars";
import {libraries} from "./map-options";
import Layout from './Layout';
import Map from './Map';
import MapLoading from "./MapLoading";

const onLoad = () => console.log('gmaps scripts loaded')
const onError = (err: Error) => console.log('onError: ', err)

export type MapDataState = {
    office: google.maps.LatLngLiteral | undefined;
};

type Action =
    | { type: 'nada' }
    | { type: 'set-office'; payload: google.maps.LatLngLiteral };

const initialState = (): MapDataState => ({
    office: undefined,
})

function reducer(state: MapDataState, action: Action): MapDataState {
    switch (action.type) {
        case 'nada':
            return { ...state };
        case 'set-office':
            return { ...state, office: action.payload };
    }
}

const MapPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState());

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
                setOffice={
                    office => dispatch({ type: 'set-office', payload: office })
                }
                main={
                    <Map
                        mapDataState={state}
                    />
                }
            />
        </LoadScript>
    )
}

export default MapPage;
