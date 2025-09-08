import { Box, Stack } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { playEffect, useIsMobileLandscape } from "../utils";
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
  bestFillingBonusAtom,
  bestPackageScoreAtom,
  boardGridSizeAtom,
  fillingBonusAtom,
  isPackageSendingAtom,
  packageScoreAtom,
  scoreAtom,
  sentPackageCountAtom,
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

interface GameViewProps {
  setIsGameOver: (isGameOver: boolean) => void;
}

const GameView = (props: GameViewProps) => {
  const { setIsGameOver } = props;

  const isMobileLandscape = useIsMobileLandscape();
  const location = useLocation();
  const { clearBoard, isBoardEmpty } = useBoard();

  const score = useAtomValue(scoreAtom);
  const vh = useAtomValue(vhAtom);
  const setScore = useSetAtom(scoreAtom);
  const [packageScore, setPackageScore] = useAtom(packageScoreAtom);
  const [fillingBonus, setFillingBonus] = useAtom(fillingBonusAtom);
  const [isPackageSending, setIsPackageSending] = useAtom(isPackageSendingAtom);
  const timer = useAtomValue(timerAtom);
  const boardGridSize = useAtomValue(boardGridSizeAtom);
  const setSentPackageCount = useSetAtom(sentPackageCountAtom);
  const setBestPackageScore = useSetAtom(bestPackageScoreAtom);
  const setBestFillingBonus = useSetAtom(bestFillingBonusAtom);

  // 컨테이너 Ref
  const rootRef = useRef<HTMLDivElement>(null);

  // URL에서 레벨 추출
  const level = useMemo(
    () => location.pathname.split("/").pop(),
    [location.pathname]
  );

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

    // 보낸 패키지 수 증가
    setSentPackageCount((count) => count + 1);

    // 포장 최고 점수 갱신
    setBestPackageScore((score) => Math.max(score, packageScore));

    // 최고 포장 패키지 점수 갱신
    setBestFillingBonus((bonus) => Math.max(bonus, fillingBonus));

    // 패키지 보내기 효과 재생
    setIsPackageSending(true);
    setTimeout(() => {
      // 비활성화 그리드 수 선택
      const disabledGridCount = Math.min(Math.floor(fillingBonus / 1000), 5);

      // 보드 초기화
      clearBoard(Number(level), disabledGridCount);

      setTimeout(() => {
        // 패키지 보내기 효과 초기화
        setIsPackageSending(false);
      }, SEND_ANIMATION_DURATION);
    }, COVER_ANIMATION_DURATION);

    // 포장 점수 초기화
    setPackageScore(0);

    // 채우기 보너스 초기화
    setFillingBonus(1000);

    // 효과음 재생
    playEffect(SendPackageAudio);
  }, [
    isBoardEmpty,
    isPackageSending,
    timer,
    score,
    packageScore,
    fillingBonus,
    setScore,
    setSentPackageCount,
    setBestPackageScore,
    setBestFillingBonus,
    setIsPackageSending,
    setPackageScore,
    setFillingBonus,
    clearBoard,
    level,
  ]);

  // 시간 종료 애니메이션 실행
  useEffect(() => {
    // 시간이 종료되지 않았다면 종료
    if (timer > 0) return;

    // 보드가 비어있지 않다면 실행
    if (!isBoardEmpty && !isPackageSending) {
      // 점수 증가
      const totalScore =
        score + Math.round(packageScore * fillingBonus * 0.001);
      setScore(totalScore);

      // 보낸 패키지 수 증가
      setSentPackageCount((count) => count + 1);

      // 포장 최고 점수 갱신
      setBestPackageScore((score) => Math.max(score, packageScore));

      // 최고 포장 패키지 점수 갱신
      setBestFillingBonus((bonus) => Math.max(bonus, fillingBonus));
    }

    // 패키지 보내기 효과 재생
    setIsPackageSending(true);

    setTimeout(() => {
      // 애니메이션 재생
      rootRef.current?.classList.remove("game-over");

      requestAnimationFrame(() => {
        rootRef.current?.classList.add("game-over");
      });

      // 게임 화면 렌더링 비활성화
      setTimeout(() => {
        setIsGameOver(true);
      }, 1000);
    }, 1000);
  }, [
    fillingBonus,
    isBoardEmpty,
    isPackageSending,
    packageScore,
    score,
    setBestFillingBonus,
    setBestPackageScore,
    setIsGameOver,
    setIsPackageSending,
    setScore,
    setSentPackageCount,
    timer,
  ]);

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
    <Stack
      ref={rootRef}
      height={`${vh * 100}px`}
      overflow="hidden"
      sx={{
        "&.game-over": {
          ".left-panel, .right-panel, .conveyor-support-top, .conveyor-support-bottom, .conveyor-belt, .mobile-block-container, .mobile-send-button":
            {
              transition: "transform 1s ease-in-out, opacity 1s ease-in-out",
            },

          // 각 요소별 애니메이션
          ".left-panel": {
            transform: "translateX(-100vw)",
          },
          ".right-panel": {
            transform: "translateX(100vw)",
          },
          ".conveyor-belt, .conveyor-support-top, .conveyor-support-bottom": {
            opacity: 0,
          },
          ".mobile-block-container": {
            transform: "translateY(100vh)",
          },
          ".mobile-send-button": {
            transform: "translate(100vw, 50%)",
          },
        },
      }}
    >
      {/* 점수 판 */}
      <TimeScorePanel />

      {/* 게임 화면 */}
      <Stack display="flex" position="relative" flex={1} marginTop={1.5}>
        {/* 상부 지지대 */}
        <ConveyorSupport className="conveyor-support-top" />

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
            className="right-panel"
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
            sx={{
              transition: "transform 1s ease-in-out",
              "&.game-over": {
                transform: "translateX(100vw)",
              },
            }}
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
            className="conveyor-belt"
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
              animationDelay: {
                xs: `${COVER_ANIMATION_DURATION}ms`,
                md: `${COVER_ANIMATION_DURATION}ms`,
              },
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
          <ConveyorSupport className="conveyor-support-bottom" />

          {/* 모바일용 보내기 버튼 */}
          <Box
            className="mobile-send-button"
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
          className="left-panel"
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
          sx={{
            transition: "transform 1s ease-in-out",
            "&.game-over": {
              transform: "translateX(-100vw)",
            },
          }}
        >
          <BlockContainer />
        </Box>
      </Stack>

      {/* 모바일, 태블릿용 블록 컨테이너 */}
      <Stack
        className="mobile-block-container"
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

export default GameView;
