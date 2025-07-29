import { Box, Container, Stack, Typography } from "@mui/material";
import Panel from "../components/Panel";
import Score from "../components/Score";
import { useCallback, useState } from "react";
import Timer from "../components/Timer";
import { useIsMobileLandscape } from "../utils";
import ConveyorSupport from "../components/ConveyorSupport";
import Marquee from "react-fast-marquee";

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

      {/* 컨베이어 */}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        flex={1}
        position="relative"
      >
        {/* 박스 */}
        <Box
          width={
            isMobileLandscape
              ? "50vw"
              : {
                  xs: "100vw",
                  md: "50vw",
                }
          }
          maxWidth="700px"
          height="90%"
          marginX={3}
          bgcolor="red"
        />

        {/* 컨베이어 벨트 */}
        <Box position="absolute" width="100%" height="100%" zIndex={-1}>
          <Marquee
            autoFill
            direction="right"
            speed={500}
            play={false}
            css={{
              width: "100%",
              height: "100%",
              position: "relative",
              overflow: "hidden",
              background: "#4d4d4d",
              "& .rfm-child": {
                height: "100%",
              },
            }}
          >
            <Box
              width={
                isMobileLandscape
                  ? "120px"
                  : {
                      xs: "120px",
                      sm: "180px",
                      md: "240px",
                    }
              }
              height="100%"
              sx={{
                background: `
                  conic-gradient(from -15deg at calc(100% - 2px), #0000 210deg, #4d4d4d 0),
                  conic-gradient(from -15deg at 100%, #4d4d4d 210deg, #000 0)`,
                backgroundSize: isMobileLandscape
                  ? "120px 100%"
                  : {
                      xs: "120px 100%",
                      sm: "180px 100%",
                      md: "240px 100%",
                    },
              }}
            />
          </Marquee>
        </Box>
      </Stack>

      {/* 하부 지지대 */}
      <ConveyorSupport
        marginBottom={{
          xs: 2.5,
          md: 5,
        }}
      />

      {/* 모바일, 태블릿용 블록 컨테이너 */}
      <Box
        display={
          isMobileLandscape
            ? "none"
            : {
                xs: "block",
                md: "none",
              }
        }
        flex={1}
      />
    </Stack>
  );
};

export default Game;
