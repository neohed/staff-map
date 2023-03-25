import React, { useReducer } from "react";
import { LoadScript } from '@react-google-maps/api'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import envVars from "../../../lib/env-vars";
import { libraries } from "./map-options";
import Layout from './Layout';
import Map from './Map';
import MapLoading from "./MapLoading";
import type { MapPlace } from "./types";

const onLoad = () => console.log('gmaps scripts loaded')
const onError = (err: Error) => console.log('onError: ', err)

export type MapDataState = {
    office: MapPlace[];
};

type Action =
    | { type: 'set-person' }
    | { type: 'set-office'; payload: MapPlace };

const initialState = (): MapDataState => ({
    office: [],
})

function reducer(state: MapDataState, action: Action): MapDataState {
    switch (action.type) {
        case 'set-person':
            return { ...state };
        case 'set-office':
            return { ...state, office: [...state.office, action.payload] };
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
            <DndProvider backend={HTML5Backend}>
                <Layout
                    setOffice={
                        office => dispatch({ type: 'set-office', payload: { type: 'Office', lat: office.lat, lng: office.lng} })
                    }
                    main={
                        <Map
                            mapDataState={state}
                            setOffice={
                                office => dispatch({ type: 'set-office', payload: { type: 'Office', lat: office.lat, lng: office.lng} })
                            }
                        />
                    }
                />
            </DndProvider>
        </LoadScript>
    )
}

export default MapPage;
