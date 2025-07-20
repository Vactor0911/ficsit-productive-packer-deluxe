import {
  Box,
  keyframes,
  Stack,
  Typography,
  useTheme,
  type TypographyProps,
} from "@mui/material";
import CoinImage from "../assets/images/coin.svg";
import { useCallback, useEffect, useRef, useState } from "react";

interface ScoreProps {
  variant?: "default" | "total" | "bonus";
  typographyProps?: TypographyProps;
  score?: number;
}

// 점수 상승 애니메이션
const scoreScaleAnimation = keyframes`
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
`;

const scoreDeltaAnimation = keyframes`
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    25%, 75% {
        transform: translateY(-1em);
        opacity: 1;
    }
    100% {
        transform: translateY(-1em);
        opacity: 0;
    }
`;

const Score = (props: ScoreProps) => {
  const { variant = "default", score = 0, typographyProps } = props;

  const theme = useTheme();

  // 코인 이미지 높이
  const [coinImageHeight, setCoinImageHeight] = useState(16);
  const scoreTextRef = useRef<HTMLSpanElement>(null);

  // 점수
  const [localScore, setLocalScore] = useState(score);
  const [scoreDelta, setScoreDelta] = useState(0);
  const scoreDeltaRef = useRef<HTMLSpanElement>(null);

  // Typography 높이 감지
  useEffect(() => {
    const element = scoreTextRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        setCoinImageHeight(height);
      }
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // 점수 텍스트 색상
  const getScoreTextColor = useCallback(() => {
    switch (variant) {
      case "total":
        return "black";
      case "bonus":
        return theme.palette.primary.main;
      default:
        return "white";
    }
  }, [theme.palette.primary.main, variant]);

  // 점수 변경 감지
  useEffect(() => {
    // 점수 업데이트
    if (score !== localScore) {
      // 점수 차이 계산
      const delta = score - localScore;
      setScoreDelta(delta);

      // 점수 최신화
      setLocalScore(score);

      // 애니메이션 실행
      if (variant === "total") {
        return;
      }

      const scoreTextElement = scoreTextRef.current;
      const scoreDeltaElement = scoreDeltaRef.current;

      // 점수 텍스트 애니메이션
      if (scoreTextElement) {
        scoreTextElement.classList.remove("animate-score");
        requestAnimationFrame(() => {
          if (scoreTextElement) {
            scoreTextElement.classList.add("animate-score");
          }
        });
      }

      // 점수 델타 애니메이션
      if (scoreDeltaElement) {
        scoreDeltaElement.classList.remove("animate-score-delta");
        requestAnimationFrame(() => {
          if (scoreDeltaElement) {
            scoreDeltaElement.classList.add("animate-score-delta");
          }
        });
      }
    }
  }, [localScore, score, variant]);

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {/* 코인 이미지 */}
      {variant !== "bonus" && (
        <Box
          component="img"
          src={CoinImage}
          height={`calc(${coinImageHeight}px - 0.5em)`}
          marginTop="0.25em"
        />
      )}

      {/* 점수 */}
      <Typography
        ref={scoreTextRef}
        variant="h4"
        color={getScoreTextColor()}
        position="relative"
        sx={{
          WebkitTextStroke: variant === "total" ? "none" : "0.1em black",
          paintOrder: variant === "total" ? "none" : "stroke fill",
          letterSpacing: "0.05em",
          "&.animate-score": {
            animation: `${scoreScaleAnimation} 0.25s ease-out forwards`,
          },
        }}
        {...typographyProps}
      >
        {/* 보너스 점수 표기 */}
        {variant === "bonus" && (
          <span
            css={{
              marginRight: "4px",
            }}
          >
            x
          </span>
        )}

        {/* 점수 표기 */}
        {localScore}

        {/* 점수 상승 애니메이션 */}
        <span
          ref={scoreDeltaRef}
          css={{
            fontSize: "0.5em",
            position: "absolute",
            top: 0,
            left: "0",
            width: "100%",
            textAlign: "center",
            animation: `none`,
            opacity: 0,
            zIndex: 2,
            "&.animate-score-delta": {
              animation: `${scoreDeltaAnimation} 1s ease-out forwards`,
            },
          }}
        >
          {`+ ${scoreDelta}`}
        </span>
      </Typography>
    </Stack>
  );
};

export default Score;
