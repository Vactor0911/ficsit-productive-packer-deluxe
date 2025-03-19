import { Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import Scoreboard from "../components/Scoreboard";
import Conveyor from "../components/Conveyor";

const Game = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <Stack gap={1} height="100vh">
      <Stack width="90%" maxWidth="650px" marginTop={2} alignSelf="center">
        <Scoreboard />
      </Stack>
      <Conveyor height="70%" minHeight="300px" />
    </Stack>
  );
};

export default Game;
