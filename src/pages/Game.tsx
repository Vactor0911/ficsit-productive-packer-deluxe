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
    <Stack gap={1} height="100vh" position="relative">
      <Stack width="90%" maxWidth="650px" marginTop={2} alignSelf="center">
        <Scoreboard />
      </Stack>
      <Box
        height={{
          md: "70vh",
          xs: "50vh",
        }}
        position="relative"
      >
        <Conveyor height="100%" minHeight="300px" />
        <BlockContainer />
      </Box>
      <MobileBlockContainer />
    </Stack>
  );
};

export default Game;
