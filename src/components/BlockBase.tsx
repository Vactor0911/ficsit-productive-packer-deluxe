import BlockData from "../assets/blocks.json";

interface BlockBaseProps {
  id: string;
  blockId: number;
}

const BlockBase = (props: BlockBaseProps) => {
  const { id, blockId } = props;

  const block = BlockData.find((block) => block.id === blockId);

  // 블록을 찾지 못하면 null 반환
  if (!block) {
    return null;
  }

  // 블록 데이터
  const color = block.color || "#666666"; // 색상
  const grid = block.grid || [[1]]; // 그리드 배열

  // 오프셋 계산
  const offsetX = (4 - block.grid[0].length) * 16;
  const offsetY = (4 - block.grid.length) * 16;

  return (
    <>
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <g key={`${id}-${i}-${j}`}>
            {cell && (
              <g>
                {/* 입체 표현 블록 */}
                {(i >= grid.length - 1 || !grid[i + 1][j]) && (
                  <g>
                    <rect
                      x={j * 32 + offsetX}
                      y={i * 32 + 32 + offsetY}
                      width="32"
                      height="6"
                      fill={color}
                      filter="brightness(70%)"
                      stroke={color}
                      strokeWidth="2px"
                      vectorEffect="non-scaling-stroke"
                    />

                    {/* 아래쪽 테두리 */}
                    <line
                      x1={j * 32 + offsetX - 0.5}
                      y1={i * 32 + 38 + offsetY}
                      x2={j * 32 + 32 + offsetX + 0.5}
                      y2={i * 32 + 38 + offsetY}
                      stroke="black"
                      strokeWidth="2px"
                      vectorEffect="non-scaling-stroke"
                    />

                    {/* 왼쪽 테두리 */}
                    {(j === 0 || !grid[i][j - 1]) && (
                      <line
                        x1={j * 32 + offsetX}
                        y1={i * 32 + 32 + offsetY - 0.5}
                        x2={j * 32 + offsetX}
                        y2={i * 32 + 38 + offsetY + 0.5}
                        stroke="black"
                        strokeWidth="2px"
                        vectorEffect="non-scaling-stroke"
                      />
                    )}

                    {/* 오른쪽 테두리 */}
                    {(j === 4 || !grid[i][j + 1]) && (
                      <line
                        x1={j * 32 + 32 + offsetX}
                        y1={i * 32 + 32 + offsetY - 0.5}
                        x2={j * 32 + 32 + offsetX}
                        y2={i * 32 + 38 + offsetY + 0.5}
                        stroke="black"
                        strokeWidth="2px"
                        vectorEffect="non-scaling-stroke"
                      />
                    )}
                  </g>
                )}

                {/* 블록 */}
                <rect
                  x={j * 32 + offsetX}
                  y={i * 32 + offsetY}
                  width="32"
                  height="32"
                  fill={color}
                  stroke={color}
                  strokeWidth="2px"
                  vectorEffect="non-scaling-stroke"
                />

                {/* 위쪽 테두리 */}
                {(i === 0 || !grid[i - 1][j]) && (
                  <line
                    x1={j * 32 + offsetX - 0.5}
                    y1={i * 32 + offsetY}
                    x2={j * 32 + 32 + offsetX + 0.5}
                    y2={i * 32 + offsetY}
                    stroke="black"
                    strokeWidth="2px"
                    vectorEffect="non-scaling-stroke"
                  />
                )}

                {/* 아래쪽 테두리 */}
                {(i >= grid.length - 1 || !grid[i + 1][j]) && (
                  <line
                    x1={j * 32 + offsetX - 0.5}
                    y1={i * 32 + 32 + offsetY}
                    x2={j * 32 + 32 + offsetX + 0.5}
                    y2={i * 32 + 32 + offsetY}
                    stroke="black"
                    strokeWidth="2px"
                    vectorEffect="non-scaling-stroke"
                  />
                )}

                {/* 왼쪽 테두리 */}
                {(j === 0 || !grid[i][j - 1]) && (
                  <line
                    x1={j * 32 + offsetX}
                    y1={i * 32 + offsetY - 0.5}
                    x2={j * 32 + offsetX}
                    y2={i * 32 + 32 + offsetY + 0.5}
                    stroke="black"
                    strokeWidth="2px"
                    vectorEffect="non-scaling-stroke"
                  />
                )}

                {/* 오른쪽 테두리 */}
                {(j === 4 || !grid[i][j + 1]) && (
                  <line
                    x1={j * 32 + 32 + offsetX}
                    y1={i * 32 + offsetY - 0.5}
                    x2={j * 32 + 32 + offsetX}
                    y2={i * 32 + 32 + offsetY + 0.5}
                    stroke="black"
                    strokeWidth="2px"
                    vectorEffect="non-scaling-stroke"
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
