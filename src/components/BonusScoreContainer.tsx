import { Box, Stack, Typography } from "@mui/material";
import Panel from "./Panel";
import Bolt from "../assets/images/bolt.svg";
import BonusScore from "./ScoreMultiplier";

const BoltStyle = {
  component: "img" as React.ElementType,
  src: Bolt,
  alt: "bolt",
  width: "20px",
  position: "absolute" as const,
};

const BonusScoreContainer = () => {
  return (
    // 보너스 점수 컨테이너
    <Panel color="#5ba6c5">
      <Stack
        justifyContent="center"
        padding={3}
        px={4}
        gap={1}
        position="relative"
      >
        {/* 볼트 */}
        <Box {...BoltStyle} top={10} left={5} />
        <Box {...BoltStyle} top={10} right={5} />
        <Box {...BoltStyle} bottom={10} left={5} />
        <Box {...BoltStyle} bottom={10} right={5} />

        {/* 포장 점수 */}
        <Typography variant="h3" color="white" textAlign="center">
          포장 점수 :
        </Typography>
        <BonusScore score={0} />

        {/* 채우기 보너스 */}
        <Typography variant="h3" color="white" textAlign="center">
          채우기 보너스 :
        </Typography>
        <BonusScore score={0} />

        {/* 최종 배달 점수 */}
        <Typography variant="h3" color="white" textAlign="center">
          최종 배달 점수 :
        </Typography>
        <BonusScore score={0} />
      </Stack>
    </Panel>
  );
};

export default BonusScoreContainer;
