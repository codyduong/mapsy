import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Status } from '@googlemaps/react-wrapper';
import { CircularProgress } from '@mui/material';
import { transformGoogleBounds, transformLatLngToPoint } from './map.util';
import api, { Camera } from '../../api';
import { CurrentWindow } from './map.currentWindow';

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

interface GoogleMapsProps {
    currentWindow: null | JSX.Element;
    setCurrentWindow: React.Dispatch<React.SetStateAction<null | JSX.Element>>;
}

export function GoogleMap(props: GoogleMapsProps) {
    const { currentWindow, setCurrentWindow } = props;

    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();
    const [isFetching, setIsFetching] = useState(false);
    const [cameraMarkerAssociative, setCameraMarkerAssociative] = useState<
        Record<string, [google.maps.Marker, Camera]>
    >({});

    // navigator.geolocation.getCurrentPosition(
    //     (position: GeolocationPosition) => {
    //         pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude,
    //         };
    //     }
    // );

    useEffect(() => {
        if (ref.current && !map) {
            setMap(
                new window.google.maps.Map(ref.current, {
                    center: { lng: 38.957099, lat: -95.254776 },
                    zoom: 6,
                    disableDefaultUI: true,
                    restriction: {
                        latLngBounds: LAWRENCE_BOUNDS,
                        strictBounds: false,
                    },
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

            // bounds_changed is called too often, instead use idle
            map.addListener('idle', async () => {
                const bounds = map.getBounds();

                const transformedBounds = transformGoogleBounds(
                    map.getBounds()
                );
                if (!isFetching) {
                    setIsFetching(true);
                    const boundedCameras = await api.getCamerasInBounds(
                        transformedBounds
                    );
                    const camMarkers: Record<
                        string,
                        [google.maps.Marker, Camera]
                    > = {};
                    for (const camera of boundedCameras) {
                        const marker = new google.maps.Marker({
                            position: new google.maps.LatLng(
                                camera.lat,
                                camera.lng
                            ),
                            title: camera.label,
                            icon: {
                                url: require('./camera.png'), // url
                                scaledSize: new google.maps.Size(32, 32), // scaled size
                                anchor: new google.maps.Point(16, 16),
                            },
                            collisionBehavior: 'REQUIRED_AND_HIDES_OPTIONAL',
                        });
                        camMarkers[camera.label] = [marker, camera];
                    }
                    const merged = {
                        ...camMarkers,
                        ...cameraMarkerAssociative,
                    };
                    Object.values(merged).forEach(([marker, camera]) => {
                        map && marker.setMap(map);
                        marker.addListener('click', () => {
                            const point = transformLatLngToPoint(
                                new google.maps.LatLng(marker.getPosition()!),
                                map
                            );
                            setCurrentWindow(
                                <CurrentWindow
                                    x={point.x}
                                    y={point.y}
                                    label={marker.getTitle()!}
                                    url={camera.image}
                                    unmountSelf={() => {
                                        setCurrentWindow(null);
                                    }}
                                />
                            );
                        });
                    });
                    setCameraMarkerAssociative(merged);
                    setIsFetching(false);
                }
            });
        }
    }, [map, isFetching, cameraMarkerAssociative, setCurrentWindow]);

    return (
        <WrapperDiv>
            <div ref={ref} id="map" />
        </WrapperDiv>
    );
}

export default function GoogleMapWrapper() {
    const [currentWindow, setCurrentWindow] = useState<JSX.Element | null>(
        null
    );

    return (
        <>
            {currentWindow}
            <GoogleMap
                currentWindow={currentWindow}
                setCurrentWindow={setCurrentWindow}
            />
            ;
        </>
    );
}
