import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Game, HowToPlay, Levels, Main } from "./pages";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { theme } from "./utils/theme";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { vhAtom } from "./states";
import { playMusic } from "./utils/audio";
import MainAudio from "./assets/audio/music_1.mp3";

const App = () => {
  const setVh = useSetAtom(vhAtom);

  // vh 단위 보정
  useEffect(() => {
    const calcVh = () => {
      const vh = window.innerHeight * 0.01;
      setVh(vh);
    };

    calcVh();
    window.addEventListener("resize", calcVh);

    // 클리너
    return () => window.removeEventListener("resize", calcVh);
  }, [setVh]);

  // 게임 배경 음악 재생
  useEffect(() => {
    const handleFirstClick = () => {
      playMusic(MainAudio);
      window.removeEventListener("click", handleFirstClick);
    };

    window.addEventListener("click", handleFirstClick);

    return () => window.removeEventListener("click", handleFirstClick);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter basename="ficsit-productive-packer-deluxe">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="levels" element={<Levels />} />
          <Route path="how-to-play" element={<HowToPlay />} />
          <Route path="game/:level" element={<Game />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
