import React from "react";
import GoogleMapReact from 'google-map-react';

//const AnyReactComponent = ({ text, lat, lng }: {text: string; lat: number; lng: number}) => <div>{text}</div>;
/*
                <AnyReactComponent
                    lat={59.955413}
                    lng={-0.152306}
                    text="My Marker"
                />
 */

export default function SimpleMap(){
    const defaultProps = {
        center: {
            lat: 51.502759512400765,
            lng: -0.1523060588198619
        },
        zoom: 11
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
            </GoogleMapReact>
        </div>
    );
}
