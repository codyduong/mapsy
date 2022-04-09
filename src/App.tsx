import GoogleMap from './components/map';
import { ThemeProvider } from './contexts/Theme';
import styled from 'styled-components';
import { SearchBar } from './components/searchbar';

const AppWrapper = styled.div`
    width: 100vw;
    height: 100vh;
`;

function App() {
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
