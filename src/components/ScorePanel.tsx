import { Stack, Typography } from "@mui/material";
import Panel from "./Panel";
import { useIsMobileLandscape } from "../utils";
import Score from "./Score";
import Bolt from "./Bolt";
import { useAtomValue } from "jotai";
import { fillingBonusAtom, packageScoreAtom } from "../states";

const ScorePanel = () => {
  const isMobileLandscape = useIsMobileLandscape();
  const boltOffset = isMobileLandscape ? 4 : 8;
  const packageScore = useAtomValue(packageScoreAtom);
  const fillingBonus = useAtomValue(fillingBonusAtom);

  return (
    <Panel
      padding={isMobileLandscape ? 0.5 : 1}
      paddingBottom={isMobileLandscape ? 1 : 3}
      backgroundColor="#5ba6c5"
      display="flex"
      justifyContent="center"
      position="relative"
    >
      <Stack
        maxWidth="90%"
        height="100%"
        display="inline-flex"
        justifyContent="center"
        alignItems="stretch"
        gap={isMobileLandscape ? 0 : 0.5}
        flex={1}
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
          <Score variant="default" score={packageScore} />
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
          <Score variant="bonus" score={fillingBonus} />
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
          <Score
            variant="default"
            score={Math.round(packageScore * fillingBonus)}
          />
        </Stack>
      </Stack>

      {/* 볼트 장식 */}
      <Bolt top={boltOffset} left={boltOffset} />
      <Bolt top={boltOffset} right={boltOffset} />
      <Bolt bottom={boltOffset} left={boltOffset} />
      <Bolt bottom={boltOffset} right={boltOffset} />
    </Panel>
  );
};

export default ScorePanel;
