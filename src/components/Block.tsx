import { Stack, StackProps } from "@mui/material";
import { useAtomValue } from "jotai";
import { tileSizeAtom } from "../states";
import BlockImage from "./BlockImage";

interface BlockProps extends StackProps {
  blockId: number;
}

const Block = (props: BlockProps) => {
  const { blockId, ...others } = props;
  const tileSize = useAtomValue(tileSizeAtom);

  return (
    <Stack position="relative" {...others}>
      <BlockImage
        blockId={blockId}
        tileSize={tileSize}
        position="relative"
        zIndex={1}
        sx={{
          filter: "brightness(0.85)",
        }}
      />
      <BlockImage
        blockId={blockId}
        tileSize={tileSize}
        position="absolute"
        top="-10px"
        left="0"
        zIndex={2}
      />
    </Stack>
  );
};

export default Block;
