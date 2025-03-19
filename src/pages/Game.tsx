import { Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Scoreboard from "../components/Scoreboard";
import Conveyor from "../components/Conveyor";

const Game = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <Stack gap={1} height="100vh">
      <Stack width="600px" marginTop={2} alignSelf="center">
        <Scoreboard />
      </Stack>
      <Conveyor height="70%" />
    </Stack>
  );
};

export default Game;
