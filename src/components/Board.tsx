import { Box, Stack } from "@mui/material";
import BoardData from "../assets/boards.json";
import { useState } from "react";

// 격자 이미지
const GridImage = (color: string) => {
  const svg = `
    <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
          <rect width="64" height="64" fill="white" />
          <rect width="32" height="32" fill="${color}" />
          <rect x="32" y="32" width="32" height="32" fill="${color}" />
        </pattern>
      </defs>
      <rect width="64" height="64" fill="url(#grid)" />
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

  const size = BoardData[level - 1].size;
  const color = BoardData[level - 1].color;

  const scaleY = (BoardData[level - 1].size[1] / 9) * 100;

  const [grid, setGrid] = useState(
    Array.from({ length: size[1] }, () => Array(size[0]).fill(0))
  );

  return (
    <Stack
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        height={`calc(${scaleY}% + 10px)`}
        margin={1}
        justifyContent="flex-end"
        position="relative"
        // border="2px solid black"
        boxShadow="0 10px 0 rgba(0, 0, 0, 0.15)"
        sx={{
          backgroundColor: color,
        }}
      >
        <Stack
          height={"calc(100% - 10px)"}
          sx={{
            backgroundImage: GridImage(color),
            background: GridImage(color),
            backgroundSize: `${(2 / size[0]) * 100}% ${(2 / size[1]) * 100}%`,
            aspectRatio: `${size[0]}/${size[1]}`,
          }}
        >
          <Stack
            width="100%"
            height="100%"
            position="relative"
            border="2px solid black"
          >
            {children}
          </Stack>
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
  );
};
export default Board;
