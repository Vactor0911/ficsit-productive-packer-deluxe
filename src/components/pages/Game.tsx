import styled from "styled-components";
import { useAtomValue } from "jotai";
import { gameDataAtom } from "../../state";

const Style = styled.div``;

const Game = () => {
  const level = useAtomValue(gameDataAtom).level;

  return (
    <Style>
      <h1>Game</h1>
      <p>게임 화면</p>
      <p>레벨: {level}</p>
    </Style>
  );
};

export default Game;
