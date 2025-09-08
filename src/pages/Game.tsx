import { useEffect, useMemo, useState } from "react";
import GameOverView from "./GameOverView";
import GameView from "./GameView";
import { useLocation } from "react-router-dom";
import { useBoard } from "../hooks";

const Game = () => {
  const location = useLocation();

  const { clearBoard } = useBoard();
  const [isGameOver, setIsGameOver] = useState(false);

  // URL에서 레벨 추출
  const level = useMemo(
    () => location.pathname.split("/").pop(),
    [location.pathname]
  );

  // 게임 데이터 초기화
  useEffect(() => {
    if (level) {
      // 보드 초기화
      clearBoard(Number(level));
    }
  }, [clearBoard, level]);

  if (isGameOver) {
    return <GameOverView />;
  }
  return <GameView setIsGameOver={setIsGameOver} />;
};

export default Game;
