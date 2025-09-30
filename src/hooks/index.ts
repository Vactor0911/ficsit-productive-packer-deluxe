import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  bestFillingPercentageAtom,
  bestPackageScoreAtom,
  blockIdQueueAtom,
  boardGridAtom,
  draggableBlockGhostAtom,
  dragSnapPointAtom,
  fillingBonusAtom,
  fillingPercentageAtom,
  isPackageSendingAtom,
  MAX_TIME,
  packageRefAtom,
  packageScoreAtom,
  placedBlockCountAtom,
  scoreAtom,
  scoreEffectsAtom,
  sentPackageCountAtom,
  timerAtom,
  type BoardGridProps,
} from "../states";
import BoardData from "../assets/boards.json";
import BlockData from "../assets/blocks.json";
import { useCallback, useMemo } from "react";
import { getRandBlockId, playEffect } from "../utils";
import BlockPlacedAudio from "../assets/audio/block_placed.mp3";

export const useGame = () => {
  const setIsPackageSending = useSetAtom(isPackageSendingAtom);
  const setTimer = useSetAtom(timerAtom);
  const setPackageScore = useSetAtom(packageScoreAtom);
  const setFillingBonus = useSetAtom(fillingPercentageAtom);
  const setBlockIdQueue = useSetAtom(blockIdQueueAtom);
  const setScore = useSetAtom(scoreAtom);
  const placedBlockCount = useSetAtom(placedBlockCountAtom);
  const sentPackageCount = useSetAtom(sentPackageCountAtom);
  const bestPackageScore = useSetAtom(bestPackageScoreAtom);
  const bestFillingBonus = useSetAtom(bestFillingPercentageAtom);
  const boardGrid = useAtomValue(boardGridAtom);

  // URL에서 레벨 추출
  const level = useMemo(() => location.pathname.split("/").pop(), []);

  const boardCellCount = useMemo(() => {
    return boardGrid.flat().filter((cell) => cell.blockId !== -1).length;
  }, [boardGrid]);

  // 채우기 보너스 배율
  const fillingBonusMultiplier = useMemo(() => {
    return (1 / boardCellCount!) * 10;
  }, [boardCellCount]);

  const resetGame = useCallback(() => {
    setIsPackageSending(false);
    setTimer(MAX_TIME);
    setScore(0);

    // 포장 점수 초기화
    setPackageScore(0);

    // 채우기 보너스 초기화
    setFillingBonus(0);

    placedBlockCount(0);
    sentPackageCount(0);
    bestPackageScore(0);
    bestFillingBonus(0);

    // 블록 큐 초기화
    const newBlockIdQueue = Array.from({ length: 8 }, () => {
      return getRandBlockId();
    });
    setBlockIdQueue(newBlockIdQueue);
  }, [
    bestFillingBonus,
    bestPackageScore,
    placedBlockCount,
    sentPackageCount,
    setBlockIdQueue,
    setFillingBonus,
    setIsPackageSending,
    setPackageScore,
    setScore,
    setTimer,
  ]);

  return { level, fillingBonusMultiplier, resetGame };
};

// 패키지
export const usePackage = () => {
  const packageRef = useAtomValue(packageRefAtom);

  const shakePackage = useCallback(() => {
    // 패키지 객체가 없다면 종료
    if (!packageRef?.current) {
      return;
    }

    // 패키지 객체 흔들기
    packageRef.current.classList.add("shake");
    setTimeout(() => {
      packageRef.current!.classList.remove("shake");
    }, 250);
  }, [packageRef]);

  return { shakePackage };
};

// 보드
export const useBoard = () => {
  const [boardGrid, setBoardGrid] = useAtom(boardGridAtom);
  const draggableBlockGhost = useAtomValue(draggableBlockGhostAtom);
  const dragSnapPoint = useAtomValue(dragSnapPointAtom);
  const [blockIdQueue, setBlockIdQueue] = useAtom(blockIdQueueAtom);
  const { shakePackage } = usePackage();
  const setScoreEffects = useSetAtom(scoreEffectsAtom);
  const setPackageScore = useSetAtom(packageScoreAtom);
  const setFillingBonus = useSetAtom(fillingBonusAtom);
  const setFillingPercentageAtom = useSetAtom(fillingPercentageAtom);
  const isPackageSending = useAtomValue(isPackageSendingAtom);
  const timer = useAtomValue(timerAtom);
  const setPlacedBlockCount = useSetAtom(placedBlockCountAtom);
  const { fillingBonusMultiplier } = useGame();

  // 보드 크기
  const getBoardSize = useCallback((level: number) => {
    const board = BoardData.find((board) => board.level === Number(level));

    if (board) {
      return {
        width: board.grid[0],
        height: board.grid[1],
      };
    }

    // 레벨에 해당하는 보드가 없는 경우
    return {
      width: 0,
      height: 0,
    };
  }, []);

  // 보드 초기화
  const clearBoard = useCallback(
    (level: number, disabledGridCount = 0) => {
      const board = BoardData.find((board) => board.level === Number(level));
      if (board) {
        // 새 보드 그리드 생성
        const grid = board.grid;
        const newBoardGrid: BoardGridProps[][] = Array.from(
          { length: grid[1] },
          (_, y) =>
            Array.from({ length: grid[0] }, (_, x) => ({
              x,
              y,
            }))
        );

        // 볼트로 고정된 그리드 추가
        board.boltedGrids.forEach((boltedGrid) => {
          newBoardGrid[boltedGrid[1]][boltedGrid[0]] = {
            ...newBoardGrid[boltedGrid[1]][boltedGrid[0]],
            blockId: -1,
          };
        });

        // 비활성화된 그리드 추가
        if (disabledGridCount > 0) {
          for (let i = 0; i < disabledGridCount; i++) {
            // 비어있는 그리드 필터링
            const emptyGrids = newBoardGrid
              .flat()
              .filter((cell) => cell.blockId === undefined);
            console.log("New Board Grid >> ", newBoardGrid);
            console.log("Empty Grids >> ", emptyGrids);

            // 랜덤 인덱스 선택
            const randIndex = Math.floor(Math.random() * emptyGrids.length);

            // 그리드 비활성화
            const targetGrid = emptyGrids[randIndex];
            console.log("Target Grid >> ", targetGrid);

            newBoardGrid[targetGrid.y][targetGrid.x] = {
              ...newBoardGrid[targetGrid.y][targetGrid.x],
              blockId: -2,
            };
          }
        }

        // 보드 그리드 적용
        setBoardGrid(newBoardGrid);
      }
    },
    [setBoardGrid]
  );

  // 보드에 블록 추가
  const addBlock = useCallback(
    (blockId: number, x: number, y: number) => {
      setBoardGrid((prevBoardGrid) => {
        const newBoardGrid = [...prevBoardGrid];

        // 추가할 블록 객체
        const block = BlockData.find((block) => block.id === blockId);

        // 블록을 찾지 못하면 종료
        if (!block) {
          return prevBoardGrid;
        }

        // 블록 추가
        const grid = block.grid;

        grid.forEach((row, i) => {
          row.forEach((cell, j) => {
            if (cell) {
              newBoardGrid[y + i][x + j] = {
                ...newBoardGrid[y + i][x + j],
                blockId: blockId,
                color: block.color,
                borderTop: i === 0 || grid[i - 1]?.[j] === 0,
                borderBottom: i === grid.length - 1 || grid[i + 1]?.[j] === 0,
                borderLeft: j === 0 || grid[i]?.[j - 1] === 0,
                borderRight: j === grid[i].length - 1 || grid[i]?.[j + 1] === 0,
                thickness: true,
              };
            }
          });
        });

        return newBoardGrid;
      });
    },
    [setBoardGrid]
  );

  // 보드에 블럭 놓기
  const placeBlock = useCallback(() => {
    // 블록을 놓을 수 없는 경우 종료
    if (!dragSnapPoint || !dragSnapPoint.isValid) return;

    // 드래그 중인 블록이 없는 경우 종료
    if (draggableBlockGhost.id === null) return;

    // 패키지가 전송중인 경우 종료
    if (isPackageSending) return;

    // 시간이 초과된 경우 종료
    if (timer <= 0) return;

    // 블록 데이터 추출
    const block = BlockData.find(
      (block) => block.id === blockIdQueue[draggableBlockGhost.id!]
    );

    // 블록을 찾을 수 없는 경우 종료
    if (!block) {
      return;
    }

    // 블록 추가
    addBlock(block.id, dragSnapPoint.x, dragSnapPoint.y);

    // 배치한 블록 수 증가
    setPlacedBlockCount((prev) => prev + 1);

    // 블록 큐 업데이트
    setBlockIdQueue((prevQueue) => {
      const newQueue = [...prevQueue];
      newQueue[draggableBlockGhost.id!] = getRandBlockId();
      return newQueue;
    });

    // 효과 재생
    playEffect(BlockPlacedAudio);
    shakePackage();

    // 점수 효과 객체 생성
    const effectX = dragSnapPoint.x + block.grid[0].length / 2;
    const effectY = dragSnapPoint.y + block.grid.length / 2;

    const newEffect = {
      score: block.score,
      x: effectX,
      y: effectY,
    };

    setScoreEffects((prevEffects) => [...prevEffects, newEffect]);

    // 점수 계산
    setPackageScore((prev) => prev + block.score);

    // 채우기 퍼센트 계산
    const totalCellCount = boardGrid.flat().length;
    const filledCellCount = boardGrid
      .flat()
      .filter((cell) => cell.blockId !== undefined).length;

    const fillingPercentage = (filledCellCount / totalCellCount) * 100;
    setFillingPercentageAtom(fillingPercentage);

    // 채우기 보너스 계산
    const blockCellCount = block.grid
      .flat()
      .filter((cell) => cell === 1).length;

    const fillingBonus = blockCellCount * fillingBonusMultiplier;
    console.log(blockCellCount, fillingBonus);
    setFillingBonus((prev) => Number((prev + fillingBonus).toFixed(3)));
  }, [
    addBlock,
    blockIdQueue,
    boardGrid,
    dragSnapPoint,
    draggableBlockGhost.id,
    fillingBonusMultiplier,
    isPackageSending,
    setBlockIdQueue,
    setFillingBonus,
    setFillingPercentageAtom,
    setPackageScore,
    setPlacedBlockCount,
    setScoreEffects,
    shakePackage,
    timer,
  ]);

  // 보드 비어있음 여부 확인
  const isBoardEmpty = useMemo(() => {
    return boardGrid.every((row) =>
      row.every((cell) => (cell.blockId ?? -1) < 0)
    );
  }, [boardGrid]);

  return {
    getBoardSize,
    clearBoard,
    addBlock,
    placeBlock,
    isBoardEmpty,
  };
};
