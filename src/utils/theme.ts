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
      background: {
        default: "#29a995",
      },
    },
    typography: {
      fontFamily: "Noto Sans KR, Noto Sans, sans-serif",
      h1: {
        fontWeight: "bold",
      },
      h2: {
        fontWeight: "bold",
      },
      h3: {
        fontWeight: "bold",
      },
      h4: {
        fontWeight: "bold",
      },
      h5: {
        fontWeight: "bold",
      },
      h6: {
        fontWeight: "bold",
      },
      subtitle1: {
        fontWeight: 500,
      },
      subtitle2: {
        fontWeight: 500,
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            wordBreak: "keep-all",
            textWrap: "pretty",
          },
        },
      },
    },
  })
);
