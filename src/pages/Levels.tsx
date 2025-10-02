import {
  Box,
  ButtonBase,
  Container,
  keyframes,
  Stack,
  Typography,
} from "@mui/material";
import {
  Level1,
  Level2,
  Level3,
  Level4,
  Level5,
  Level6,
} from "../assets/images/levels";
import Button from "../components/Button";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { playEffect } from "../utils/audio";
import ButtonHoverAudio from "../assets/audio/button_hover.mp3";
import GameStartAudio from "../assets/audio/game_start.mp3";
import { useGame } from "../hooks";
import { useSetAtom } from "jotai";
import {
  isTimeOverAtom,
  LeaderBoard,
  timerAtom,
  type LeaderBoardData,
} from "../states";

// 게임 레벨 데이터
const LEVEL_IMAGES = [Level1, Level2, Level3, Level4, Level5, Level6];

const HoverAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const Levels = () => {
  const navigate = useNavigate();
  const { resetGame } = useGame();

  const setTimer = useSetAtom(timerAtom);
  const setIsTimerOver = useSetAtom(isTimeOverAtom);
  const [scores, setScores] = useState<LeaderBoardData[]>([]);

  useEffect(() => {
    const storedScores = localStorage.getItem(LeaderBoard);
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  // 레벨 버튼 호버
  const handleHover = useCallback(() => {
    playEffect(ButtonHoverAudio);
  }, []);

  // 레벨 버튼 클릭
  const handleClick = useCallback(
    (level: number) => {
      // 게임 상태 초기화
      resetGame();

      // 타이머 초기화
      setTimer(Date.now());
      setIsTimerOver(false);

      playEffect(GameStartAudio);
      navigate(`/game/${level}`);
    },
    [navigate, resetGame, setIsTimerOver, setTimer]
  );

  // 메인 화면으로 버튼 클릭
  const handleMainButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Container maxWidth="md">
      <Stack gap={2} paddingY={4}>
        {Array.from({ length: 6 }).map((_, levelIndex) => (
          <ButtonBase
            key={`level-button-${levelIndex + 1}`}
            disableRipple
            onMouseEnter={handleHover}
            onClick={() => handleClick(levelIndex + 1)}
            sx={{
              width: "100%",
              boxShadow: `0 8px 0 rgba(0, 0, 0, 0.15)`,
            }}
          >
            <Stack
              width="100%"
              direction="row"
              alignItems="center"
              padding={2}
              paddingY={1}
              gap={2}
              sx={{
                backgroundColor: "white",
                border: "2px solid black",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  backgroundColor: "#b6e5d6",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "200%",
                    height: "100%",
                    zIndex: 2,
                    transform: "translateX(-100%)",
                    background: `linear-gradient(
                      150deg,
                      transparent 40%,
                      rgba(255, 255, 255, 0.25) 40%,
                      rgba(255, 255, 255, 0.25) 60%,
                      transparent 60%
                    )`,
                    animation: `${HoverAnimation} 0.6s linear`,
                  },
                },
              }}
            >
              {/* 레벨 이미지 */}
              <Box
                component="img"
                alt={`Level ${levelIndex + 1}`}
                src={LEVEL_IMAGES[levelIndex]}
                height="100px"
              />

              {/* 레벨 정보 */}
              <Stack flex={1} textAlign="left" overflow="hidden">
                {/* 레벨 */}
                <Typography variant="h5">레벨 {levelIndex + 1}</Typography>

                {/* 별 */}
                <Stack direction="row" alignItems="center">
                  {Array.from({ length: 3 }).map((_, starIndex) => (
                    <StarTwoToneIcon
                      key={`level-star-${starIndex}`}
                      fontSize="large"
                      color={
                        starIndex < scores[levelIndex]?.stars
                          ? "primary"
                          : "inherit"
                      }
                    />
                  ))}
                </Stack>

                {/* 최고 점수 */}
                <Typography variant="subtitle1">최고 점수:</Typography>

                <Typography
                  variant="h6"
                  color="primary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {!scores[levelIndex]?.maxScore ||
                  scores[levelIndex]?.maxScore <= 0
                    ? "없음"
                    : scores[levelIndex]?.maxScore.toLocaleString()}
                </Typography>
              </Stack>
            </Stack>
          </ButtonBase>
        ))}

        {/* 메인 화면으로 버튼 */}
        <Box marginX="auto" marginY={5}>
          <Button onClick={handleMainButtonClick}>
            <Typography variant="h4">메인 화면으로</Typography>
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default Levels;
