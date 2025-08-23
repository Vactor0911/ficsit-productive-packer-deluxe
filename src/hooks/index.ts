import { useAtom } from "jotai";
import { boardGridAtom, type BoardGridData } from "../states";
import BoardData from "../assets/boards.json";
import { useCallback } from "react";

export const useBoard = () => {
  const [boardGrid, setBoardGrid] = useAtom(boardGridAtom);

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
        const newBoardGrid: BoardGridData[] = [];

        // 볼트로 고정된 그리드 추가
        board.boltedGrids.forEach((boltedGrid, index) => {
          newBoardGrid.push({
            id: index,
            x: boltedGrid[0],
            y: boltedGrid[1],
            blockId: -1,
          });
        });

        // 보드 그리드 적용
        setBoardGrid(newBoardGrid);

        console.log("보드 초기화", newBoardGrid);
      }
    },
    [setBoardGrid]
  );

  return {
    getBoardSize,
    resetBoard,
  };
};
