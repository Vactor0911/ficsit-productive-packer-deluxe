import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useAtom } from "jotai";
import { MAX_TIME, timerAtom } from "../states";
import { useEffect, useMemo } from "react";

const Timer = () => {
  const theme = useTheme();

  const [timer, setTimer] = useAtom(timerAtom);

  // 타이머
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 100);

    return () => clearInterval(interval);
  }, [setTimer]);

  // 시간 종료
  useEffect(() => {
    if (timer <= 0) {
      console.log("시간 종료!");
    }
  }, [timer]);

  // 제한 시간 진행률
  const progress = useMemo(() => {
    return Math.max(0, Math.min(1, timer / MAX_TIME));
  }, [timer]);

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
              {(timer / 10).toFixed(1)}초
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
