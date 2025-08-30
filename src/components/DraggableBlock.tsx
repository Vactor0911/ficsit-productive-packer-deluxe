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
import { useSetAtom } from "jotai";
import { drraggableBlockGhostAtom } from "../states";

const DraggableBlock = (props: BlockProps) => {
  const { id, blockId, shadow, ...others } = props;

  const theme = useTheme();

  const isMobileLandscape = useIsMobileLandscape();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  // 블록 ID로 데이터 찾기
  const block = useMemo(() => {
    return BlockData.find((block) => block.id === blockId);
  }, [blockId]);

  const setGhost = useSetAtom(drraggableBlockGhostAtom);
  const [dragging, setDragging] = useState(false);
  const rafRef = useRef<number | null>(null);

  // 블록 크기
  const blockContainerRef = useRef<HTMLDivElement>(null);
  const [blockSize, setBlockSize] = useState(0);

  // 호버 효과
  const [hover, setHover] = useState(false);

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
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // 마우스인 경우 왼쪽 버튼만 허용, 터치/펜은 통과
      if (e.pointerType === "mouse" && e.button !== 0) {
        return;
      }

      setDragging(true);
      (e.currentTarget as Element).setPointerCapture?.(e.pointerId);

      const index = Number(id.replace("block-", ""));

      setGhost({ id: index, x: e.clientX, y: e.clientY + offsetY });
    },
    [id, offsetY, setGhost]
  );

  // 드래그
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging) {
        return;
      }

      // raf 적용
      rafRef.current = requestAnimationFrame(() => {
        // 바뀐 좌표 업데이트
        setGhost((g) => {
          if (g.x === e.clientX && g.y === e.clientY + offsetY) {
            return { ...g };
          }

          return { ...g, x: e.clientX, y: e.clientY + offsetY };
        });

        rafRef.current = null;
      });
    },
    [dragging, offsetY, setGhost]
  );

  // raf 리소스 정리
  useEffect(
    () => () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    },
    []
  );

  // 드래그 종료
  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging) {
        return;
      }

      setDragging(false);
      (e.currentTarget as Element).releasePointerCapture?.(e.pointerId);

      setGhost((g) => ({ ...g, id: null }));
      console.log("[drag:end]", { x: e.clientX, y: e.clientY });
    },
    [dragging, setGhost]
  );

  // 드래그 영역 마우스 진입
  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);

  // 드래그 영역 마우스 나감
  const handleMouseLeave = useCallback(() => {
    setHover(false);
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
        sx={{
          filter: hover ? "brightness(0.6)" : "none",
        }}
      />

      {/* 드래그 영역 */}
      <Box
        width={`calc(${blockSize * 0.25 * grid[0].length}px + 25%)`}
        height={`calc(${blockSize * 0.25 * grid.length + 10}px + 25%)`}
        maxWidth={blockSize}
        maxHeight={blockSize}
        top="50%"
        left="50%"
        position="absolute"
        sx={{
          cursor: dragging ? "grabbing" : "grab",
          transform: "translate(-50%, -50%)",
          touchAction: "none",
          userSelect: "none",
          WebkitUserDrag: "none",
        }}
        draggable
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={handlePointerUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </Stack>
  );
};

export default DraggableBlock;
