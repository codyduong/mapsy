import { ThemeProvider } from './contexts/Theme';
import styled from 'styled-components';
import GoogleMap from './components/map';
import SearchBar from './components/search';
import { CircularProgress } from '@mui/material';
import { Status, Wrapper } from '@googlemaps/react-wrapper';

const AppWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
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
    return (
        <ThemeProvider>
            <AppWrapper>
                <Wrapper
                    apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}
                    render={render}
                    libraries={['places']}
                >
                    <SearchBar />
                    <GoogleMap />
                </Wrapper>
            </AppWrapper>
        </ThemeProvider>
    );
}

export default App;
