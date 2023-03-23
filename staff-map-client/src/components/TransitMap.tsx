import { memo} from 'react'
import PropTypes from 'prop-types'
import {GoogleMap, TransitLayer, useJsApiLoader} from '@react-google-maps/api'
import {MapProps} from "../modules/maps";
import envVars from "../lib/env-vars";
import MapLoading from "./MapLoading";

const ExampleTransitPropTypes = {
    styles: PropTypes.shape({
        container: PropTypes.object.isRequired,
    }).isRequired,
}

const center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: -180,
}

const onClick = (...args: any[]) => {
    console.log('onClick args: ', args)
}

const onTransitLayerLoad = (transitLayer: google.maps.TransitLayer) => {
    // Do something with transitLayer
    console.log('transitLayer: ', transitLayer)
}

const onMapLoad = (map: google.maps.Map) => {
    console.log('map: ', map)
}

function ExampleTransit({ styles }: MapProps): JSX.Element {
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
                    id='transit-example'
                    mapContainerStyle={styles.container}
                    zoom={2}
                    center={center}
                    onClick={onClick}
                    onLoad={onMapLoad}
                >
                    <TransitLayer onLoad={onTransitLayerLoad} />
                </GoogleMap>
            </div>
        </div>
    )
}

ExampleTransit.propTypes = ExampleTransitPropTypes

export default memo(ExampleTransit)
