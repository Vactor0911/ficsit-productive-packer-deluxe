import { Box, Stack, Typography } from "@mui/material";
import TimeScorePanel from "../components/TimeScorePanel";
import TotalScorePanel from "../components/TotalScorePanel";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useAtomValue } from "jotai";
import { vhAtom } from "../states";

const GameOverView = () => {
  const navigate = useNavigate();

  const vh = useAtomValue(vhAtom);

  // 메뉴로 돌아가기 버튼 클릭
  const handleMenuButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Stack
      height={{
        xs: "auto",
        md: `${vh * 100}px`,
      }}
      minHeight={`${vh * 100}px`}
      justifyContent="center"
      alignItems="center"
      gap={4}
      paddingBottom={4}
    >
      {/* 점수 판 */}
      <TimeScorePanel />

      {/* 최종 점수 */}
      <TotalScorePanel />

      {/* 메뉴로 돌아가기 버튼 */}
      <Box>
        <Button onClick={handleMenuButtonClick}>
          <Typography variant={"h4"} color="white">
            메뉴로 돌아가기
          </Typography>
        </Button>
      </Box>
    </Stack>
  );
};

export default GameOverView;
