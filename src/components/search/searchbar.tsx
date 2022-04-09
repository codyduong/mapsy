import { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { DEFAULT_ALL_THEMES } from '../../contexts/Theme';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

const SearchBarHeader = styled.div`
    display: flex;
    justify-content: center;
    /* pointer-events: none; */
    position: relative;
    z-index: 100;
`;

const SearchBarDiv = styled.div`
    display: flex;
    min-height: 2rem;
    margin-top: 10px;
    padding: 0rem;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgb(0 0 0 / 20%), 0 -1px 0px rgb(0 0 0 / 2%);
    border-radius: 0.5rem;
    /* position: absolute; */

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
    z-index: 1000;
    transition: all 0.5s ease-in-out;
    pointer-events: visible;
`;

const SearchBarIcon = styled.div`
    aspect-ratio: 1;
`;

interface MainTextMatchedSubstrings {
    offset: number;
    length: number;
}
interface StructuredFormatting {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
    description: string;
    structured_formatting: StructuredFormatting;
}

export default function GoogleMaps() {
    const [placesService, setPlacesService] = useState<
        google.maps.places.AutocompleteService | undefined
    >(undefined);

    const [value, setValue] = useState<PlaceType | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<readonly PlaceType[]>([]);

    const fetchSuggestions = useMemo(() => {
        return throttle(
            (request: { input: string }, callback: (results?: any) => void) => {
                console.log({ request });
                return placesService?.getPlacePredictions(request, callback);
            },
            200
        );
    }, [placesService]);

    useEffect(() => {
        if (!placesService) {
            setPlacesService(
                new window.google.maps.places.AutocompleteService()
            );
        }
    }, [placesService, setPlacesService]);

    useEffect(() => {
        let active = true;

        if (placesService) return;

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetchSuggestions(
            { input: inputValue },
            (results?: readonly PlaceType[]) => {
                if (active) {
                    let newOptions: readonly PlaceType[] = [];

                    if (value) {
                        newOptions = [value];
                    }

                    if (results) {
                        newOptions = [...newOptions, ...results];
                    }

                    setOptions(newOptions);
                }
            }
        );

        return () => {
            active = false;
        };
    }, [value, inputValue, fetchSuggestions, placesService]);

    return (
        <SearchBarHeader>
            <Autocomplete
                id="google"
                sx={{ width: 300 }}
                getOptionLabel={(option) =>
                    typeof option === 'string' ? option : option.description
                }
                filterOptions={(x) => x}
                options={options}
                autoComplete
                includeInputInList
                filterSelectedOptions
                value={value}
                onChange={(event: any, newValue: PlaceType | null) => {
                    console.log({ newValue });
                    setOptions(newValue ? [newValue, ...options] : options);
                    setValue(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                    console.log({ newInputValue });
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => {
                    return (
                        <SearchBarDiv ref={params.InputProps.ref}>
                            <Paper
                                component="form"
                                sx={{
                                    p: '2px 4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: 400,
                                }}
                            >
                                <IconButton
                                    sx={{ p: '10px' }}
                                    aria-label="menu"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <InputBase
                                    {...params}
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Search"
                                    // inputProps={{
                                    //     'aria-label': 'search google maps',
                                    // }}
                                />
                                <IconButton
                                    type="submit"
                                    sx={{ p: '10px' }}
                                    aria-label="search"
                                >
                                    <SearchIcon />
                                </IconButton>
                                <Divider
                                    sx={{ height: 28, m: 0.5 }}
                                    orientation="vertical"
                                />
                                <IconButton
                                    color="primary"
                                    sx={{ p: '10px' }}
                                    aria-label="directions"
                                >
                                    <PersonIcon />
                                </IconButton>
                            </Paper>
                            <SearchBarIcon></SearchBarIcon>
                        </SearchBarDiv>
                    );
                }}
                renderOption={(props, option) => {
                    const matches =
                        option.structured_formatting
                            .main_text_matched_substrings;
                    const parts = parse(
                        option.structured_formatting.main_text,
                        matches.map((match: any) => [
                            match.offset,
                            match.offset + match.length,
                        ])
                    );

                    return (
                        <li {...props}>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Box
                                        component={LocationOnIcon}
                                        sx={{ color: 'text.secondary', mr: 2 }}
                                    />
                                </Grid>
                                <Grid item xs>
                                    {parts.map((part: any, index: any) => (
                                        <span
                                            key={index}
                                            style={{
                                                fontWeight: part.highlight
                                                    ? 700
                                                    : 400,
                                            }}
                                        >
                                            {part.text}
                                        </span>
                                    ))}
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {
                                            option.structured_formatting
                                                .secondary_text
                                        }
                                    </Typography>
                                </Grid>
                            </Grid>
                        </li>
                    );
                }}
            />
        </SearchBarHeader>
    );
}
