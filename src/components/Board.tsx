import { Box } from "@mui/material";
import * as Levels from "../assets/images/levels";
import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  boardGridAtom,
  boardGridSizeAtom,
  type BoardGridProps,
} from "../states";
import { useBoard } from "../hooks";
import BlockBase from "./BlockBase";

const Board = () => {
  const location = useLocation();
  const { getBoardSize } = useBoard();

  const boardRef = useRef<HTMLDivElement>(null);
  const boardGrid = useAtomValue(boardGridAtom);
  const setBoardGridSize = useSetAtom(boardGridSizeAtom);

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
  const drawBlock = useCallback(
    (block: BoardGridProps) => {
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
          shadow
        />
      );
    },
    [boardGrid]
  );

  // 보드 그리드 크기 계산
  const calcBoardGridSize = useCallback(() => {
    // 보드 그리드 객체가 없다면 종료
    if (!boardRef.current) {
      return 0;
    }

    // 보드 가로 길이 기반 그리드 크기 계산
    const width = boardRef.current.clientWidth;
    const height = boardRef.current.clientHeight;

    let gridSize;

    if (width < height) {
      gridSize = width / boardSize.width;
    } else {
      gridSize = height / boardSize.height;
    }
    console.log(gridSize);

    setBoardGridSize(gridSize);
  }, [boardSize.height, boardSize.width, setBoardGridSize]);

  // ResizeObserver를 사용하여 크기 변화 감지
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      calcBoardGridSize();
    });

    if (boardRef.current) {
      resizeObserver.observe(boardRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [calcBoardGridSize]);

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
      <Box
        ref={boardRef}
        position="relative"
        zIndex={2}
        {...boardImageStyles}
      />

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
        bottom="-2%"
        left="50%"
        position="absolute"
        zIndex={1}
        sx={{
          transform: "translateX(-50%)",
          filter: "brightness(50%)",
        }}
        {...boardImageStyles}
      />

      {/* 그림자 */}
      <Box
        bottom="-4%"
        left="50%"
        position="absolute"
        sx={{
          transform: "translateX(-50%)",
          filter: "brightness(0%)",
          opacity: 0.25,
        }}
        {...boardImageStyles}
      />
    </Box>
  );
};

export default Board;
