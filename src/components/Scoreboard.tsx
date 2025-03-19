import { Box, Stack, Typography } from "@mui/material";
import Panel from "./Panel";
import ScoreTimer from "./ScoreTimer";
import Coin from "../assets/images/coin.svg";

const Scoreboard = () => {
  return (
    <Panel padding={1}>
      <Stack direction="row" gap={2}>
        {/* 제한시간 */}
        <ScoreTimer />

        {/* 점수 */}
        <Stack
          gap={{
            md: 3,
            xs: 2,
          }}
        >
          <Typography variant="h4">최종 점수 :</Typography>
          <Stack direction="row" gap={1} alignItems="center">
            <Box
              component="img"
              src={Coin}
              alt="coin"
              width={{
                md: "80px",
                sm: "70px",
                xs: "45px",
              }}
            />
            <Typography
              variant="h1"
              fontSize={{
                md: "5em",
                sm: "4em",
                xs: "2.5em",
              }}
              lineHeight="1em"
            >
              100
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Panel>
  );
};

export default Scoreboard;
