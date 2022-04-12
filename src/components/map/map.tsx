import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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

interface GoogleMapsProps {
  currentWindow: null | JSX.Element;
  setCurrentWindow: React.Dispatch<React.SetStateAction<null | JSX.Element>>;
  map: google.maps.Map | null;
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
}

export function GoogleMap(props: GoogleMapsProps) {
  const { setCurrentWindow, map, setMap } = props;

  const queryParams = new URLSearchParams(window.location.search);

  const {
    lng: lngProp,
    lat: latProp,
    zoom: zoomProp,
  } = {
    lng: queryParams.get('lng'),
    lat: queryParams.get('lat'),
    zoom: queryParams.get('zoom'),
  };

  const center = {
    lng: lngProp ? Number(lngProp) : -95.2510135,
    lat: latProp ? Number(latProp) : 38.961156294983,
  };
  const zoom = zoomProp ? Number(zoomProp) : 13;

  const ref = useRef<HTMLDivElement>(null);
    
  const [isFetching, setIsFetching] = useState(false);
  const [cameraMarkerAssociative, setCameraMarkerAssociative] = useState<
        Record<string, [google.maps.Marker, Camera]>
    >({});

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
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

        const center = bounds?.getCenter();
        const currentPath = window.location.pathname ?? '/';
        window.history.pushState({}, '', `${currentPath}?lat=${center?.lat()}&lng=${center?.lng()}&zoom=${map.getZoom()}`);
        const transformedBounds = transformGoogleBounds(map.getBounds());

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
                scaledSize: new google.maps.Size(24, 24), // scaled size
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
          Object.values(merged).forEach(async ([marker, camera]) => {
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

interface GoogleMapWrapperProps {
  map: google.maps.Map | null;
  setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>;
}

export default function GoogleMapWrapper(props: GoogleMapWrapperProps) {
  const [currentWindow, setCurrentWindow] = useState<JSX.Element | null>(null);

  return (
    <>
      {currentWindow}
      <GoogleMap
        currentWindow={currentWindow}
        setCurrentWindow={setCurrentWindow}
        {...props}
      />
    </>
  );
}
