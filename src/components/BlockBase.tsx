export interface BlockBaseProps {
  x: number;
  y: number;
  color?: string;
  border?: boolean;
  borderTop?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
  thickness?: boolean;
}

const BlockBase = (props: BlockBaseProps) => {
  const {
    x = 0,
    y = 0,
    color = "transparent",
    border,
    borderTop,
    borderBottom,
    borderLeft,
    borderRight,
    thickness,
  } = props;

  return (
    <g>
      {thickness && (
        <g>
          {/* 입체 표현 블록 */}
          <g>
            <rect
              x={x * 32}
              y={y * 32 + 32}
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
              x1={x * 32 - 0.5}
              y1={y * 32 + 38}
              x2={x * 32 + 32 + 0.5}
              y2={y * 32 + 38}
              stroke="black"
              strokeWidth="2px"
              vectorEffect="non-scaling-stroke"
            />

            {/* 왼쪽 테두리 */}
            {(border || borderLeft) && (
              <line
                x1={x * 32}
                y1={y * 32 + 32 - 0.5}
                x2={x * 32}
                y2={y * 32 + 38 + 0.5}
                stroke="black"
                strokeWidth="2px"
                vectorEffect="non-scaling-stroke"
              />
            )}

            {/* 오른쪽 테두리 */}
            {(border || borderRight) && (
              <line
                x1={x * 32 + 32}
                y1={y * 32 + 32 - 0.5}
                x2={x * 32 + 32}
                y2={y * 32 + 38 + 0.5}
                stroke="black"
                strokeWidth="2px"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </g>

          {/* 그림자 */}
          <rect
            x={x * 32}
            y={y * 32 + 32 + 6}
            width="32"
            height="6"
            fill="rgba(0, 0, 0, 0.25)"
          />
        </g>
      )}

      {/* 블록 */}
      <rect
        x={x * 32}
        y={y * 32}
        width="32"
        height="32"
        fill={color}
        stroke={color}
        strokeWidth="2px"
        vectorEffect="non-scaling-stroke"
      />

      {/* 위쪽 테두리 */}
      {(border || borderTop) && (
        <line
          x1={x * 32 - 0.5}
          y1={y * 32}
          x2={x * 32 + 32 + 0.5}
          y2={y * 32}
          stroke="black"
          strokeWidth="2px"
          vectorEffect="non-scaling-stroke"
        />
      )}

      {/* 아래쪽 테두리 */}
      {(border || borderBottom) && (
        <line
          x1={x * 32 - 0.5}
          y1={y * 32 + 32}
          x2={x * 32 + 32 + 0.5}
          y2={y * 32 + 32}
          stroke="black"
          strokeWidth="2px"
          vectorEffect="non-scaling-stroke"
        />
      )}

      {/* 왼쪽 테두리 */}
      {(border || borderLeft) && (
        <line
          x1={x * 32}
          y1={y * 32 - 0.5}
          x2={x * 32}
          y2={y * 32 + 32 + 0.5}
          stroke="black"
          strokeWidth="2px"
          vectorEffect="non-scaling-stroke"
        />
      )}

      {/* 오른쪽 테두리 */}
      {(border || borderRight) && (
        <line
          x1={x * 32 + 32}
          y1={y * 32 - 0.5}
          x2={x * 32 + 32}
          y2={y * 32 + 32 + 0.5}
          stroke="black"
          strokeWidth="2px"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </g>
  );
};

export default BlockBase;
