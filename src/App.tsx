import { ThemeProvider } from './contexts/Theme';
import styled from 'styled-components';
import GoogleMap from './components/map';
import SearchBar from './components/search';
import { CircularProgress } from '@mui/material';
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import { useState } from 'react';
import AppLogin from './components/App.login';

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const LoadingWrapper = styled.div`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  align-content: center;
`;

const render = (status: Status): JSX.Element => {
  if (status === Status.LOADING)
    return (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    );
  if (status === Status.FAILURE)
    return (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    );
  return <></>;
};

function App() {
  const [accountModalVisible, setAccountModalVisible] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  return (
    <ThemeProvider>
      <AppWrapper>
        <Wrapper
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}
          render={render}
          libraries={['places']}
        >
          {accountModalVisible && (
            <AppLogin setAccountModalVisible={setAccountModalVisible} />
          )}
          <SearchBar
            setAccountModalVisible={setAccountModalVisible}
            map={map}
            setMap={setMap}
          />
          <GoogleMap map={map} setMap={setMap} />
        </Wrapper>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
