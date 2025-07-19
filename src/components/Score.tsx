import {
  Box,
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

const Score = (props: ScoreProps) => {
  const { variant = "default", score = 0, typographyProps } = props;

  const theme = useTheme();

  // 코인 이미지 높이
  const [coinImageHeight, setCoinImageHeight] = useState(16);
  const scoreTextRef = useRef<HTMLSpanElement>(null);

  // Typography 높이 감지
  useEffect(() => {
    const element = scoreTextRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        setCoinImageHeight(height - 8);
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
    switch (variant) {
      case "default":
        // 기본 점수 변경 로직
        break;
      case "total":
        // 총점 변경 로직
        break;
      case "bonus":
        // 보너스 점수 변경 로직
        break;
    }
  }, [score, variant]);

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {/* 코인 이미지 */}
      {variant !== "bonus" && (
        <Box component="img" src={CoinImage} height={coinImageHeight} />
      )}

      {/* 점수 */}
      <Typography
        ref={scoreTextRef}
        variant="h4"
        color={getScoreTextColor()}
        sx={{
          WebkitTextStroke: variant === "total" ? "none" : "0.1em black",
          paintOrder: variant === "total" ? "none" : "stroke fill",
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
        {score}
      </Typography>
    </Stack>
  );
};

export default Score;
