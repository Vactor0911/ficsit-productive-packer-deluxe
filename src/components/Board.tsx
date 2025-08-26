import { Box } from "@mui/material";
import * as Levels from "../assets/images/levels";
import { useLocation } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { useAtomValue } from "jotai";
import { boardGridAtom, type BoardGridProps } from "../states";
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
  const drawBlock = useCallback((block: BoardGridProps) => {
    const {
      blockId,
      x,
      y,
      color,
      border,
      borderTop,
      borderBottom,
      borderLeft,
      borderRight,
      thickness,
    } = block;

    // 볼트로 고정된 그리드
    if (blockId === -1) {
      return (
        <g key={`board-${x}-${y}`}>
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

          {/* 그림자 */}
          {Number(boardGrid[y - 1]?.[x].blockId) >= 0 && (
            <rect
              x={x * 32}
              y={y * 32}
              width={32}
              height={6}
              fill="rgb(0, 0, 0, 0.25)"
            />
          )}
        </g>
      );
    }

    // 일반 블록
    return (
      <BlockBase
        key={`board-${x}-${y}`}
        x={x}
        y={y - 0.2}
        color={color}
        border={border}
        borderTop={borderTop}
        borderBottom={borderBottom}
        borderLeft={borderLeft}
        borderRight={borderRight}
        thickness={thickness}
      />
    );
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
        height="101.25%"
        viewBox={`${(10 - boardSize.width) * -16 - 2} ${
          (9 - boardSize.height) * -16 - 7
        } 324 296`}
        css={{
          position: "absolute",
          top: "-1.7%",
          left: 0,
          zIndex: 2,
        }}
      >
        {/* 블록 렌더링 */}
        {boardGrid.map((row) => row.map((block) => drawBlock(block)))}
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
