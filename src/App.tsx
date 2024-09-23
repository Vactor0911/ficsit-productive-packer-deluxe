import { Home, Level, Game, HowToPlay, Setting } from "./components/pages";
import { useState, createContext, Dispatch, SetStateAction } from "react";

interface MenuContextType {
  menu: string;
  setMenu: Dispatch<SetStateAction<string>>;
}
export const MenuContext = createContext<MenuContextType | null>(null);

interface LevelContextType {
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
}
export const LevelContext = createContext<LevelContextType | null>(null);

function App() {
  const [menu, setMenu] = useState("home");
  const [level, setLevel] = useState(-1);

  return (
    <MenuContext.Provider value={{ menu, setMenu }}>
      <LevelContext.Provider value={{ level, setLevel }}>
        {menu === "home" && <Home />}
        {menu === "level" && <Level />}
        {menu === "game" && <Game />}
        {menu === "how-to-play" && <HowToPlay />}
        {menu === "setting" && <Setting />}
      </LevelContext.Provider>
    </MenuContext.Provider>
  );
}

export default App;
