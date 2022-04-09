import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Status } from '@googlemaps/react-wrapper';
import { CircularProgress } from '@mui/material';
import { Bounds, transformGoogleBounds } from './map.util';
import api from '../../api';

const LAWRENCE_BOUNDS = {
    north: 39.033663,
    south: 38.908504,
    west: -95.336075,
    east: -95.165952,
};

const WrapperDiv = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
`;

const LoadingWrapper = styled.div`
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    align-content: center;
`;

const center = { lng: 38.957799, lat: -95.254341 };
const zoom = 8;

export function GoogleMap() {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();
    const [bounds, setBounds] = useState<Bounds>();
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (ref.current && !map) {
            setMap(
                new window.google.maps.Map(ref.current, {
                    center,
                    zoom,
                    mapTypeControl: false,
                    restriction: {
                        latLngBounds: LAWRENCE_BOUNDS,
                        strictBounds: false,
                    },
                    streetViewControlOptions: null,
                })
            );
        }
    }, [ref, map]);

    useEffect(() => {
        if (map) {
            ['click', 'idle'].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );

            // https://developers.google.com/maps/documentation/javascript/events
            //map.addListener('click', onClick);
            map.addListener('bounds_changed', () => {
                setBounds(transformGoogleBounds(map.getBounds()));
            });
        }
    }, [map]);

    useEffect(() => {
        (async () => {
            if (bounds && !isFetching) {
                setIsFetching(true);
                console.log(await api.getCamerasInBounds(bounds));
                setIsFetching(false);
            }
        })();
    }, [bounds, setIsFetching]);

    return (
        <WrapperDiv>
            <div ref={ref} id="map" />
        </WrapperDiv>
    );
}

export default function GoogleMapWrapper() {
    return <GoogleMap />;
}
