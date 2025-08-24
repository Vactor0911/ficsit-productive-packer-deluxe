import { Box, Stack, Typography, type StackProps } from "@mui/material";
import BlockData from "../assets/blocks.json";
import CoinImage from "../assets/images/coin.svg";
import { useIsMobileLandscape } from "../utils";
import BlockBase from "./BlockBase";

interface BlockProps extends StackProps {
  id: string;
  blockId: number;
  displayScore?: boolean;
}

const Block = (props: BlockProps) => {
  const { id, blockId, displayScore = true, ...others } = props;

  const isMobileLandscape = useIsMobileLandscape();

  const block = BlockData.find((block) => block.id === blockId);

  // 블록을 찾지 못하면 null 반환
  if (!block) {
    return null;
  }

  // 블록 데이터
  const grid = block.grid || [[1]]; // 그리드 배열
  const score = block.score || 0; // 점수

  return (
    <Stack justifyContent="center" alignItems="center" {...others}>
      {/* 블록 */}
      <Box position="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="-1 1 130 132"
        >
          <BlockBase id={id} blockId={blockId} />
        </svg>

        {/* 점수 */}
        {displayScore && (
          <Stack
            width={
              isMobileLandscape
                ? "16px"
                : {
                    xs: "24px",
                    sm: "32px",
                  }
            }
            height={
              isMobileLandscape
                ? "16px"
                : {
                    xs: "24px",
                    sm: "32px",
                  }
            }
            justifyContent="center"
            alignItems="center"
            position="absolute"
            bottom={`${(4 - grid.length) * 11.25}%`}
            right={`${(4 - grid[0].length) * 11.25}%`}
            sx={{
              transform: "translate(0, 25%)",
            }}
          >
            {/* 코인 이미지 */}
            <Box
              component="img"
              src={CoinImage}
              width="100%"
              height="100%"
              position="absolute"
              top={0}
              left={0}
            />

            {/* 점수 텍스트 */}
            <Typography
              variant="body2"
              textAlign="center"
              color="white"
              fontWeight="bold"
              fontSize={isMobileLandscape ? "0.5rem" : "inherit"}
              position="relative"
              zIndex={1}
              sx={{
                transform: "translateY(-7%)",
              }}
            >
              {score}
            </Typography>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default Block;
