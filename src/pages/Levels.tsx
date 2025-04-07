import { Box, keyframes, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import Button from "../components/Button";
import { createSearchParams, useNavigate } from "react-router-dom";
import { playEffect } from "../utils";
import ButtonHoverAudio from "../assets/audio/button_hover.mp3";
import GameStartAudio from "../assets/audio/game_start.mp3";
import {
  Level1,
  Level2,
  Level3,
  Level4,
  Level5,
  Level6,
} from "../assets/images/levels";

const HoverAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const Levels = () => {
  // 레벨 데이터
  const [levels, setLevels] = useState([
    {
      level: 1,
      image: Level1,
      stars: 0,
      score: 0,
    },
    {
      level: 2,
      image: Level2,
      stars: 0,
      score: 0,
    },
    {
      level: 3,
      image: Level3,
      stars: 0,
      score: 0,
    },
    {
      level: 4,
      image: Level4,
      stars: 0,
      score: 0,
    },
    {
      level: 5,
      image: Level5,
      stars: 0,
      score: 0,
    },
    {
      level: 6,
      image: Level6,
      stars: 0,
      score: 0,
    },
  ]);

  // 레벨 선택 버튼 호버 핸들러
  const handleLevelButtonHover = useCallback(() => {
    playEffect(ButtonHoverAudio);
  }, []);

  // 레벨 선택 버튼 클릭 핸들러
  const navigate = useNavigate();
  const handleLevelButtonClick = useCallback(
    (level: number) => {
      playEffect(GameStartAudio);
      navigate({
        pathname: "/game",
        search: `?${createSearchParams({
          level: `${level}`,
        })}`,
      });
    },
    [navigate]
  );

  // 메인 버튼 클릭 핸들러
  const handleMainButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Stack padding="40px 0" alignItems="center" gap={2}>
      {levels.map((level) => (
        <Stack
          key={level.level}
          direction="row"
          gap={2}
          padding={1}
          border="2px solid black"
          width={{
            xs: "80%",
            sm: "50%",
            md: "35%",
          }}
          minWidth={{
            sm: "450px",
          }}
          maxWidth="750px"
          boxShadow="0 10px 0 rgba(0, 0, 0, 0.15)"
          sx={{
            backgroundColor: "white",
            cursor: "pointer",
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
          onMouseEnter={handleLevelButtonHover}
          onClick={() => handleLevelButtonClick(level.level)}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              img: {
                height: {
                  xs: "80px",
                  sm: "100px",
                  md: "120px",
                },
              },
            }}
          >
            <img src={level.image || ""} alt={`Level${level.level}`} />
          </Stack>
          <Stack gap={0.5} justifyContent="center">
            <Typography variant="h2" lineHeight="1.25em">
              레벨 {level.level}
            </Typography>
            <Stack direction="row">
              {/* TODO: 별 SVG 이미지 변경, 반복문 사용 */}
              <StarBorderRoundedIcon fontSize="large" />
              <StarBorderRoundedIcon fontSize="large" />
              <StarBorderRoundedIcon fontSize="large" />
            </Stack>
            <Typography variant="subtitle1">최고 점수:</Typography>
            <Typography variant="h3" color="primary">
              홍길동: 1,234
            </Typography>
          </Stack>
        </Stack>
      ))}
      <Box marginTop={2}>
        <Button text="메인 화면으로" onClick={handleMainButtonClick} />
      </Box>
    </Stack>
  );
};

export default Levels;
