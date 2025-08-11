import { Stack, type StackProps } from "@mui/material";

interface BlockProps extends StackProps {
  id: string;
  grid: number[][];
  color?: string;
}

const Block = (props: BlockProps) => {
  const { id, grid, color = "#666666", ...others } = props;

  const offsetX = (4 - grid[0].length) * 5;
  const offsetY = (4 - grid.length) * 5;

  return (
    <Stack justifyContent="center" alignItems="center" {...others}>
      <svg width="100%" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
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
                    strokeWidth={0.1}
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
    </Stack>
  );
};

export default Block;
