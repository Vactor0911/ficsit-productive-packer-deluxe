import { Box, Stack, Typography, type StackProps } from "@mui/material";
import BlockData from "../assets/blocks.json";
import CoinImage from "../assets/images/coin.svg";
import { useIsMobileLandscape } from "../utils";
import BlockBase from "./BlockBase";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface BlockProps extends StackProps {
  id: string;
  blockId: number;
  displayScore?: boolean;
  shadow?: boolean;
  animation?: boolean;
  error?: boolean;
}

const Block = (props: BlockProps) => {
  const {
    id,
    blockId,
    displayScore = true,
    shadow,
    animation,
    error,
    ...others
  } = props;

  const isMobileLandscape = useIsMobileLandscape();

  const blockContainerRef = useRef<HTMLDivElement>(null);

  // 블록 ID로 데이터 찾기
  const block = useMemo(() => {
    return BlockData.find((block) => block.id === blockId);
  }, [blockId]);

  // 블록 크기
  const [blockSize, setBlockSize] = useState(0);

  // 블록 크기 계산
  const calcBlockSize = useCallback(() => {
    // 블록 컨테이너가 없다면 종료
    if (!blockContainerRef.current) {
      return 0;
    }

    const width = blockContainerRef.current.clientWidth;
    const height = blockContainerRef.current.clientHeight;

    const minSize = Math.min(width, height);
    setBlockSize(minSize);
  }, []);

  // ResizeObserver를 사용하여 크기 변화 감지
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      calcBlockSize();
    });

    if (blockContainerRef.current) {
      resizeObserver.observe(blockContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [calcBlockSize]);

  // 블록을 찾지 못하면 null 반환
  if (!block) {
    return null;
  }

  // 블록 데이터
  const grid = block.grid || [[1]]; // 그리드 배열
  const color = block.color || "#666666"; // 색상
  const score = block.score || 0; // 점수

  // 오프셋 계산
  const offsetX = (4 - block.grid[0].length) * 0.5;
  const offsetY = (4 - block.grid.length) * 0.5;

  return (
    <Stack justifyContent="center" alignItems="center" {...others}>
      {/* 블록 */}
      <Box
        ref={blockContainerRef}
        width="100%"
        height="100%"
        position="relative"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="-1 -1 130 141"
        >
          {grid.map((row, i) =>
            row.map(
              (cell, j) =>
                cell && (
                  <BlockBase
                    key={`${id}-${i}-${j}`}
                    x={j + offsetX}
                    y={i + offsetY}
                    color={error ? "red" : color}
                    borderTop={i === 0 || grid[i - 1]?.[j] === 0}
                    borderBottom={
                      i === grid.length - 1 || grid[i + 1]?.[j] === 0
                    }
                    borderLeft={j === 0 || grid[i]?.[j - 1] === 0}
                    borderRight={
                      j === grid[i].length - 1 || grid[i]?.[j + 1] === 0
                    }
                    thickness={i === grid.length - 1 || grid[i + 1]?.[j] === 0}
                    shadow={shadow}
                    animation={animation}
                  />
                )
            )
          )}
        </svg>

        {/* 점수 */}
        {displayScore && (
          <Stack
            width={
              isMobileLandscape
                ? "16px"
                : {
                    xs: "24px",
                    sm: "32px",
                  }
            }
            height={
              isMobileLandscape
                ? "16px"
                : {
                    xs: "24px",
                    sm: "32px",
                  }
            }
            justifyContent="center"
            alignItems="center"
            position="absolute"
            bottom={`calc(50% - ${blockSize * grid.length * 0.125}px)`}
            right={`calc(50% - ${blockSize * grid[0].length * 0.125}px)`}
            sx={{
              transform: "translate(25%, 25%)",
            }}
          >
            {/* 코인 이미지 */}
            <Box
              component="img"
              src={CoinImage}
              width="100%"
              height="100%"
              position="absolute"
              top={0}
              left={0}
            />

            {/* 점수 텍스트 */}
            <Typography
              variant="body2"
              textAlign="center"
              color="white"
              fontWeight="bold"
              fontSize={isMobileLandscape ? "0.5rem" : "inherit"}
              position="relative"
              zIndex={1}
              sx={{
                transform: "translateY(-7%)",
              }}
            >
              {score}
            </Typography>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default Block;
