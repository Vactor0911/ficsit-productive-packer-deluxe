import { useAtomValue } from "jotai";
import Block from "./Block";
import {
  blockIdQueueAtom,
  draggableBlockGhostAtom,
  dragSnapPointAtom,
} from "../states";
import { useMemo } from "react";

interface DraggableBlockGhostProps {
  ghostSize?: number;
}

const DraggableBlockGhost = ({ ghostSize }: DraggableBlockGhostProps) => {
  const ghost = useAtomValue(draggableBlockGhostAtom);
  const blockIdQueue = useAtomValue(blockIdQueueAtom);
  const dragSnapPoint = useAtomValue(dragSnapPointAtom);

  const blockId = useMemo(() => {
    if (ghost.id === null || ghost.id < 0) {
      return null;
    }

    return blockIdQueue[ghost.id] || null;
  }, [blockIdQueue, ghost.id]);

  if (ghost.id === null || ghost.id < 0) {
    return null;
  }

  return (
    <Block
      id={`block-${ghost.id}`}
      blockId={blockId || 0}
      displayScore={false}
      position="fixed"
      left={ghost.x}
      top={ghost.y}
      width={ghostSize}
      animation={dragSnapPoint ? dragSnapPoint.isValid : true}
      error={dragSnapPoint ? !dragSnapPoint.isValid : false}
      sx={{
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 13000,
      }}
    />
  );
};

export default DraggableBlockGhost;
