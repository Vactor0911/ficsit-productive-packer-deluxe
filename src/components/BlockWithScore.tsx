import { Box, Stack, StackProps, Typography } from "@mui/material";
import Block from "./Block";
import Coin from "../assets/images/coin.svg";
import BlockData from "../assets/blocks.json";

interface BlockWithScoreProps extends StackProps {
  blockId: number;
  tileSize?: number;
}

const BlockWithScore = (props: BlockWithScoreProps) => {
  const { blockId, tileSize = 10 } = props;

  return (
    <Stack
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      position="relative"
      sx={{
        cursor: "pointer",
      }}
    >
      {/* 블럭 */}
      <Block blockId={blockId} tileSize={tileSize} disabledAlign />

      {/* 점수 */}
      <Box
        width="30%"
        position="absolute"
        bottom={0}
        right={0}
        zIndex={5}
        sx={{
          aspectRatio: "1 / 1",
        }}
      >
        <Box
          component="img"
          src={Coin}
          alt="coin"
          width="100%"
          position="absolute"
          bottom={0}
          left={0}
        />
        <Typography
          variant="h4"
          position="absolute"
          color="white"
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -60%)",
          }}
        >
          {BlockData[blockId].score}
        </Typography>
      </Box>
    </Stack>
  );
};

export default BlockWithScore;
