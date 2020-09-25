import {createMuiTheme} from "@material-ui/core";

export const theme = {
    typography: {
        fontFamily: 'Roboto, sans-serif !important',
    },
    palette: {
        primary: {
            contrastText: "#FFF",
            main: "#6590a6",
        },
        secondary: {
            contrastText: "#FFF",
            main: "#FC82B3",
        },
        background: {
            default: "#F2F4F8"
        }
    }
};

export const muiTheme = createMuiTheme(theme);