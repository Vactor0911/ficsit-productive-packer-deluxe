import { Box, Stack } from "@mui/material";
import BoardData from "../assets/boards.json";
import { useEffect, useRef, useState } from "react";
import { tileSizeAtom } from "../states";
import { useAtom } from "jotai";

// 격자 이미지
const GridImage = (color: string) => {
  const svg = `
    <svg width="2" height="2" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="2" height="2" patternUnits="userSpaceOnUse">
          <rect width="2" height="2" fill="white" />
          <rect width="1" height="1" fill="${color}" />
          <rect x="1" y="1" width="1" height="1" fill="${color}" />
        </pattern>
      </defs>
      <rect width="2" height="2" fill="url(#grid)" />
    </svg>
  `;
  return `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
};

interface BoardProps {
  level: number;
  children?: React.ReactNode;
}

const Board = (props: BoardProps) => {
  const { level, children } = props;

  const boardSize = BoardData[level - 1].size;
  const boardColor = BoardData[level - 1].color;

  const rootRef = useRef<HTMLDivElement>(null);
  const [tileSize, setTileSize] = useAtom(tileSizeAtom);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;

      // 퍼센트 계산 후 10px 단위로 반올림
      const newSizeW = Math.floor((width - 10) / 10 / 4) * 4;
      const newSizeH = Math.floor((height - 30) / 9 / 4) * 4;
      const newTileSize = Math.min(newSizeW, newSizeH);

      // 크기 적용
      setTileSize(newTileSize);
    });

    if (rootRef.current) {
      observer.observe(rootRef.current);
    }

    return () => observer.disconnect();
  }, [level, setTileSize]);

  const [grid, setGrid] = useState(
    Array.from({ length: boardSize[1] }, () => Array(boardSize[0]).fill(0))
  );

  return (
    <Stack
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        ref={rootRef}
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          width={`${tileSize * boardSize[0]}px`}
          height={`${tileSize * boardSize[1] + 10}px)`}
          justifyContent="flex-end"
          position="relative"
          boxShadow="0 10px 0 rgba(0, 0, 0, 0.15)"
          sx={{
            backgroundColor: boardColor,
          }}
        >
          <Stack
            width={`${tileSize * boardSize[0]}px`}
            height={`calc(${tileSize * boardSize[1]}px)`}
            sx={{
              backgroundImage: GridImage(boardColor),
              background: GridImage(boardColor),
              backgroundSize: `${(2 / boardSize[0]) * 100}% ${
                (2 / boardSize[1]) * 100
              }%`,
            }}
          >
            {children}
            <Box width="100%" height="100%" border="2px solid black" />
          </Stack>
          <Box
            width="100%"
            height="10px"
            border="2px solid black"
            borderTop="none"
            sx={{
              background: "rgba(0, 0, 0, 0.3)",
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
export default Board;
