import styled from "styled-components";
import { color } from "../../../theme";
import Button from "../Button";
import { useContext } from "react";
import { LevelContext, MenuContext } from "../../App";

const Style = styled.div``;

const Game = () => {
    const menuContext = useContext(MenuContext);
    if (!menuContext) {
      throw new Error("MenuContext is null");
    }
    const { setMenu } = menuContext;

    const levelContext = useContext(LevelContext);
    if (!levelContext) {
      throw new Error("LevelContext is null");
    }
    const { level } = levelContext;

    return (
        <Style>
            <h1>Game</h1>
            <p>게임 화면</p>
            <p>레벨: {level}</p>
        </Style>
    )
}

export default Game;
