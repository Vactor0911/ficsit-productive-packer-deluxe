import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Game, HowToPlay, Levels, Main } from "./pages";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { theme } from "./utils/theme";

const App = () => {
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
