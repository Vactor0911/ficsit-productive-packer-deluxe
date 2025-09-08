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
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { playEffect } from "../utils";
import ButtonHoverAudio from "../assets/audio/button_hover.mp3";
import GameStartAudio from "../assets/audio/game_start.mp3";
import { useGame } from "../hooks";

// 게임 레벨 데이터
const levels = [
  {
    level: 1,
    stars: 0,
    maxScore: "",
    image: Level1,
  },
  {
    level: 2,
    stars: 0,
    maxScore: "",
    image: Level2,
  },
  {
    level: 3,
    stars: 0,
    maxScore: "",
    image: Level3,
  },
  {
    level: 4,
    stars: 0,
    maxScore: "",
    image: Level4,
  },
  {
    level: 5,
    stars: 0,
    maxScore: "",
    image: Level5,
  },
  {
    level: 6,
    stars: 0,
    maxScore: "",
    image: Level6,
  },
];

const Levels = () => {
  const navigate = useNavigate();

  const { resetGame } = useGame();

  const SCORE = 1234567890; // 예시 점수

  // 호버 애니메이션
  const hoverAnimation = useMemo(
    () =>
      keyframes({
        "0%": {
          transform: "translateX(-100%)",
        },
        "100%": {
          transform: "translateX(100%)",
        },
      }),
    []
  );

  // 게임 데이터 초기화
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  // 레벨 버튼 호버
  const handleHover = useCallback(() => {
    playEffect(ButtonHoverAudio);
  }, []);

  // 레벨 버튼 클릭
  const handleClick = useCallback(
    (level: number) => {
      playEffect(GameStartAudio);
      navigate(`/game/${level}`);
    },
    [navigate]
  );

  // 메인 화면으로 버튼 클릭
  const handleMainButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Container maxWidth="md">
      <Stack gap={2} paddingY={4}>
        {levels.map((level) => (
          <ButtonBase
            key={`level-button-${level.level}`}
            disableRipple
            onMouseEnter={handleHover}
            onClick={() => handleClick(level.level)}
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
                    animation: `${hoverAnimation} 0.6s linear`,
                  },
                },
              }}
            >
              {/* 레벨 이미지 */}
              <Box
                component="img"
                alt={`Level ${level.level}`}
                src={level.image}
                height="100px"
              />

              {/* 레벨 정보 */}
              <Stack flex={1} textAlign="left" overflow="hidden">
                {/* 레벨 */}
                <Typography variant="h5">레벨 {level.level}</Typography>

                {/* 별 */}
                <Stack direction="row" alignItems="center">
                  <StarTwoToneIcon fontSize="large" />
                  <StarTwoToneIcon fontSize="large" />
                  <StarTwoToneIcon fontSize="large" />
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
                  홍길동: {SCORE.toLocaleString()}
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
