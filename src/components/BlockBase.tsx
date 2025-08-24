import type React from "react";
import BlockData from "../assets/blocks.json";

interface BlockBaseProps {
  key: React.Key | null | undefined;
  blockId: number;
}

const BlockBase = (props: BlockBaseProps) => {
  const { key, blockId } = props;

  const block = BlockData.find((block) => block.id === blockId);

  // 블록을 찾지 못하면 null 반환
  if (!block) {
    return null;
  }

  // 블록 데이터
  const color = block.color || "#666666"; // 색상
  const grid = block.grid || [[1]]; // 그리드 배열

  // 오프셋 계산
  const offsetX = (4 - block.grid[0].length) * 5;
  const offsetY = (4 - block.grid.length) * 5;

  return (
    <>
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <g key={`${key}-grid-${i}-${j}`}>
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
    </>
  );
};

export default BlockBase;
