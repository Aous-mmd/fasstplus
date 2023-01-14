import { createContext, useState, useMemo } from "react";
import { createTheme } from '@mui/material/styles';
import { PaletteMode } from "@mui/material";


export const colorsTheme = (mode: PaletteMode) => ({
    ...(mode !== 'dark' ? {
        Secondary: {
            100: "#fff1cc",
            200: "#ffe39a",
            300: "#ffd567",
            400: "#ffc735",
            500: "#ffb902",
            600: "#cc9402",
            700: "#996f01",
            800: "#664a01",
            900: "#332500"
        },
        Primary: {
            100: "#ccd6da",
            200: "#9aacb5",
            300: "#678391",
            400: "#35596c",
            500: "#023047",
            600: "#022639",
            700: "#011d2b",
            800: "#01131c",
            900: "#000a0e"
        },
        Grey: {
            100: "#e8e8e8",
            200: "#d1d1d1",
            300: "#bbbbbb",
            400: "#a4a4a4",
            500: "#8d8d8d",
            600: "#717171",
            700: "#555555",
            800: "#383838",
            900: "#1c1c1c"
        },
        Light: {
            100: "#f9f9f9",
            200: "#f3f3f3",
            300: "#ededed",
            400: "#e7e7e7",
            500: "#e1e1e1",
            600: "#b4b4b4",
            700: "#878787",
            800: "#5a5a5a",
            900: "#2d2d2d"
        },
        White: {
            100: "#fdfdfe",
            200: "#fbfbfd",
            300: "#f8f9fc",
            400: "#f6f7fb",
            500: "#f4f5fa",
            600: "#c3c4c8",
            700: "#929396",
            800: "#626264",
            900: "#313132"
        },
    } : {
        Secondary: {
            100: "#332500",
            200: "#664a01",
            300: "#996f01",
            400: "#cc9402",
            500: "#ffb902",
            600: "#ffc735",
            700: "#ffd567",
            800: "#ffe39a",
            900: "#fff1cc",
        },
        Primary: {
            100: "#000a0e",
            200: "#01131c",
            300: "#011d2b",
            400: "#022639",
            500: "#023047",
            600: "#35596c",
            700: "#678391",
            800: "#9aacb5",
            900: "#ccd6da",
        },
        Grey: {
            100: "#1c1c1c",
            200: "#383838",
            300: "#555555",
            400: "#717171",
            500: "#8d8d8d",
            600: "#a4a4a4",
            700: "#bbbbbb",
            800: "#d1d1d1",
            900: "#e8e8e8",
        },
        Light: {
            100: "#2d2d2d",
            200: "#5a5a5a",
            300: "#878787",
            400: "#b4b4b4",
            500: "#e1e1e1",
            600: "#e7e7e7",
            700: "#ededed",
            800: "#f3f3f3",
            900: "#f9f9f9",
        },
        White: {
            100: "#313132",
            200: "#626264",
            300: "#929396",
            400: "#c3c4c8",
            500: "#f4f5fa",
            600: "#f6f7fb",
            700: "#f8f9fc",
            800: "#fbfbfd",
            900: "#fdfdfe",
        },
    })
});

export const themeSettings = (mode: PaletteMode) => {
    const colors = colorsTheme(mode);
    return {
        palette: {
            mode: mode,
            ...(mode !== "dark" ? {
                primary: {
                    main: colors.Primary[500],
                },
                secondary: {
                    main: colors.Secondary[500]
                },
                neutral: {
                    light: colors.Grey[100],
                    main: colors.Grey[500],
                    dark: colors.Grey[700]
                },
                background: {
                    default: colors.Primary[100]
                },
            } : {
                primary: {
                    main: colors.Primary[100],
                },
                secondary: {
                    main: colors.Secondary[500]
                },
                neutral: {
                    light: colors.Grey[100],
                    main: colors.Grey[500],
                    dark: colors.Grey[700]
                },
                background: {
                    default: colors.Primary[500]
                },
            })
        }
    }
}


export const ColorModeContext = createContext({
    toggleColorMode: () => {

    }
});

export const useMode = () => {
    const [mode, setMode] = useState<PaletteMode>('light');
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => setMode((prev) => (prev === 'light' ? "dark" : 'light')),
        }),
        []
    );
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
};