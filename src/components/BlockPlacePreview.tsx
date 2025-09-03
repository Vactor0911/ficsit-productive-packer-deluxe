import { useAtomValue } from "jotai";
import {
  blockIdQueueAtom,
  boardPositionRefAtom,
  draggableBlockGhostAtom,
} from "../states";
import BlockData from "../assets/blocks.json";
import { useEffect, useMemo } from "react";
import BlockBase from "./BlockBase";

const BlockPlacePreview = () => {
  const boardPositionRef = useAtomValue(boardPositionRefAtom);
  const draggableBlockGhost = useAtomValue(draggableBlockGhostAtom);
  const blockIdQueue = useAtomValue(blockIdQueueAtom);

  // 블럭 데이터 찾기
  const block = useMemo(() => {
    const id = draggableBlockGhost.id;
    if (id === null || id < 0) {
      return null;
    }

    return BlockData.find((block) => block.id === blockIdQueue[id]);
  }, [blockIdQueue, draggableBlockGhost.id]);

  useEffect(() => {
    if (!block) {
      return;
    }

    const boardRect = boardPositionRef?.getBoundingClientRect();

    console.log(
      "드래그 위치 >> ",
      draggableBlockGhost.x,
      draggableBlockGhost.y
    );
    console.log("보드 위치 >> ", boardRect?.x, boardRect?.y);

    console.log(
      draggableBlockGhost.x - (boardRect?.x ?? 0),
      draggableBlockGhost.y - (boardRect?.y ?? 0)
    );
  });

  // 블럭 데이터가 없다면 렌더링 중지
  if (!block) {
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
              x={j}
              y={i}
              color={block.color}
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
