import { Box, Stack, Typography, type StackProps } from "@mui/material";
import BlockData from "../assets/blocks.json";
import CoinImage from "../assets/images/coin.svg";
import { useIsMobileLandscape } from "../utils";

interface BlockProps extends StackProps {
  id: string;
  blockId: number;
  displayScore?: boolean;
}

const Block = (props: BlockProps) => {
  const { id, blockId, displayScore = true, ...others } = props;

  const isMobileLandscape = useIsMobileLandscape();

  const block = BlockData.find((block) => block.id === blockId);

  // 블록을 찾지 못하면 null 반환
  if (!block) {
    return null;
  }

  // 블록 데이터
  const color = block.color || "#666666"; // 색상
  const grid = block.grid || [[1]]; // 그리드 배열
  const score = block.score || 0; // 점수

  // 오프셋 계산
  const offsetX = (4 - block.grid[0].length) * 5;
  const offsetY = (4 - block.grid.length) * 5;

  return (
    <Stack justifyContent="center" alignItems="center" {...others}>
      {/* 블록 */}
      <Box width="100%" height="100%" position="relative">
        <svg
          width="100%"
          height="100%"
          viewBox="0 -1 40 44"
          xmlns="http://www.w3.org/2000/svg"
        >
          {grid.map((row, i) =>
            row.map((cell, j) => (
              <g key={`${id}-grid-${i}-${j}`}>
                {cell && (
                  <g>
                    {/* 입체 표현 블록 */}
                    {(i >= grid.length - 1 || !grid[i + 1][j]) && (
                      <g>
                        <rect
                          x={j * 10 + offsetX}
                          y={i * 10 + 10 + offsetY}
                          width="10"
                          height="2"
                          fill={color}
                          filter="brightness(70%)"
                          stroke={color}
                          strokeWidth={0.1}
                        />

                        {/* 아래쪽 테두리 */}
                        <line
                          x1={j * 10 + offsetX}
                          y1={i * 10 + 12 + offsetY}
                          x2={j * 10 + 10 + offsetX}
                          y2={i * 10 + 12 + offsetY}
                          stroke="black"
                          strokeWidth={0.5}
                        />

                        {/* 왼쪽 테두리 */}
                        {(j === 0 || !grid[i][j - 1]) && (
                          <line
                            x1={j * 10 + offsetX}
                            y1={i * 10 + 10 + offsetY}
                            x2={j * 10 + offsetX}
                            y2={i * 10 + 12 + offsetY}
                            stroke="black"
                            strokeWidth={0.5}
                          />
                        )}

                        {/* 오른쪽 테두리 */}
                        {(j === 4 || !grid[i][j + 1]) && (
                          <line
                            x1={j * 10 + 10 + offsetX}
                            y1={i * 10 + 10 + offsetY}
                            x2={j * 10 + 10 + offsetX}
                            y2={i * 10 + 12 + offsetY}
                            stroke="black"
                            strokeWidth={0.5}
                          />
                        )}
                      </g>
                    )}

                    {/* 블록 */}
                    <rect
                      x={j * 10 + offsetX}
                      y={i * 10 + offsetY}
                      width="10"
                      height="10"
                      fill={color}
                      stroke={color}
                      strokeWidth={0.3}
                    />

                    {/* 위쪽 테두리 */}
                    {(i === 0 || !grid[i - 1][j]) && (
                      <line
                        x1={j * 10 + offsetX}
                        y1={i * 10 + offsetY}
                        x2={j * 10 + 10 + offsetX}
                        y2={i * 10 + offsetY}
                        stroke="black"
                        strokeWidth={0.5}
                      />
                    )}

                    {/* 아래쪽 테두리 */}
                    {(i >= grid.length - 1 || !grid[i + 1][j]) && (
                      <line
                        x1={j * 10 + offsetX}
                        y1={i * 10 + 10 + offsetY}
                        x2={j * 10 + 10 + offsetX}
                        y2={i * 10 + 10 + offsetY}
                        stroke="black"
                        strokeWidth={0.5}
                      />
                    )}

                    {/* 왼쪽 테두리 */}
                    {(j === 0 || !grid[i][j - 1]) && (
                      <line
                        x1={j * 10 + offsetX}
                        y1={i * 10 + offsetY}
                        x2={j * 10 + offsetX}
                        y2={i * 10 + 10 + offsetY}
                        stroke="black"
                        strokeWidth={0.5}
                      />
                    )}

                    {/* 오른쪽 테두리 */}
                    {(j === 4 || !grid[i][j + 1]) && (
                      <line
                        x1={j * 10 + 10 + offsetX}
                        y1={i * 10 + offsetY}
                        x2={j * 10 + 10 + offsetX}
                        y2={i * 10 + 10 + offsetY}
                        stroke="black"
                        strokeWidth={0.5}
                      />
                    )}
                  </g>
                )}
              </g>
            ))
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
            bottom={`${(4 - grid.length) * 11.25}%`}
            right={`${(4 - grid[0].length) * 11.25}%`}
            sx={{
              transform: {
                xs: "translate(25%, 25%)",
                sm: "none",
              },
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
