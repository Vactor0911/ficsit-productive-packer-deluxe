import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages";
import MainAudio from "./assets/audio/music_1.mp3";
import HowToPlay from "./pages/HowToPlay";
import Levels from "./pages/Levels";

// 배경음악 오디오
export const musicAudio = new Audio(MainAudio);
// musicAudio.autoplay = true;
musicAudio.loop = true;
musicAudio.volume = 0.3;
// musicAudio.play();

// 효과음 오디오
export const effectAudio = new Audio();

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="levels" element={<Levels />} />
        <Route path="how-to-play" element={<HowToPlay />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
