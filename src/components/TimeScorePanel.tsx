import { Box, Container, Stack, Typography } from "@mui/material";
import Panel from "./Panel";
import Timer from "./Timer";
import Score from "./Score";
import { useIsMobileLandscape } from "../utils";
import { useAtomValue } from "jotai";
import { scoreAtom } from "../states";
import { useRef } from "react";

const TimeScorePanel = () => {
  const isMobileLandscape = useIsMobileLandscape();
  const score = useAtomValue(scoreAtom);
  const scoreContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Container
      maxWidth={isMobileLandscape ? "xs" : "md"}
      sx={{
        maxWidth: isMobileLandscape ? "auto" : "700px !important",
        height: isMobileLandscape ? "80px" : "auto",
        position: "relative",
        zIndex: 100,
      }}
    >
      <Panel backgroundColor="#fffff7">
        <Stack
          direction="row"
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
            height={
              isMobileLandscape
                ? undefined
                : {
                    sm: scoreContainerRef.current?.clientHeight,
                  }
            }
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
            ref={scoreContainerRef}
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
  );
};

export default TimeScorePanel;
