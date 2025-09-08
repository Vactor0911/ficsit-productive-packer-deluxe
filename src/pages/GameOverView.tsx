import { Box, Stack, Typography } from "@mui/material";
import TotalScorePanel from "../components/TotalScorePanel";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const GameOverView = () => {
  const navigate = useNavigate();

  // 메뉴로 돌아가기 버튼 클릭
  const handleMenuButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Stack width="100%" alignItems="center" marginTop={3}>
      {/* 최종 점수 */}
      <TotalScorePanel />

      {/* 메뉴로 돌아가기 버튼 */}
      <Box marginY={7}>
        <Button onClick={handleMenuButtonClick}>
          <Typography variant="h4" color="white">
            메뉴로 돌아가기
          </Typography>
        </Button>
      </Box>
    </Stack>
  );
};

export default GameOverView;
