import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';

const Levels = () => {
  // 레벨 데이터
  const [levels, setLevels] = useState([
    {
      level: 1,
      image: null,
      stars: 0,
      score: 0,
    },
    {
      level: 2,
      image: null,
      stars: 0,
      score: 0,
    },
    {
      level: 3,
      image: null,
      stars: 0,
      score: 0,
    },
    {
      level: 4,
      image: null,
      stars: 0,
      score: 0,
    },
    {
      level: 5,
      image: null,
      stars: 0,
      score: 0,
    },
    {
      level: 6,
      image: null,
      stars: 0,
      score: 0,
    },
  ]);

  return (
    <Stack height="100vh" justifyContent="center" alignItems="center" gap={2}>
      {levels.map((level) => (
        <Stack
          key={level.level}
          direction="row"
          gap={2}
          padding={2}
          border="2px solid black"
          width="50%"
          boxShadow="0 10px 0 rgba(0, 0, 0, 0.15)"
          sx={{
            backgroundColor: "white",
          }}
        >
          <Stack gap={1}>
            <Typography variant="h1" lineHeight="1.7em">레벨 {level.level}</Typography>
            <Stack direction="row">
              {/* TODO: 별 SVG 이미지 변경, 반복문 사용 */}
              <StarBorderRoundedIcon fontSize="large" />
              <StarBorderRoundedIcon fontSize="large" />
              <StarBorderRoundedIcon fontSize="large" />
            </Stack>
            <Typography variant="h3">최고 점수: {level.score}</Typography>
            <Typography variant="h2">최고 점수: {level.score}</Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default Levels;
