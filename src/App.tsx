import GoogleMap from './components/map';
import { ThemeProvider } from './contexts/Theme';
import styled from 'styled-components';
import { SearchBar } from './components/searchbar';
import api from './api';

const AppWrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;

function App() {
    (async () => {
        console.log(await api.getWeather({        lat: 38.971488,
            lng: -95.325759}));
    })();

    return (
        <ThemeProvider>
            <AppWrapper>
                <SearchBar />
                <GoogleMap />
            </AppWrapper>
        </ThemeProvider>
    );
}

export default App;
