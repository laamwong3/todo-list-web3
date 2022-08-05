import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
let darkTheme = createTheme({
  typography: {
    fontFamily: "Montserrat",
    fontWeightLight: 100,
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: { default: "#39445a" },
  },
});

darkTheme = responsiveFontSizes(darkTheme);

export default darkTheme;
