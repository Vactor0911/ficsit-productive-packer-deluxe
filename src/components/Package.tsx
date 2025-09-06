import { Box, keyframes, Stack, Typography } from "@mui/material";
import Board from "./Board";
import FicsitLogo from "../assets/images/ficsit.svg";
import { useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { packageRefAtom, timerAtom } from "../states";
import CoveredPackage from "./CoveredPackage";

// 덮개 애니메이션
const CoverAnimation = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

// 흔들림 애니메이션
const ShakeAnimation = keyframes`
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(2px, -2px);
  }
  50% {
    transform: translate(2px, 2px);
  }
  75% {
    transform: translate(-2px, -2px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

// 보내기 애니메이션
export const SendAnimation = keyframes`
  0% { transform: translateX(-75vw); }
  100% { transform: translateX(0); }
`;

// 보내기 애니메이션 (모바일)
export const SendAnimationMobile = keyframes`
  0% { transform: translateX(-100vw); }
  100% { transform: translateX(0); }
`;

// 보내기 애니메이션 (게임 종료)
export const SendAnimationGameEnd = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(75vw); }
`;

// 보내기 애니메이션 (게임 종료, 모바일)
export const SendAnimationGameEndMobile = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(100vw); }
`;

export const COVER_ANIMATION_DURATION = 300;
export const SEND_ANIMATION_DURATION = 700;

interface PackageProps {
  isSending?: boolean;
}

const Package = (props: PackageProps) => {
  const { isSending } = props;

  const packageRef = useRef<HTMLDivElement>(null);
  const setPackageRef = useSetAtom(packageRefAtom);
  const timer = useAtomValue(timerAtom);

  // 패키지 객체
  useEffect(() => {
    setPackageRef(packageRef.current);
  }, [setPackageRef]);

  // 패키지 전송 애니메이션 실행
  useEffect(() => {
    if (packageRef.current && isSending) {
      packageRef.current.classList.remove("send");
      requestAnimationFrame(() => {
        if (packageRef.current) {
          packageRef.current.classList.add("send");
        }
      });
    }
  }, [isSending]);

  return (
    <Stack
      ref={packageRef}
      width="100%"
      height="100%"
      bgcolor="#e5b065"
      border="2px solid black"
      boxShadow="0 24px 0 rgba(0, 0, 0, 0.2)"
      position="relative"
      sx={{
        "&.shake": {
          animation: `${ShakeAnimation} 0.2s ease-in-out`,
        },
        "&.send": {
          animation:
            timer <= 0
              ? `${SendAnimationGameEnd} ${SEND_ANIMATION_DURATION}ms ease-in-out forwards`
              : `${SendAnimation} ${SEND_ANIMATION_DURATION}ms ease-in-out forwards`,
          animationDelay: `${COVER_ANIMATION_DURATION}ms`,
        },
      }}
    >
      {/* 패키지 내벽 */}
      <Stack flex={1} margin={0.5} border="2px solid black">
        <Box
          height="20px"
          bgcolor="#8d5b1d"
          borderBottom="2px solid black"
          boxShadow="0 20px 0 rgba(0, 0, 0, 0.2)"
        />

        <Stack
          flex={1}
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          {/* 패키지 하부 장식 */}
          <Box width="100%" height="2px" bgcolor="#8d5b1d" />

          {/* 보드 */}
          <Stack
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
            position="absolute"
            top={0}
            left={0}
          >
            <Board />
          </Stack>
        </Stack>
      </Stack>

      {/* 패키지 외벽 */}
      <Stack
        height="24px"
        justifyContent="flex-end"
        alignItems="flex-end"
        bgcolor="#8d5b1d"
        borderTop="2px solid black"
      >
        <Box
          width="7%"
          height="50%"
          margin="0.25% 1.5%"
          bgcolor="#d6d1b5"
          border="2px solid black"
          overflow="hidden"
        >
          <Typography
            variant="subtitle2"
            fontFamily="'Libre Barcode 39'"
            textAlign="center"
            lineHeight={1}
            color="#515045"
          >
            Ficsit
          </Typography>
        </Box>
      </Stack>

      {/* 덮개 */}
      <Stack
        className="package cover"
        width="calc(100% + 4px)"
        height="calc(100% - 12px)"
        position="absolute"
        top="-2px"
        left="-2px"
        zIndex={1000}
        sx={{
          opacity: 0,
          animation: isSending
            ? `${CoverAnimation} ${COVER_ANIMATION_DURATION}ms ease-in-out`
            : "none",
        }}
      >
        <Stack
          flex={1}
          justifyContent="center"
          bgcolor="#e5b065"
          border="2px solid black"
          position="relative"
        >
          {/* 덮개 장식 */}
          <Box width="100%" height="2px" bgcolor="#8d5b1d" />

          {/* 덮개 문구 */}
          <Stack
            alignItems="flex-end"
            color="#8d5b1d"
            position="absolute"
            bottom={{
              xs: 10,
              md: 20,
            }}
            right={{
              xs: 10,
              md: 20,
            }}
          >
            <Box component="img" src={FicsitLogo} width="3.5rem" />
            <Typography variant="subtitle1" lineHeight="1rem">
              DELIVERY
            </Typography>
            <Typography variant="subtitle1" lineHeight="1rem">
              SERVICES
            </Typography>
          </Stack>
        </Stack>

        {/* 덮개 외벽 */}
        <Box
          height="8px"
          bgcolor={"#8d5b1d"}
          border="2px solid black"
          borderTop="none"
        />
      </Stack>

      {/* 커버 씌워진 패키지 */}
      <CoveredPackage />
    </Stack>
  );
};

export default Package;
