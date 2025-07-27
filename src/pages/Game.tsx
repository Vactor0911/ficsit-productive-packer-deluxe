import { Box, Container, Stack, Typography } from "@mui/material";
import Panel from "../components/Panel";
import Score from "../components/Score";
import { useCallback, useState } from "react";
import Timer from "../components/Timer";
import { useIsMobileLandscape } from "../utils";
import ConveyorSupport from "../components/ConveyorSupport";

const Game = () => {
  const isMobileLandscape = useIsMobileLandscape();

  const [score, setScore] = useState(1234567890);

  // const handleScoreAdd = useCallback(() => {
  //   setScore((prevScore) => prevScore + Math.floor(Math.random() * 1000));
  // }, []);

  return (
    <Stack height="100vh">
      {/* 점수 판 */}
      <Container
        maxWidth={isMobileLandscape ? "xs" : "md"}
        sx={{
          height: isMobileLandscape ? "80px" : "auto",
          maxWidth: isMobileLandscape ? "auto" : "700px !important",
          marginTop: isMobileLandscape
            ? 1
            : {
                xs: 1,
                md: 2,
              },
        }}
      >
        <Panel backgroundColor="#fffff7">
          <Stack
            direction="row"
            height="100%"
            padding={
              isMobileLandscape
                ? 0.5
                : {
                    xs: 0.5,
                    md: 1,
                  }
            }
            paddingY={
              isMobileLandscape
                ? 0.5
                : {
                    xs: 0.5,
                    md: 1.5,
                  }
            }
            gap={1}
          >
            {/* 타이머 */}
            <Box fontSize={isMobileLandscape ? "0.65rem" : "inherit"}>
              <Timer />
            </Box>

            <Stack gap={isMobileLandscape ? 0 : 1} flex={1} overflow="hidden">
              {/* 헤더 */}
              <Typography variant="subtitle1">최종 점수 :</Typography>

              {/* 최종 점수 */}
              <Score variant="total" score={score} />
            </Stack>
          </Stack>
        </Panel>
      </Container>

      {/* 상부 지지대 */}
      <ConveyorSupport marginTop={1.5} />

      {/* 컨베이어 벨트 */}
      <Box flex={1} />

      {/* 하부 지지대 */}
      <ConveyorSupport
        marginBottom={{
          xs: 1.5,
          md: 3,
        }}
      />
    </Stack>
  );
};

export default Game;
