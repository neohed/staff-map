import React from "react";
import type { FC } from 'react'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {Combobox} from '@headlessui/react'
import "./Places.css"

type PlacesProps = {
    getPlace: (position: google.maps.LatLngLiteral) => void;
}

const Places: FC<PlacesProps> = ({getPlace}) => {
    const {
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions,
    } = usePlacesAutocomplete({
        callbackName: '__googleMapsCallback',
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    });

    const handleSelect = async (val: string) => {
        setValue(val, false);
        clearSuggestions();

        const results = await getGeocode({address: val});
        const {lat, lng} = await getLatLng(results[0]);
        getPlace({lat, lng});
    }

    return (
        <div className="places">
            <Combobox
                onChange={handleSelect}
            >
                <Combobox.Input
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    placeholder="Search an address"
                    readOnly={!ready}
                />
                <Combobox.Options>
                    {status === "OK" && data.map(({place_id, description}: {place_id: string, description: string}) => (
                        <Combobox.Option key={place_id} value={description}>
                            {description}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Combobox>
        </div>
    )
}

export default Places
