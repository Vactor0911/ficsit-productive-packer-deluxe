import { useEffect } from "react";
import { Home, Level, Game, HowToPlay, Setting } from "./components/pages";
import { audioBgmAtom, gameDataAtom } from "./state";
import { useAtomValue } from "jotai";
import 'overlayscrollbars/overlayscrollbars.css';

function App() {
  const menu = useAtomValue(gameDataAtom).menu;
  const audioBgm = useAtomValue(audioBgmAtom);

  const playBgm = () => {
    audioBgm.play();
  };
  const pauseBgm = () => {
    audioBgm.pause();
  }

  useEffect(() => {
    window.addEventListener("click", playBgm);
    window.addEventListener("keydown", playBgm);
    window.addEventListener("focus", playBgm);
    window.addEventListener("blur", pauseBgm);

    return () => {
      window.removeEventListener("click", playBgm);
      window.removeEventListener("keydown", playBgm);
      window.addEventListener("focus", playBgm);
      window.addEventListener("blur", pauseBgm);
    };
  });

  return (
    <>
      {menu === "home" && <Home />}
      {menu === "level" && <Level />}
      {menu === "game" && <Game />}
      {menu === "how-to-play" && <HowToPlay />}
      {menu === "setting" && <Setting />}
    </>
  );
}

export default App;
