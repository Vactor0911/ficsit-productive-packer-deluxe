import { Box, Container, Stack, Typography } from "@mui/material";
import Panel from "../components/Panel";
import Score from "../components/Score";
import { useState } from "react";
import Timer from "../components/Timer";
import { useIsMobileLandscape } from "../utils";

const Game = () => {
  const isMobileLandscape = useIsMobileLandscape();

  const [score, setScore] = useState(1234);

  // const handleScoreAdd = useCallback(() => {
  //   setScore((prevScore) => prevScore + Math.floor(Math.random() * 1000));
  // }, []);

  // 모바일 가로 화면
  if (isMobileLandscape) {
    return null;
  }

  // 기본 화면
  return (
    <Stack height="100vh">
      {/* 점수 판 */}
      <Container
        maxWidth="md"
        sx={{
          maxWidth: "700px !important",
          marginTop: {
            xs: 1,
            md: 2,
          },
        }}
      >
        <Panel backgroundColor="#fffff7">
          <Stack
            direction="row"
            height="100%"
            padding={{
              xs: 0.5,
              md: 1,
            }}
            paddingY={{
              xs: 0.5,
              md: 1.5,
            }}
            gap={1}
          >
            {/* 타이머 */}
            <Timer />

            <Stack gap={1} flex={1}>
              {/* 헤더 */}
              <Typography variant="subtitle1">최종 점수 :</Typography>

              {/* 최종 점수 */}
              <Box>
                <Score
                  variant="total"
                  score={score}
                  typographyProps={{
                    variant: "h2",
                  }}
                />
              </Box>
            </Stack>
          </Stack>
        </Panel>
      </Container>
    </Stack>
  );
};

export default Game;
