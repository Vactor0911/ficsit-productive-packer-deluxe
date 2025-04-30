import { Stack, StackProps } from "@mui/material";
import BlockImage from "./BlockImage";

interface BlockProps extends StackProps {
  blockId: number;
  tileSize?: number;
  disabledAlign?: boolean;
}

const Block = (props: BlockProps) => {
  const { blockId, tileSize = 10, disabledAlign, ...others } = props;

  return (
    <Stack position="relative" {...others}>
      <BlockImage
        blockId={blockId}
        tileSize={tileSize}
        disableAlign={disabledAlign}
        position="relative"
        zIndex={1}
        sx={{
          filter: "brightness(0.85)",
        }}
      />
      <BlockImage
        blockId={blockId}
        tileSize={tileSize}
        disableAlign={disabledAlign}
        position="absolute"
        top="-10px"
        left="0"
        zIndex={2}
      />
    </Stack>
  );
};

export default Block;
