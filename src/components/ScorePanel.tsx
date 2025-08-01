import { Stack, Typography } from "@mui/material";
import Panel from "./Panel";
import { useIsMobileLandscape } from "../utils";
import Score from "./Score";

const ScorePanel = () => {
  const isMobileLandscape = useIsMobileLandscape();

  return (
    <Panel
      padding={isMobileLandscape ? 0.5 : 1}
      backgroundColor="#5ba6c5"
      display="flex"
      justifyContent="center"
    >
      <Stack
        maxWidth="90%"
        height="100%"
        display="inline-flex"
        justifyContent="center"
        alignItems="stretch"
        gap={isMobileLandscape ? 0 : 0.5}
      >
        {/* 포장 점수 */}
        <Typography
          variant="subtitle1"
          color="white"
          noWrap
          fontSize={isMobileLandscape ? "0.65rem" : "inherit"}
          textAlign="center"
        >
          포장 점수:
        </Typography>
        <Stack
          alignItems="center"
          padding={isMobileLandscape ? "0 8px" : "2px 16px"}
          borderRadius="50px"
          bgcolor="#49859d"
        >
          <Score variant="default" score={0} />
        </Stack>

        {/* 채우기 보너스 */}
        <Typography
          variant="subtitle1"
          color="white"
          noWrap
          fontSize={isMobileLandscape ? "0.65rem" : "inherit"}
          textAlign="center"
        >
          채우기 보너스:
        </Typography>
        <Stack
          alignItems="center"
          padding={isMobileLandscape ? "0 8px" : "2px 16px"}
          borderRadius="50px"
          bgcolor="#49859d"
        >
          <Score variant="bonus" score={0} />
        </Stack>

        {/* 최종 배달 점수 */}
        <Typography
          variant="subtitle1"
          color="white"
          noWrap
          fontSize={isMobileLandscape ? "0.65rem" : "inherit"}
          textAlign="center"
        >
          최종 배달 점수:
        </Typography>
        <Stack
          alignItems="center"
          padding={isMobileLandscape ? "0 8px" : "2px 16px"}
          borderRadius="50px"
          bgcolor="#49859d"
        >
          <Score variant="default" score={0} />
        </Stack>
      </Stack>
    </Panel>
  );
};

export default ScorePanel;
