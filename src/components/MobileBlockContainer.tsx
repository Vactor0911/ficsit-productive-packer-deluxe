import { Box, Stack } from "@mui/material";
import Bolt from "./Bolt";
import { useAtom } from "jotai";
import { blockIdQueueAtom } from "../states";
import Block from "./Block";

const MobileBlockContainer = () => {
  const [blockIdQueue] = useAtom(blockIdQueueAtom);

  return (
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
          flexWrap="wrap"
          padding="16px 8px"
        >
          {blockIdQueue.map((blockId, index) => (
            <Block
              key={`block-${index}`}
              id={`block-${index}`}
              width="25%"
              height="50%"
              blockId={blockId}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default MobileBlockContainer;
