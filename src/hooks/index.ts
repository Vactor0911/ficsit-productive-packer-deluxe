import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  blockIdQueueAtom,
  boardGridAtom,
  draggableBlockGhostAtom,
  dragSnapPointAtom,
  packageRefAtom,
  type BoardGridProps,
} from "../states";
import BoardData from "../assets/boards.json";
import BlockData from "../assets/blocks.json";
import { useCallback } from "react";
import { getRandBlockId, playEffect } from "../utils";
import BlockPlacedAudio from "../assets/audio/block_placed.mp3";

export const usePackage = () => {
  const packageRef = useAtomValue(packageRefAtom);

  const shakePackage = useCallback(() => {
    // 패키지 객체가 없다면 종료
    if (!packageRef) {
      return;
    }

    // 패키지 객체 흔들기
    packageRef.classList.add("shake");
    setTimeout(() => {
      packageRef.classList.remove("shake");
    }, 250);
  }, [packageRef]);

  return { shakePackage };
};

export const useBoard = () => {
  const setBoardGrid = useSetAtom(boardGridAtom);
  const draggableBlockGhost = useAtomValue(draggableBlockGhostAtom);
  const dragSnapPoint = useAtomValue(dragSnapPointAtom);
  const [blockIdQueue, setBlockIdQueue] = useAtom(blockIdQueueAtom);
  const { shakePackage } = usePackage();

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
  const resetBoard = useCallback(
    (level: number) => {
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
    if (!dragSnapPoint || !dragSnapPoint.isValid) {
      return;
    }

    // 드래그 중인 블록이 없는 경우 종료
    if (draggableBlockGhost.id === null) {
      return;
    }

    const block = BlockData.find(
      (block) => block.id === blockIdQueue[draggableBlockGhost.id!]
    );

    // 블록을 찾을 수 없는 경우 종료
    if (!block) {
      return;
    }

    // 블록 추가
    addBlock(block.id, dragSnapPoint.x, dragSnapPoint.y);

    // 블록 큐 업데이트
    setBlockIdQueue((prevQueue) => {
      const newQueue = [...prevQueue];
      newQueue[draggableBlockGhost.id!] = getRandBlockId();
      return newQueue;
    });

    // 효과 재생
    playEffect(BlockPlacedAudio);
    shakePackage();
  }, [
    addBlock,
    blockIdQueue,
    dragSnapPoint,
    draggableBlockGhost.id,
    setBlockIdQueue,
    shakePackage,
  ]);

  return {
    getBoardSize,
    resetBoard,
    addBlock,
    placeBlock,
  };
};
