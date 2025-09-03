import { Box, Container, Stack, Typography } from "@mui/material";
import Panel from "../components/Panel";
import Score from "../components/Score";
import { useEffect, useMemo } from "react";
import Timer from "../components/Timer";
import { useIsMobileLandscape } from "../utils";
import ConveyorSupport from "../components/ConveyorSupport";
import Marquee from "react-fast-marquee";
import Package from "../components/Package";
import BlockContainer from "../components/BlockContainer";
import MobileBlockContainer from "../components/MobileBlockContainer";
import { useAtomValue } from "jotai";
import { scoreAtom, vhAtom } from "../states";
import ScorePanel from "../components/ScorePanel";
import SendButton from "../components/SendButton";
import { Navigate, useLocation } from "react-router-dom";
import { useBoard } from "../hooks";
import ScoreEffectsRenderer from "../components/ScoreEffectsRenderer";

const Game = () => {
  const isMobileLandscape = useIsMobileLandscape();
  const location = useLocation();
  const { resetBoard, addBlock } = useBoard();

  const score = useAtomValue(scoreAtom);
  const vh = useAtomValue(vhAtom);

  // URL에서 레벨 추출
  const level = useMemo(
    () => location.pathname.split("/").pop(),
    [location.pathname]
  );

  // 보드 그리드 초기화
  useEffect(() => {
    if (level) {
      resetBoard(Number(level));
    }
  }, [addBlock, level, resetBoard]);

  // 레벨 유효성 검증
  if (
    !level ||
    isNaN(Number(level)) ||
    Number(level) < 1 ||
    Number(level) > 6
  ) {
    return <Navigate to="/levels" />;
  }

  return (
    <Stack height={`${vh * 100}px`}>
      {/* 점수 판 */}
      <Container
        maxWidth={isMobileLandscape ? "xs" : "md"}
        sx={{
          maxWidth: isMobileLandscape ? "auto" : "700px !important",
          height: isMobileLandscape ? "80px" : "auto",
          marginTop: isMobileLandscape
            ? 1
            : {
                xs: 1,
                md: 2,
              },
          position: "relative",
          zIndex: 100,
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
            <Box
              fontSize={
                isMobileLandscape
                  ? "0.65rem"
                  : {
                      xs: "0.8rem",
                      sm: "inherit",
                    }
              }
            >
              <Timer />
            </Box>

            <Stack
              gap={
                isMobileLandscape
                  ? 0
                  : {
                      xs: 0,
                      md: 1,
                    }
              }
              flex={1}
              overflow="hidden"
            >
              {/* 헤더 */}
              <Typography variant="subtitle1">최종 점수 :</Typography>

              {/* 최종 점수 */}
              <Score variant="total" score={score} />
            </Stack>
          </Stack>
        </Panel>
      </Container>

      <Stack position="relative" flex={1} marginTop={1.5}>
        {/* 상부 지지대 */}
        <ConveyorSupport />

        {/* 컨베이어 */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flex={1}
          position="relative"
          overflow="hidden"
        >
          {/* 박스 */}
          <Box
            width={
              isMobileLandscape
                ? "50vw"
                : {
                    xs: "100vw",
                    sm: "70vw",
                    md: "50vw",
                  }
            }
            maxWidth="700px"
            height="90%"
            minHeight="200px"
            marginX={3}
          >
            {/* 패키지 */}
            <Package />
          </Box>

          {/* 우측 패널 */}
          <Box
            display={
              isMobileLandscape
                ? "inline-flex"
                : {
                    xs: "none",
                    md: "inline-flex",
                  }
            }
            position="absolute"
            width="20vw"
            height="100%"
            top={0}
            right={0}
            zIndex={10000}
          >
            <Stack
              width={{
                xs: "100%",
                lg: "75%",
                xl: "60%",
              }}
              justifyContent="space-evenly"
            >
              {/* 점수 패널 */}
              <Box>
                <ScorePanel />
              </Box>

              {/* 보내기 버튼 */}
              <SendButton />
            </Stack>
          </Box>

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

        {/* 좌측 패널 */}
        <Box
          display={
            isMobileLandscape
              ? "block"
              : {
                  xs: "none",
                  md: "block",
                }
          }
          position="absolute"
          width="20vw"
          height="100%"
          top={0}
          left={0}
          zIndex={11000}
        >
          <BlockContainer />
        </Box>
      </Stack>

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
        position="relative"
        flex={0.5}
        zIndex={11000}
      >
        <MobileBlockContainer />
      </Box>

      {/* 점수 이펙트 렌더러 */}
      <ScoreEffectsRenderer />
    </Stack>
  );
};

export default Game;
