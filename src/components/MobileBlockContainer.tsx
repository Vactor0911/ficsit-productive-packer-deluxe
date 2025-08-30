import { Box, Stack } from "@mui/material";
import Bolt from "./Bolt";
import { useAtom, useAtomValue } from "jotai";
import { blockIdQueueAtom, boardGridSizeAtom } from "../states";
import DraggableBlock from "./DraggableBlock";
import DraggableBlockGhost from "./DraggableBlockGhost";

const MobileBlockContainer = () => {
  const [blockIdQueue] = useAtom(blockIdQueueAtom);
  const boardGridSize = useAtomValue(boardGridSizeAtom);

  return (
    <>
      <Stack width="100%" height="100%" minHeight="200px" position="relative">
        {/* 상부 장식 */}
        <Box
          height="12px"
          bgcolor="#4d4d4d"
          borderTop="2px solid black"
          borderBottom="2px solid black"
        />

        {/* 블록 컨테이너 */}
        <Box height="calc(100% - 12px)" bgcolor="#666666" position="relative">
          {/* 볼트 장식 */}
          <Bolt top={8} left={8} />
          <Bolt top={8} right={8} />

          <Stack
            direction="row"
            width="100%"
            height="100%"
            justifyContent="space-between"
            flexWrap="wrap"
            padding="16px 8px"
          >
            {blockIdQueue.map((blockId, index) => (
              <DraggableBlock
                key={`block-${index}`}
                id={`block-${index}`}
                width="calc(25% - 2px)"
                height="calc(50% - 2px)"
                blockId={blockId}
                shadow={true}
              />
            ))}
          </Stack>
        </Box>
      </Stack>

      {/* 고스트 블록 */}
      <DraggableBlockGhost ghostSize={boardGridSize * 4} />
    </>
  );
};

export default MobileBlockContainer;
