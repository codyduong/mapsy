import React, { ReactElement, useEffect, useRef } from 'react';
import './App.css';

import { Status, Wrapper } from '@googlemaps/react-wrapper';

function MyMapComponent({ center, zoom }: { center: google.maps.LatLngLiteral; zoom: number }) {
	const ref = useRef();

	useEffect(() => {
		// @ts-ignore
		new window.google.maps.Map(ref.current!, {
			center,
			zoom,
		});
	});

	// @ts-ignore
	return <div ref={ref!} id="map" />;
}

const render = (status: Status): ReactElement => {
	if (status === Status.LOADING) return <h3>{status} ..</h3>;
	if (status === Status.FAILURE) return <h3>{status} ...</h3>;
	// @ts-ignore
	return null;
};

function App() {
	const center = { lat: -34.397, lng: 150.644 };
	const zoom = 4;

	return (
		<Wrapper apiKey={'AIzaSyCdrceqUk17BLwecJBBRzLqJXDnvL_NSAE'} render={render}>
			<MyMapComponent center={center} zoom={zoom} />
		</Wrapper>
	);
}

export default App;
