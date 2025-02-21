import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    background: {
      default: "#29a995",
    },
  },
  typography: {
    fontFamily: ["noto-serif-kr", "sans-serif"].join(","),
    h1: {
      fontSize: "2em",
      lineHeight: "2em",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.5em",
      lineHeight: "1.5em",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "1.17em",
      lineHeight: "1.17em",
      fontWeight: "bold",
    },
    h4: {
      fontSize: "1em",
      lineHeight: "1em",
      fontWeight: "bold",
    },
    h5: {
      fontSize: "0.83em",
      lineHeight: "0.83em",
      fontWeight: "bold",
    },
    h6: {
      fontSize: "0.67em",
      lineHeight: "0.67em",
      fontWeight: "bold",
    },
    subtitle1: {
      fontSize: "1em",
      lineHeight: "1.5em",
    },
    subtitle2: {
      fontSize: "0.83em",
      lineHeight: "0.83em",
    },
  },
});
