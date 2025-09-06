import { Box, Stack, Typography } from "@mui/material";
import Panel from "./Panel";
import Bolt from "./Bolt";
import { useAtomValue } from "jotai";
import {
  bestFillingBonusAtom,
  bestPackageScoreAtom,
  placedBlockCountAtom,
  sentPackageCountAtom,
} from "../states";

const TotalScorePanel = () => {
  const placedBlockCount = useAtomValue(placedBlockCountAtom);
  const sentPackageCount = useAtomValue(sentPackageCountAtom);
  const bestPackageScore = useAtomValue(bestPackageScoreAtom);
  const bestFillingBonus = useAtomValue(bestFillingBonusAtom);

  return (
    <Panel backgroundColor="#d1fec1">
      <Stack>
        {/* 별점 컨테이너 */}
        <Stack direction="row" justifyContent="center"></Stack>

        {/* 구분선 */}
        <Box height="2px" bgcolor="#6ecf76" />

        {/* 점수 컨테이너 */}
        <Stack gap={3} position="relative" padding={5}>
          {/* 볼트 장식 */}
          <Bolt top={8} left={8} />
          <Bolt top={8} right={8} />
          <Bolt bottom={8} left={8} />
          <Bolt bottom={8} right={8} />

          {/* 배치한 블록 수 */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">배치한 블록:</Typography>
            <Typography variant="h6">{placedBlockCount}</Typography>
          </Stack>

          {/* 보낸 패키지 수 */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">보낸 패키지:</Typography>
            <Typography variant="h6">{sentPackageCount}</Typography>
          </Stack>

          {/* 포장 최고 점수 */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">포장 최고 점수:</Typography>
            <Typography variant="h6">{bestPackageScore}</Typography>
          </Stack>

          {/* 최고 포장 패키지 */}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">최고 포장 패키지:</Typography>
            <Typography variant="h6">{bestFillingBonus}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Panel>
  );
};

export default TotalScorePanel;
