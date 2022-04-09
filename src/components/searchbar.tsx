import { useState } from 'react';
import styled from 'styled-components';
import { DEFAULT_ALL_THEMES } from '../contexts/Theme';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

const SearchBarHeader = styled.div`
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

const SearchBarDiv = styled.div`
  display: flex;
  min-height: 2rem;
  margin-top: 10px;
  padding: 0rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%), 0 -1px 0px rgb(0 0 0 / 2%);
  border-radius: 0.5rem;
  /* @media only screen and (min-width: 0) {
    width: 100vw;
  }
  @media only screen and (min-width: ${DEFAULT_ALL_THEMES.breakpoints.sm}) {
    width: 75vw;
  }
  @media only screen and (min-width: ${DEFAULT_ALL_THEMES.breakpoints.md}) {
    width: 50vw;
  }
  width: 50vw; */
  z-index: 100;
  transition: all 0.5s ease-in-out;
  pointer-events: visible;
`;

const SearchBarIcon = styled.div`
  aspect-ratio: 1;
`;

export const SearchBar = (): JSX.Element => {
    const [search, setSearch] = useState('');

    return (
        <SearchBarHeader>
            <SearchBarDiv>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                        <DirectionsIcon />
                    </IconButton>
                </Paper>
                <SearchBarIcon>
                  
                </SearchBarIcon>
            </SearchBarDiv>
        </SearchBarHeader>
    );
};