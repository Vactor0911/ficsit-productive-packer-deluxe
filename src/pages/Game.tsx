import { Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Scoreboard from "../components/Scoreboard";
import Conveyor from "../components/Conveyor";

const Game = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <Stack>
      <Typography variant="h1">Game Page</Typography>
      <Typography variant="subtitle1">
        Level: {searchParams.get("level")}
      </Typography>
      <Scoreboard />
      <Conveyor height="500px" />
    </Stack >
  );
};

export default Game;
