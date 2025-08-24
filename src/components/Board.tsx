import { Box } from "@mui/material";
import * as Levels from "../assets/images/levels";
import { useLocation } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { useAtomValue } from "jotai";
import { boardGridAtom } from "../states";
import { useBoard } from "../hooks";
import BlockBase from "./BlockBase";

const Board = () => {
  const location = useLocation();
  const { getBoardSize } = useBoard();

  const boardGrid = useAtomValue(boardGridAtom);

  // 레벨
  const level = useMemo(
    () => location.pathname.split("/").pop(),
    [location.pathname]
  );

  // 보드 크기
  const boardSize = useMemo(() => {
    return getBoardSize(Number(level));
  }, [getBoardSize, level]);

  // 보드 이미지 스타일
  const boardImageStyles = {
    width: "100%",
    height: "100%",
    component: "img" as const,
    src: Levels[`Level${level}` as keyof typeof Levels],
  };

  // 블록 렌더링
  const drawBlock = useCallback((blockId: number, x: number, y: number) => {
    // 볼트로 고정된 그리드
    if (blockId === -1) {
      return (
        <>
          {/* 철판 */}
          <rect
            x={x * 32}
            y={y * 32}
            width={32}
            height={32}
            fill="#666666"
            vectorEffect="non-scaling-stroke"
            stroke="black"
            strokeWidth="2px"
          />

          {/* 볼트 장식 */}
          {[6, 26].map((offset, index) => (
            <g key={`${blockId}-${x}-${y}-${index}`}>
              <circle
                cx={x * 32 + offset}
                cy={y * 32 + offset}
                r={3}
                fill="#666666"
                vectorEffect="non-scaling-stroke"
                stroke="black"
                strokeWidth="2px"
              />
              <line
                x1={x * 32 + offset - 2}
                y1={y * 32 + offset - 2}
                x2={x * 32 + offset + 2}
                y2={y * 32 + offset + 2}
                stroke="#444"
                vectorEffect="non-scaling-stroke"
                strokeWidth="1px"
              />
            </g>
          ))}
        </>
      );
    }

    // 일반 블록
    return <BlockBase id={`${blockId}-${x}-${y}`} blockId={blockId} x={x * 32} y={y * 32 - 6} />;
  }, []);

  return (
    <Box
      width="98%"
      height="98%"
      position="relative"
      sx={{
        transform: "translateY(-3%)",
      }}
    >
      {/* 보드 */}
      <Box {...boardImageStyles} position="relative" zIndex={2} />

      {/* 보드 그리드 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox={`${(10 - boardSize.width) * -16 - 2} ${
          (9 - boardSize.height) * -16 - 2
        } 324 292`}
        css={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      >
        {boardGrid.map((grid, index) => (
          <g key={`block-${index}`} x={grid.x * 32} y={grid.y * 32}>
            {drawBlock(grid.blockId, grid.x, grid.y)}
          </g>
        ))}
      </svg>

      {/* 장식 */}
      <Box
        {...boardImageStyles}
        bottom="-2%"
        left="50%"
        position="absolute"
        zIndex={1}
        sx={{
          transform: "translateX(-50%)",
          filter: "brightness(50%)",
        }}
      />

      {/* 그림자 */}
      <Box
        {...boardImageStyles}
        bottom="-4%"
        left="50%"
        position="absolute"
        sx={{
          transform: "translateX(-50%)",
          filter: "brightness(0%)",
          opacity: 0.25,
        }}
      />
    </Box>
  );
};

export default Board;
