import { useAtom, useAtomValue } from "jotai";
import {
  blockIdQueueAtom,
  boardGridAtom,
  boardGridSizeAtom,
  boardPositionRefAtom,
  draggableBlockGhostAtom,
  dragSnapPointAtom,
} from "../states";
import BlockData from "../assets/blocks.json";
import { useCallback, useEffect, useMemo } from "react";
import BlockBase from "./BlockBase";

const BlockPlacePreview = () => {
  const boardPositionRef = useAtomValue(boardPositionRefAtom);
  const draggableBlockGhost = useAtomValue(draggableBlockGhostAtom);
  const blockIdQueue = useAtomValue(blockIdQueueAtom);
  const [dragSnapPoint, setDragSnapPoint] = useAtom(dragSnapPointAtom);
  const boardGridSize = useAtomValue(boardGridSizeAtom);
  const boardGrid = useAtomValue(boardGridAtom);

  // 블럭 데이터 찾기
  const block = useMemo(() => {
    const id = draggableBlockGhost.id;
    if (id === null || id < 0) {
      return null;
    }

    return BlockData.find((block) => block.id === blockIdQueue[id]);
  }, [blockIdQueue, draggableBlockGhost.id]);

  // 스냅 포인트 위치 계산
  useEffect(() => {
    if (!block) {
      return;
    }

    // 보드 위치 계산
    const boardRect = boardPositionRef?.getBoundingClientRect();

    if (!boardRect) {
      return;
    }

    const x = boardRect.left + window.scrollX;
    const y = boardRect.top + window.scrollY;

    // 스냅 포인트 오프셋 계산
    const grid = block.grid;
    const snapOffsetX = boardGridSize * (grid[0].length - 1) * 0.5;
    const snapOffsetY = boardGridSize * (grid.length - 1) * 0.5;

    // 스냅 포인트 계산
    const snapX = Math.floor(
      (draggableBlockGhost.x - x - snapOffsetX) / boardGridSize
    );
    const snapY = Math.floor(
      (draggableBlockGhost.y - y - snapOffsetY) / boardGridSize
    );

    // 스냅 포인트 경계 검증
    if (
      snapX < 0 ||
      snapY < 0 ||
      snapX > boardGrid[0].length - grid[0].length ||
      snapY > boardGrid.length - grid.length
    ) {
      setDragSnapPoint(null);
      return;
    }

    // 스냅 포인트 위치 적용
    if (dragSnapPoint?.x !== snapX || dragSnapPoint?.y !== snapY) {
      setDragSnapPoint((prev) => ({
        x: snapX,
        y: snapY,
        isValid: prev?.isValid ?? false,
      }));
    }
  }, [
    block,
    boardGrid,
    boardGridSize,
    boardPositionRef,
    dragSnapPoint?.x,
    dragSnapPoint?.y,
    draggableBlockGhost.x,
    draggableBlockGhost.y,
    setDragSnapPoint,
  ]);

  // 스냅 포인트 유효성 검증
  useEffect(() => {
    // 블럭 데이터 또는 스냅 포인트가 없다면 중지
    if (!block || !dragSnapPoint) {
      return;
    }

    // 그리드 유효성 검사
    const hasOverlap = block.grid.some((row, i) =>
      row.some((cell, j) => {
        if (cell) {
          return (
            boardGrid[dragSnapPoint.y + i][dragSnapPoint.x + j].blockId !==
            undefined
          );
        }
        return false;
      })
    );

    setDragSnapPoint((prev) =>
      prev ? { ...prev, isValid: !hasOverlap } : null
    );
  }, [block, boardGrid, dragSnapPoint, setDragSnapPoint]);

  // 스냅 미리보기 블록 색상
  const getBlockColor = useCallback(() => {
    if (!dragSnapPoint) {
      return block?.color;
    }

    if (dragSnapPoint.isValid) {
      return block?.color;
    }
    return "red";
  }, [block, dragSnapPoint]);

  // 블럭 데이터가 없다면 렌더링 중지
  if (!block) {
    return null;
  }

  // 스냅 포인트가 보드 경계 밖이라면 렌더링 중지
  if (!dragSnapPoint) {
    return null;
  }

  const grid = block.grid;

  // 블록 스냅 포인트 미리보기 렌더링
  return (
    <>
      {grid.map((row, i) => {
        return row.map((cell, j) => {
          if (!cell) {
            return null;
          }

          return (
            <BlockBase
              key={`snap-preview-${i}-${j}`}
              x={j + dragSnapPoint.x}
              y={i + dragSnapPoint.y}
              // dragSnapPoint ? !dragSnapPoint.isValid : false
              color={getBlockColor()}
              borderTop={i === 0 || grid[i - 1]?.[j] === 0}
              borderBottom={i === grid.length - 1 || grid[i + 1]?.[j] === 0}
              borderLeft={j === 0 || grid[i]?.[j - 1] === 0}
              borderRight={j === grid[i].length - 1 || grid[i]?.[j + 1] === 0}
              opacity={0.5}
            />
          );
        });
      })}
    </>
  );
};

export default BlockPlacePreview;
