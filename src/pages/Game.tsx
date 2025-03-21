import { Box, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import Scoreboard from "../components/Scoreboard";
import Conveyor from "../components/Conveyor";
import BlockContainer from "../components/BlockContainer";
import MobileBlockContainer from "../components/MobileBlockContainer";

const Game = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <Stack gap={1} height="100vh" position="relative" overflow="hidden">
      {/* 점수판 */}
      <Stack
        width="90%"
        maxWidth="650px"
        marginTop={2}
        alignSelf="center"
        position="relative"
        zIndex={5}
      >
        <Scoreboard />
      </Stack>

      <Box
        height={{
          md: "70vh",
          xs: "50vh",
        }}
        position="relative"
      >
        {/* 컨베이어 벨트트 */}
        <Conveyor height="100%" />

        {/* PC, 태블릿용 블록 컨테이너 */}
        <BlockContainer />
      </Box>

      {/* 모바일용 블록 컨테이너 */}
      <MobileBlockContainer />
    </Stack>
  );
};

export default Game;
