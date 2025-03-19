import { keyframes, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { theme } from "../utils";
import { useAtomValue } from "jotai";
import { maxTimeAtom, timeLeftAtom } from "../states";

const TimeAlertAnimation = keyframes`
  0% {
    background: #666666;
  }
  50% {
    background: #dd0000;
  }
  100% {
    background: #666666;
  }
`;

const StackStyle = {
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
};

const ScoreTimer = () => {
  const time = useAtomValue(timeLeftAtom);
  const maxTime = useAtomValue(maxTimeAtom);

  /**
   * 남은 시간의 비율을 각도로 변환하는 함수
   */
  const getDegree = useCallback(() => {
    return Math.min((time / maxTime) * 360, 360);
  }, [maxTime, time]);

  /**
   * 시간을 소수점 첫째 자리까지 표시하는 함수
   */
  const getFormattedTime = useCallback(() => {
    if (isNaN(time)) return "00.0";
    return time.toFixed(1).padStart(4, "0");
  }, []);

  return (
    <Stack
      width={{
        md: "140px",
        sm: "120px",
        xs: "100px",
      }}
      height={{
        md: "140px",
        sm: "120px",
        xs: "100px",
      }}
      border="2px solid black"
      {...StackStyle}
    >
      <Stack
        width="calc(100% - 6px)"
        height="calc(100% - 6px)"
        {...StackStyle}
        sx={{
          background: `conic-gradient(#d78b00 ${getDegree()}deg, #ffffff ${getDegree()}deg)`,
        }}
      >
        <Stack
          width={{
            md: "calc(100% - 40px)",
            sm: "calc(100% - 30px)",
            xs: "calc(100% - 20px)",
          }}
          height={{
            md: "calc(100% - 40px)",
            sm: "calc(100% - 30px)",
            xs: "calc(100% - 20px)",
          }}
          {...StackStyle}
          sx={{
            background: "white",
          }}
        >
          <Stack
            width="calc(100% - 6px)"
            height="calc(100% - 6px)"
            {...StackStyle}
            gap={1}
            sx={{
              background: "#666666",
              animation:
                getDegree() <= 75
                  ? `${TimeAlertAnimation} 1.1s linear infinite`
                  : "none",
            }}
          >
            <Typography variant="h5" color="white">
              시간 :
            </Typography>
            <Typography
              variant="h3"
              sx={{
                [theme.breakpoints.down("sm")]: {
                  fontSize: "1em",
                },
              }}
              color="white"
            >
              {getFormattedTime()}초
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ScoreTimer;
