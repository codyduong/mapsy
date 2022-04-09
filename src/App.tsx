import { GoogleMap } from './components/map';

import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { ReactElement } from 'react';

const render = (status: Status): ReactElement => {
	if (status === Status.LOADING) return <h3>{status} ..</h3>;
	if (status === Status.FAILURE) return <h3>{status} ...</h3>;
	// @ts-ignore
	return null;
};

function App() {
	const center = { lng: 38.957799, lat: -95.254341 };
	const zoom = 8;

	return (
		<>
			<Wrapper apiKey={''} render={render}>
				<GoogleMap center={center} zoom={zoom}></GoogleMap>
			</Wrapper>
		</>
	);
}

export default App;
