import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const LAWRENCE_BOUNDS = {
	north: 39.033663,
	south: 38.908504,
	west: -95.336075,
	east: -95.165952,
};

const Wrapper = styled.div`
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	position: absolute;
`;

export function GoogleMap({ center, zoom }: { center: google.maps.LatLngLiteral; zoom: number }) {
	const ref = useRef();

	useEffect(() => {
		// @ts-ignore
		new window.google.maps.Map(ref.current, {
			center,
			zoom,
			mapTypeControl: false,
			restriction: {
				latLngBounds: LAWRENCE_BOUNDS,
				strictBounds: false,
			},
		});
	});

	// @ts-ignore
	return (
		<Wrapper>
			{/* @ts-ignore */}
			<div ref={ref} id="map" />
		</Wrapper>
	);
}
