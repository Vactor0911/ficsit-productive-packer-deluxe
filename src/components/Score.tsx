import { Box, keyframes, Stack, Typography, useTheme } from "@mui/material";
import CoinImage from "../assets/images/coin.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIsMobileLandscape } from "../utils";

interface ScoreProps {
  variant?: "default" | "total" | "bonus";
  score?: number;
}

// 점수 상승 애니메이션
const scoreScaleAnimation = keyframes`
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
`;

const scoreDeltaAnimation = keyframes`
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    25%, 85% {
        transform: translateY(-1em);
        opacity: 1;
    }
    100% {
        transform: translateY(-0.9em);
        opacity: 0;
    }
`;

const coinAnimation = keyframes`
    0%, 25% {
        opacity: 0.9;
    }
    100% {
        opacity: 0;
    }
`;

const Score = (props: ScoreProps) => {
  const { variant = "default", score = 0 } = props;

  const theme = useTheme();
  const isMobileLandscape = useIsMobileLandscape();

  const CoinImageRef = useRef<HTMLImageElement>(null);
  const scoreTextRef = useRef<HTMLSpanElement>(null);
  const scoreDeltaRef = useRef<HTMLSpanElement>(null);

  // 코인 이미지 높이
  const [coinImageHeight, setCoinImageHeight] = useState(16);

  // 점수
  const [localScore, setLocalScore] = useState(score);
  const localScoreRef = useRef(localScore);
  const [scoreDelta, setScoreDelta] = useState(0);

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

  // 점수 텍스트 크기
  const getScoreTextSize = useCallback(() => {
    switch (variant) {
      case "total":
        return isMobileLandscape ? "2em !important" : "1.5rem";
      default:
        return isMobileLandscape ? "1.25em !important" : "inherit";
    }
  }, [isMobileLandscape, variant]);

  // 애니메이션 실행
  const executeAnimation = useCallback(() => {
    // 코인 이미지 애니메이션
    if (variant !== "bonus") {
      const coinImageElement = CoinImageRef.current;

      if (coinImageElement) {
        coinImageElement.classList.remove("animate-coin");
        requestAnimationFrame(() => {
          coinImageElement.classList.add("animate-coin");
        });
      }
    }

    // 점수 텍스트 애니메이션
    if (variant !== "total") {
      const scoreTextElement = scoreTextRef.current;
      const scoreDeltaElement = scoreDeltaRef.current;

      // 점수 텍스트 애니메이션
      if (scoreTextElement) {
        scoreTextElement.classList.remove("animate-score");
        requestAnimationFrame(() => {
          scoreTextElement.classList.add("animate-score");
        });
      }

      // 점수 델타 애니메이션
      if (scoreDeltaElement) {
        scoreDeltaElement.classList.remove("animate-score-delta");
        requestAnimationFrame(() => {
          scoreDeltaElement.classList.add("animate-score-delta");
        });
      }
    }
  }, [variant]);

  // 점수 변경 감지
  useEffect(() => {
    // 점수 업데이트
    if (score !== localScoreRef.current) {
      // 점수 차이 계산
      const delta = score - localScoreRef.current;
      setScoreDelta(delta);

      // 점수 최신화
      if (variant === "total") {
        const startTime = performance.now();
        const duration = 500; // 0.5초
        const start = localScoreRef.current;
        const end = score;

        const frame = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1); // [0, 1] 범위
          const currentValue = Math.floor(start + (end - start) * progress);
          setLocalScore(currentValue);

          if (progress < 1) {
            requestAnimationFrame(frame);
          }
        };

        requestAnimationFrame(frame);
      } else {
        setLocalScore(score);
        localScoreRef.current = score;
      }

      // 애니메이션 실행
      executeAnimation();
    }
  }, [executeAnimation, score, variant]);

  // 점수 포매팅
  const getFormattedScore = useCallback(
    (score: number) => {
      if (variant === "bonus") {
        return Number((score * 0.001).toString().slice(0, 5));
      }
      return score;
    },
    [variant]
  );

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={isMobileLandscape ? 0.5 : 1}
    >
      {/* 코인 이미지 */}
      {variant !== "bonus" && (
        <Stack justifyContent="center" position="relative">
          {Array.from({ length: 2 }).map((_, index) => (
            <Box
              key={index}
              ref={CoinImageRef}
              component="img"
              src={CoinImage}
              height={`calc(${coinImageHeight}px - 0.5em)`}
              position={index === 0 ? "relative" : "absolute"}
              top={0}
              left={0}
              zIndex={index === 0 ? 0 : 2}
              sx={{
                filter: index === 1 ? "brightness(0) invert(1)" : "none",
                opacity: index === 1 ? 0 : 1,
                "&.animate-coin": {
                  animation: `${coinAnimation} 0.5s ease-out forwards`,
                  animationDuration: variant === "total" ? "0.4s" : "0.5s",
                  animationIterationCount: variant === "total" ? 2 : 1,
                },
              }}
            />
          ))}
        </Stack>
      )}

      {/* 점수 */}
      <Typography
        ref={scoreTextRef}
        variant={variant === "total" ? "h2" : "h3"}
        color={getScoreTextColor()}
        position="relative"
        fontSize={getScoreTextSize()}
        sx={{
          WebkitTextStroke: variant === "total" ? "none" : "0.1em black",
          paintOrder: variant === "total" ? "none" : "stroke fill",
          letterSpacing: "0.05em",
          "&.animate-score": {
            animation: `${scoreScaleAnimation} 0.25s ease-out forwards`,
          },
        }}
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
        {getFormattedScore(localScore)}

        {/* 점수 상승 애니메이션 */}
        <span
          ref={scoreDeltaRef}
          css={{
            fontSize: "0.5em",
            WebkitTextStroke: variant === "total" ? "none" : "0.1em black",
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
          {scoreDelta > 0 && "+"}
          {getFormattedScore(scoreDelta)}
        </span>
      </Typography>
    </Stack>
  );
};

export default Score;
