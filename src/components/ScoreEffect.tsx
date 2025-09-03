import { Box, keyframes, Stack, Typography } from "@mui/material";
import CoinImage from "../assets/images/coin.svg";
import { useIsMobileLandscape } from "../utils";
import { useAtomValue, useSetAtom } from "jotai";
import {
  boardGridSizeAtom,
  boardPositionRefAtom,
  scoreEffectsAtom,
} from "../states";
import { useEffect, useMemo } from "react";

interface BlockScoreEffectProps {
  score: number;
  x: number;
  y: number;
}

const SlideAnimation = keyframes`
  0% {
    transform: translate(-50%, -100%);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -200%);
    opacity: 0;
  }
`;

const ScoreEffect = (props: BlockScoreEffectProps) => {
  const { score, x, y } = props;

  const isMobileLandscape = useIsMobileLandscape();
  const setScoreEffects = useSetAtom(scoreEffectsAtom);
  const boardPositionRef = useAtomValue(boardPositionRefAtom);
  const boardGridSize = useAtomValue(boardGridSizeAtom);

  // 생성 1초 뒤 삭제
  useEffect(() => {
    const timer = setTimeout(() => {
      setScoreEffects((prev) =>
        prev.filter((effect) => effect.x !== props.x && effect.y !== props.y)
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [setScoreEffects, props.x, props.y]);

  // 보드 기준점 객체
  const boardRect = useMemo(() => {
    return boardPositionRef?.getBoundingClientRect();
  }, [boardPositionRef]);

  // 보드 기준점이 없다면 렌더링 중단
  if (!boardRect) {
    return null;
  }

  return (
    <Stack
      width={
        isMobileLandscape
          ? "16px"
          : {
              xs: "24px",
              sm: "32px",
            }
      }
      height={
        isMobileLandscape
          ? "16px"
          : {
              xs: "24px",
              sm: "32px",
            }
      }
      justifyContent="center"
      alignItems="center"
      position="fixed"
      top={(boardRect?.y || 0) + y * boardGridSize}
      left={(boardRect?.x || 0) + x * boardGridSize}
      zIndex={1400}
      sx={{
        transform: "translate(-50%, -100%)",
        opacity: 0,
        animation: `${SlideAnimation} 0.75s ease-out`,
      }}
    >
      {/* 코인 이미지 */}
      <Box
        component="img"
        src={CoinImage}
        width="100%"
        height="100%"
        position="absolute"
        top={0}
        left={0}
      />

      {/* 점수 텍스트 */}
      <Typography
        variant="body2"
        textAlign="center"
        color="white"
        fontWeight="bold"
        fontSize={isMobileLandscape ? "0.5rem" : "inherit"}
        position="relative"
        zIndex={1}
        sx={{
          transform: "translateY(-7%)",
        }}
      >
        {score}
      </Typography>
    </Stack>
  );
};

export default ScoreEffect;
