import { createTheme, responsiveFontSizes } from "@mui/material";

// MUI Palette 확장
declare module "@mui/material/styles" {
  interface Palette {
    black: Palette["primary"];
  }
  interface PaletteOptions {
    black?: PaletteOptions["primary"];
  }
}

// MUI Typography 색상 확장
declare module "@mui/material/Typography" {
    interface TypographyPropsColorOverrides {
        black: true;
    }
}

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#e59344",
      },
      black: {
        main: "#404040",
      },
    },
    typography: {
      fontFamily: "Noto Sans KR, Noto Sans, sans-serif",
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 700,
      },
    },
  })
);
