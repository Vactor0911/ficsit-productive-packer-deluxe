import { Box, Stack } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";
import { getRandBlockId, playEffect, useIsMobileLandscape } from "../utils";
import ConveyorSupport from "../components/ConveyorSupport";
import Package, {
  COVER_ANIMATION_DURATION,
  SEND_ANIMATION_DURATION,
  SendAnimation,
  SendAnimationMobile,
} from "../components/Package";
import BlockContainer from "../components/BlockContainer";
import MobileBlockContainer from "../components/MobileBlockContainer";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  blockIdQueueAtom,
  boardGridSizeAtom,
  fillingBonusAtom,
  isPackageSendingAtom,
  MAX_TIME,
  packageScoreAtom,
  scoreAtom,
  timerAtom,
  vhAtom,
} from "../states";
import ScorePanel from "../components/ScorePanel";
import SendButton from "../components/SendButton";
import { Navigate, useLocation } from "react-router-dom";
import { useBoard } from "../hooks";
import ScoreEffectsRenderer from "../components/ScoreEffectsRenderer";
import SendPackageAudio from "../assets/audio/send_package.mp3";
import TimeScorePanel from "../components/TimeScorePanel";
import DraggableBlockGhost from "../components/DraggableBlockGhost";

const Game = () => {
  const isMobileLandscape = useIsMobileLandscape();
  const location = useLocation();
  const { resetBoard, isBoardEmpty } = useBoard();
  const setBlockIdQueue = useSetAtom(blockIdQueueAtom);

  const score = useAtomValue(scoreAtom);
  const vh = useAtomValue(vhAtom);
  const setScore = useSetAtom(scoreAtom);
  const [packageScore, setPackageScore] = useAtom(packageScoreAtom);
  const [fillingBonus, setFillingBonus] = useAtom(fillingBonusAtom);
  const [isPackageSending, setIsPackageSending] = useAtom(isPackageSendingAtom);
  const [timer, setTimer] = useAtom(timerAtom);
  const boardGridSize = useAtomValue(boardGridSizeAtom);

  // URL에서 레벨 추출
  const level = useMemo(
    () => location.pathname.split("/").pop(),
    [location.pathname]
  );

  // 게임 데이터 초기화
  useEffect(() => {
    if (level) {
      // 보드 초기화
      resetBoard(Number(level));

      // 포장 점수 초기화
      setPackageScore(0);

      // 채우기 보너스 초기화
      setFillingBonus(1000);

      // 타이머 초기화
      setTimer(MAX_TIME);

      // 블록 큐 초기화
      const newBlockIdQueue = Array.from({ length: 8 }, () => {
        return getRandBlockId();
      });
      setBlockIdQueue(newBlockIdQueue);
    }
  }, [
    level,
    resetBoard,
    setBlockIdQueue,
    setFillingBonus,
    setPackageScore,
    setTimer,
  ]);

  // 보내기 버튼 클릭
  const handleSendButtonClick = useCallback(() => {
    // 보드가 비어있다면 종료
    if (isBoardEmpty) return;
    // 패키지를 이미 보내고 있다면 종료
    if (isPackageSending) return;
    // 시간이 종료되었다면 종료
    if (timer <= 0) return;

    // 점수 증가
    const totalScore = score + Math.round(packageScore * fillingBonus * 0.001);
    setScore(totalScore);

    // 패키지 보내기 효과 재생
    setIsPackageSending(true);
    setTimeout(() => {
      // 보드 초기화
      resetBoard(Number(level));

      setTimeout(() => {
        // 패키지 보내기 효과 초기화
        setIsPackageSending(false);
      }, 1000);
    }, 500);

    // 포장 점수 초기화
    setPackageScore(0);

    // 채우기 보너스 초기화
    setFillingBonus(1000);

    // 효과음 재생
    playEffect(SendPackageAudio);
  }, [
    fillingBonus,
    isBoardEmpty,
    isPackageSending,
    level,
    packageScore,
    resetBoard,
    score,
    setFillingBonus,
    setIsPackageSending,
    setPackageScore,
    setScore,
    timer,
  ]);

  // 시간 종료 애니메이션 실행
  useEffect(() => {
    // 시간이 종료되지 않았다면 종료
    if (timer > 0) return;
  }, [timer]);

  // 레벨 유효성 검증
  if (
    !level ||
    isNaN(Number(level)) ||
    Number(level) < 1 ||
    Number(level) > 6
  ) {
    return <Navigate to="/levels" />;
  }

  return (
    <Stack height={`${vh * 100}px`} overflow="hidden">
      {/* 점수 판 */}
      <TimeScorePanel />

      <Stack position="relative" flex={1} marginTop={1.5}>
        {/* 상부 지지대 */}
        <ConveyorSupport />

        {/* 컨베이어 */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flex={1}
          position="relative"
          overflow="hidden"
        >
          {/* 박스 */}
          <Box
            width={
              isMobileLandscape
                ? "50vw"
                : {
                    xs: "100vw",
                    sm: "70vw",
                    md: "50vw",
                  }
            }
            maxWidth="700px"
            height="90%"
            minHeight="200px"
            marginX={3}
          >
            {/* 패키지 */}
            <Package isSending={isPackageSending} />
          </Box>

          {/* 우측 패널 */}
          <Box
            display={
              isMobileLandscape
                ? "inline-flex"
                : {
                    xs: "none",
                    md: "inline-flex",
                  }
            }
            position="absolute"
            width="20vw"
            height="100%"
            top={0}
            right={0}
            zIndex={10000}
          >
            <Stack
              width={{
                xs: "100%",
                lg: "75%",
                xl: "60%",
              }}
              justifyContent="space-evenly"
            >
              {/* 점수 패널 */}
              <Box>
                <ScorePanel />
              </Box>

              {/* 보내기 버튼 */}
              <SendButton
                onClick={handleSendButtonClick}
                disabled={isBoardEmpty || isPackageSending || timer <= 0}
              />
            </Stack>
          </Box>

          {/* 컨베이어 벨트 */}
          <Stack
            direction="row"
            position="absolute"
            width="200vw"
            height="100%"
            top={0}
            left={0}
            zIndex={-1}
            bgcolor="#4d4d4d"
            sx={{
              animation: {
                xs: isPackageSending
                  ? `${SendAnimationMobile} ${SEND_ANIMATION_DURATION}ms ease-in-out forwards`
                  : "none",
                md: isPackageSending
                  ? `${SendAnimation} ${SEND_ANIMATION_DURATION}ms ease-in-out forwards`
                  : "none",
              },
              animationDelay: `${COVER_ANIMATION_DURATION}ms`,
            }}
          >
            {Array.from({ length: 16 }).map((_, index) => (
              <Box
                key={`conveyor-belt-${index}`}
                width="12.5vw"
                height="100%"
                sx={{
                  background: `
                  conic-gradient(from -15deg at calc(100% - 2px), #0000 210deg, #4d4d4d 0),
                  conic-gradient(from -15deg at 100%, #4d4d4d 210deg, #000 0)`,
                  backgroundSize: "12.5vw 100%",
                }}
              />
            ))}
          </Stack>
        </Stack>

        <Box
          marginBottom={{
            xs: 2,
            md: 5,
          }}
          position="relative"
        >
          {/* 하부 지지대 */}
          <ConveyorSupport />

          {/* 모바일용 보내기 버튼 */}
          <Box
            width="50vw"
            maxWidth="200px"
            display={{
              xs: isMobileLandscape ? "none" : "flex",
              md: "none",
            }}
            position="absolute"
            bottom={0}
            right={{
              xs: 0,
              sm: 10,
            }}
            zIndex={12000}
            sx={{
              transform: "translateY(50%)",
            }}
          >
            <SendButton
              onClick={handleSendButtonClick}
              disabled={isBoardEmpty || isPackageSending || timer <= 0}
            />
          </Box>
        </Box>

        {/* 좌측 패널 */}
        <Box
          display={
            isMobileLandscape
              ? "block"
              : {
                  xs: "none",
                  md: "block",
                }
          }
          position="absolute"
          width="20vw"
          height="100%"
          top={0}
          left={0}
          zIndex={11000}
        >
          <BlockContainer />
        </Box>
      </Stack>

      {/* 모바일, 태블릿용 블록 컨테이너 */}
      <Stack
        display={
          isMobileLandscape
            ? "none"
            : {
                xs: "flex",
                md: "none",
              }
        }
        justifyContent="flex-end"
        position="relative"
        zIndex={11000}
      >
        <MobileBlockContainer />
      </Stack>

      {/* 점수 이펙트 렌더러 */}
      <ScoreEffectsRenderer />

      {/* 고스트 블록 */}
      <DraggableBlockGhost ghostSize={boardGridSize * 4} />
    </Stack>
  );
};

export default Game;
