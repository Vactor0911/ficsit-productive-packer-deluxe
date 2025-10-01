import { Box, Stack, Typography, useTheme } from "@mui/material";
import { isTimeOverAtom, MAX_TIME } from "../states";
import { useEffect, useMemo, useState } from "react";
import { useGame } from "../hooks";
import { useSetAtom } from "jotai";

const Timer = () => {
  const theme = useTheme();
  const { getTimerLeft } = useGame();
  const [progress, setProgress] = useState(0);
  const setIsTimeOver = useSetAtom(isTimeOverAtom);

  useEffect(() => {
    // 0.1초마다 진행률 업데이트
    const id = setInterval(() => {
      const newProgress = Math.max(0, Math.min(1, getTimerLeft() / MAX_TIME));
      setProgress(newProgress);

      // 시간이 다 되면 인터벌 종료
      if (newProgress <= 0) {
        setIsTimeOver(true);
        clearInterval(id);
      }
    }, 100);

    // 클리너
    return () => {
      clearInterval(id);
    };
  }, [getTimerLeft, setIsTimeOver]);

  // conic-gradient 각도
  const angle = useMemo(() => {
    return progress * 360;
  }, [progress]);

  return (
    <Stack
      minHeight="60px"
      height="100%"
      justifyContent="center"
      alignItems="center"
      borderRadius="50%"
      border="2px solid black"
      sx={{
        aspectRatio: "1 / 1",
        "& .MuiStack-root": {
          borderRadius: "50%",
        },
      }}
    >
      <Stack
        width="95.5%"
        height="95.5%"
        justifyContent="center"
        alignItems="center"
        bgcolor={theme.palette.primary.main}
        sx={{
          background: `conic-gradient(
                from 0deg,
                ${theme.palette.primary.main} 0deg,
                ${theme.palette.primary.main} ${angle}deg,
                transparent ${angle}deg,
                transparent 360deg
              )`,
        }}
      >
        <Stack
          width="70%"
          height="70%"
          justifyContent="center"
          alignItems="center"
          bgcolor="white"
        >
          <Stack
            width="92%"
            height="92%"
            paddingTop="5%"
            justifyContent="space-evenly"
            alignItems="center"
            bgcolor="#666666"
            color="white"
            fontSize={{
              xs: "1em",
              md: "1.25em",
            }}
          >
            {/* 텍스트 */}
            <Typography variant="subtitle2" fontSize="60%" lineHeight="60%">
              시간:
            </Typography>

            {/* 잔여 시간 */}
            <Typography
              variant="subtitle2"
              fontSize="100%"
              lineHeight="100%"
              fontWeight="bold"
            >
              {(getTimerLeft() * 0.001).toFixed(1)}초
            </Typography>

            {/* 여백 */}
            <Box />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Timer;
