import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Block, { type BlockProps } from "./Block";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import BlockData from "../assets/blocks.json";
import { useIsMobileLandscape } from "../utils";

interface DraggableBlockProps extends BlockProps {
  ghostSize?: number;
}

const DraggableBlock = (props: DraggableBlockProps) => {
  const { id, blockId, shadow, ghostSize, ...others } = props;

  const theme = useTheme();

  const isMobileLandscape = useIsMobileLandscape();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  // 블록 ID로 데이터 찾기
  const block = useMemo(() => {
    return BlockData.find((block) => block.id === blockId);
  }, [blockId]);

  const dragRef = useRef<HTMLDivElement | null>(null);
  const [ghost, setGhost] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({
    visible: false,
    x: 0,
    y: 0,
  });
  const draggingRef = useRef(false);

  // 블록 크기
  const blockContainerRef = useRef<HTMLDivElement>(null);
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

  // 고스트 이미지 오프셋
  const offsetY = useMemo(() => {
    return isMobileLandscape || isXs ? -blockSize * 0.75 : 0;
  }, [isMobileLandscape, isXs, blockSize]);

  // 마우스 버튼 누름
  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // 마우스인 경우 왼쪽 버튼만 허용, 터치/펜은 통과
      if (e.pointerType === "mouse" && e.button !== 0) {
        return;
      }

      draggingRef.current = true;
      (e.currentTarget as Element).setPointerCapture?.(e.pointerId);

      setGhost({ visible: true, x: e.clientX, y: e.clientY + offsetY });
    },
    [offsetY]
  );

  // 드래그
  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) {
        return;
      }

      setGhost((g) =>
        g.x === e.clientX && g.y === e.clientY
          ? g
          : { ...g, x: e.clientX, y: e.clientY + offsetY }
      );
    },
    [offsetY]
  );

  // 드래그 종료
  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) {
      return;
    }

    draggingRef.current = false;
    (e.currentTarget as Element).releasePointerCapture?.(e.pointerId);

    setGhost((g) => ({ ...g, visible: false }));
    console.log("[drag:end]", { x: e.clientX, y: e.clientY });
  }, []);

  if (!block) {
    return null;
  }

  const grid = block.grid || [[1]]; // 그리드 배열

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      position="relative"
      {...others}
    >
      <Block
        ref={blockContainerRef}
        id={id}
        blockId={blockId}
        shadow={shadow}
        width="100%"
        height="100%"
      />

      {/* 드래그 영역 */}
      <Box
        ref={dragRef}
        width={`calc(${blockSize * 0.25 * grid[0].length}px + 25%)`}
        height={`calc(${blockSize * 0.25 * grid.length + 10}px + 25%)`}
        maxWidth={blockSize}
        maxHeight={blockSize}
        top="50%"
        left="50%"
        position="absolute"
        sx={{
          cursor: ghost.visible ? "grabbing" : "grab",
          transform: "translate(-50%, -50%)",
          touchAction: "none",
          userSelect: "none",
          WebkitUserDrag: "none",
        }}
        draggable
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />

      {/* 고스트 이미지 */}
      {ghost.visible && (
        <Block
          id={id}
          blockId={blockId}
          displayScore={false}
          position="fixed"
          left={ghost.x}
          top={ghost.y}
          width={ghostSize ? ghostSize : blockSize}
          animation={true}
          sx={{
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 13000,
          }}
        />
      )}
    </Stack>
  );
};

export default DraggableBlock;
