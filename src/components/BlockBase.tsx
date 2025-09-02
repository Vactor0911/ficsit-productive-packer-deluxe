import { useId } from "react";

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
  shadow?: boolean;
  animation?: boolean;
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
    shadow,
    animation,
  } = props;

  const uuid = useId();
  const clipId = `animationClipArea-${uuid}`;
  const glyphId = `animationGlyph-${uuid}`;

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
          {shadow && (
            <rect
              x={x * 32}
              y={y * 32 + (thickness ? 32 : 0) + 6}
              width="32"
              height="6"
              fill="rgba(0, 0, 0, 0.25)"
            />
          )}
        </g>
      )}

      {/* 블록 */}
      <rect
        x={x * 32}
        y={y * 32}
        width="32"
        height="32"
        fill={color}
        stroke={animation ? "none" : color}
      />

      {/* 애니메이션 */}
      {animation && (
        <>
          <defs>
            <symbol id={glyphId} viewBox="0 0 64 64">
              <path d="M 0 0 16 0 L 0 16 Z" fill="inherit" />
              <path
                d="M 64 0 L 48 0 L 0 48 L 0 64 L 16 64 L 64 16 Z"
                fill="inherit"
              />
              <path d="M 64 64 L 48 64 L 64 48 Z" fill="inherit" />
            </symbol>
            <clipPath id={clipId}>
              <rect x={x * 32} y={y * 32} width="32" height="32" />
            </clipPath>
          </defs>

          <g clipPath={`url(#${clipId})`} clipPathUnits="userSpaceOnUse">
            <use
              href={`#${glyphId}`}
              x={x * 32}
              y={y * 32}
              width="32"
              height="32"
              fill="rgba(255, 255, 255, 0.6)"
            >
              <animate
                attributeName="x"
                from={(x - 1) * 32}
                to={x * 32}
                dur="2s"
                repeatCount="indefinite"
                direction="alternate"
                fill="freeze"
              />
            </use>
            <use
              href={`#${glyphId}`}
              x={(x + 1) * 32}
              y={y * 32}
              width="32"
              height="32"
              fill="rgba(255, 255, 255, 0.6)"
            >
              <animate
                attributeName="x"
                from={x * 32}
                to={(x + 1) * 32}
                dur="2s"
                repeatCount="indefinite"
                direction="alternate"
                fill="freeze"
              />
            </use>
          </g>
        </>
      )}

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
