import { useEffect, useMemo, useState } from "react";
import GameOverView from "./GameOverView";
import GameView from "./GameView";
import { useLocation } from "react-router-dom";
import { useBoard } from "../hooks";
import { useSetAtom } from "jotai";
import {
  blockIdQueueAtom,
  fillingBonusAtom,
  packageScoreAtom,
  timerAtom,
} from "../states";
import { getRandBlockId } from "../utils";

const Game = () => {
  const location = useLocation();

  const { clearBoard } = useBoard();
  const [isGameOver, setIsGameOver] = useState(false);
  const setPackageScore = useSetAtom(packageScoreAtom);
  const setFillingBonus = useSetAtom(fillingBonusAtom);
  const setTimer = useSetAtom(timerAtom);
  const setBlockIdQueue = useSetAtom(blockIdQueueAtom);

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

      // 포장 점수 초기화
      setPackageScore(0);

      // 채우기 보너스 초기화
      setFillingBonus(1000);

      // 타이머 초기화
      setTimer(50);

      // 블록 큐 초기화
      const newBlockIdQueue = Array.from({ length: 8 }, () => {
        return getRandBlockId();
      });
      setBlockIdQueue(newBlockIdQueue);
    }
  }, [
    level,
    clearBoard,
    setBlockIdQueue,
    setFillingBonus,
    setPackageScore,
    setTimer,
  ]);

  if (isGameOver) {
    return <GameOverView />;
  }
  return <GameView setIsGameOver={setIsGameOver} />;
};

export default Game;
