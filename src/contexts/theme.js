import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
            light: '#42a5f5',
            dark: '#169a97',
            contrastText: '#fff',
        },
        third: {
            main: '#33A68E',
            light: '#42a5f5',
            dark: '#169a97',
            contrastText: '#fff',
        },
        tabs: {
            main: '#191A1C',
            light: '#42a5f5',
            dark: '#33A68E',
            contrastText: '#fff',
        },
        white: {
            main: '#ffffff',
            light: '#42a5f5',
            dark: '#cccccc',
            contrastText: '#000000',
        }
    },
});

export default theme;