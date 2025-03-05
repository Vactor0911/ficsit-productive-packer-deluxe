import { createTheme } from "@mui/material";
import { effectAudio, musicAudio } from "../App";

export const theme = createTheme({
  palette: {
    background: {
      default: "#29a995",
    },
    primary: {
      main: "#e59344",
    },
  },
  typography: {
    fontFamily: ["Pretendard-Regular", "sans-serif"].join(","),
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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "#root": {
          userSelect: "none",
          wordBreak: "keep-all",
        },
      },
    },
  },
});

// 오디오 재생
export const playMusic = (src: string, volume = 1) => {
  musicAudio.src = src;
  musicAudio.volume = volume;
  musicAudio.play();
};

// 효과음 재생
export const playEffect = (src: string, volume = 1) => {
  effectAudio.src = src;
  effectAudio.volume = volume;
  effectAudio.play();
};
