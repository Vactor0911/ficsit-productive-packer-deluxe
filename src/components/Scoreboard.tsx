import { Stack, Typography } from "@mui/material";
import Panel from "./Panel";
import ScoreTimer from "./ScoreTimer";
import Coin from "../assets/images/coin.svg";

const Scoreboard = () => {
  return (
    <Panel>
      <Stack direction="row" gap={2} padding={1}>
        {/* 제한시간 */}
        <ScoreTimer time={20} maxTime={100} isTimeAlert />

        {/* 점수 */}
        <Stack gap={3}>
          <Typography variant="h4">최종 점수 :</Typography>
          <Stack direction="row" gap={1} alignItems="center">
            <img src={Coin} alt="coin" width="80px" height="80px" />
            <Typography variant="h1" fontSize="5em" lineHeight="1em">
              100
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Panel>
  );
};

export default Scoreboard;
