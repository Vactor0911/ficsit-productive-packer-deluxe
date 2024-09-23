import { Home, Level, Game, HowToPlay, Setting } from "./components/pages";
import { useState, createContext, Dispatch, SetStateAction } from "react";

interface MenuContextType {
  menu: string;
  setMenu: Dispatch<SetStateAction<string>>;
}

export const MenuContext = createContext<MenuContextType | null>(null);

function App() {
  const [menu, setMenu] = useState("home");

  return (
    <MenuContext.Provider value={{ menu, setMenu }}>
      {menu === "home" && <Home />}
      {menu === "level" && <Level />}
      {menu === "game" && <Game />}
      {menu === "how-to-play" && <HowToPlay />}
      {menu === "setting" && <Setting />}
    </MenuContext.Provider>
  );
}

export default App;
