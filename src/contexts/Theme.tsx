import React, { useState, createContext, useContext } from 'react';

export interface Theme {
    bgDark: string;
    bg: string;
    bgHighlight: string;
    contentSecondary: string;
    base: string;
    contentPrimary: string;
    contentEmphasized: string;
    fg: string;
    fgHighlight: string;
    yellow: string;
    orange: string;
    red: string;
    magenta: string;
    violet: string;
    blue: string;
    cyan: string;
    green: string;
    breakpoints: typeof DEFAULT_ALL_THEMES['breakpoints'];
}

export type ThemeTypes = 'SOLARIZED_DARK' | 'SOLARIZED_LIGHT';

const SOLARIZED_COLORS = {
    yellow: '#b58900',
    orange: '#cb4b16',
    red: '#dc322f',
    magenta: '#d33682',
    violet: '#6c71c4',
    blue: '#268bd2',
    cyan: '#2aa198',
    green: '#859900',
};

export const DEFAULT_ALL_THEMES = {
    breakpoints: {
        xs: '0px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1400px'
    }
};

export const ThemeList: { [index in ThemeTypes]: Theme } = {
    SOLARIZED_DARK: {
        bgDark: '#00212b',
        bg: '#002b36',
        bgHighlight: '#073642',
        contentSecondary: '#586e75',
        base: '#657b83',
        contentPrimary: '#839496',
        contentEmphasized: '#93a1a1',
        fg: '#eee8d5',
        fgHighlight: '#fdf6e3',
        ...SOLARIZED_COLORS,
        ...DEFAULT_ALL_THEMES,
    },
    SOLARIZED_LIGHT: {
        fgHighlight: '#002b36',
        fg: '#073642',
        contentEmphasized: '#586e75',
        contentPrimary: '#657b83',
        base: '#839496',
        contentSecondary: '#93a1a1',
        bgHighlight: '#eee8d5',
        bg: '#fdf6e3',
        bgDark: '#dbd5bf',
        ...SOLARIZED_COLORS,
        ...DEFAULT_ALL_THEMES
    },
};

const defaultTheme = ThemeList.SOLARIZED_DARK;

type ThemeContextType = [Theme, React.Dispatch<React.SetStateAction<Theme>>];

const ThemeContext = createContext<ThemeContextType>([
    defaultTheme,
    (): void => {
        return;
    },
]);

export const ThemeProvider = ({
    children,
    theme,
}: {
  children: React.ReactNode;
  theme?: Theme;
}): JSX.Element => {
    const [currentSettings, setCurrentSettings] = useState(theme ?? defaultTheme);
    const value: ThemeContextType = [currentSettings, setCurrentSettings];

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export const ThemeConsumer = ThemeContext.Consumer;

export const useTheme = (): ThemeContextType => {
    const theme = useContext(ThemeContext);

    return theme;
};