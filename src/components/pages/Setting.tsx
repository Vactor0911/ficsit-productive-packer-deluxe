import styled from "styled-components";
import { color } from "../../../theme";
import Button from "../Button";
import { useContext } from "react";
import { MenuContext } from "../../App";

const Style = styled.div``;

const Game = () => {
    const menuContext = useContext(MenuContext);
    if (!menuContext) {
      throw new Error("MenuContext is null");
    }
    const { setMenu } = menuContext;

    return (
        <Style>
            <h1>Setting</h1>
            <p>게임 설정 화면</p>
        </Style>
    )
}

export default Game;
