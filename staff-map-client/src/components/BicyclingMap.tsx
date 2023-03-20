import { memo } from 'react'
import type {MapProps} from "./types";
import PropTypes from 'prop-types'
import {GoogleMap, BicyclingLayer, useJsApiLoader} from '@react-google-maps/api'
import MapLoading from "./MapLoading";
import envVars from "../lib/env-vars";

const ExampleBicyclingPropTypes = {
    styles: PropTypes.shape({
        container: PropTypes.object.isRequired,
    }).isRequired,
}

const center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: -180,
}

function onClick(...args: any[]) {
    console.log('onClick args: ', args)
}

function onBicyclingLayerLoad (bicyclingLayer: google.maps.BicyclingLayer) {
    // Do something with bicyclingLayer
    console.log('bicyclingLayer: ', bicyclingLayer)
}

const onMapLoad = (map: google.maps.Map) => {
    console.log('map: ', map)
}

function ExampleBicycling({ styles }: MapProps) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: envVars.GOOGLE_MAPS_API_KEY
    })

    if (!isLoaded) {
        return <MapLoading />
    }

    return (
        <div className='map'>
            <div className='map-container'>
                <GoogleMap
                    id='bicycling-example'
                    mapContainerStyle={styles.container}
                    zoom={2}
                    center={center}
                    onClick={onClick}
                    onLoad={onMapLoad}
                >
                    <BicyclingLayer onLoad={onBicyclingLayerLoad} />
                </GoogleMap>
            </div>
        </div>
    )
}

ExampleBicycling.propTypes = ExampleBicyclingPropTypes

export default memo(ExampleBicycling)
