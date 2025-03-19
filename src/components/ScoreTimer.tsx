import { keyframes, Stack, Typography } from "@mui/material";
import { useCallback } from "react";

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

interface ScoreTimerProps {
  time: number;
  maxTime: number;
  isTimeAlert?: boolean;
}

const StackStyle = {
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
};

const ScoreTimer = (props: ScoreTimerProps) => {
  const { time, maxTime, isTimeAlert = false } = props;

  const getDegree = useCallback(() => {
    return Math.min((time / maxTime) * 360, 360);
  }, [maxTime, time]);

  return (
    <Stack
      width="140px"
      height="140px"
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
          width="calc(100% - 40px)"
          height="calc(100% - 40px)"
          {...StackStyle}
          sx={{
            background: "white",
          }}
        >
          <Stack
            width="calc(100% - 7px)"
            height="calc(100% - 7px)"
            {...StackStyle}
            gap={1}
            sx={{
              background: "#666666",
              animation: isTimeAlert
                ? `${TimeAlertAnimation} 1.1s linear infinite`
                : "none",
            }}
          >
            <Typography variant="h5" color="white">
              시간 :
            </Typography>
            <Typography variant="h3" color="white">
              00.0초
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ScoreTimer;
