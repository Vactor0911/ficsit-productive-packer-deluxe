import { Box, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Scoreboard from "../components/Scoreboard";
import Conveyor from "../assets/images/conveyor.svg";

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
      <Box
        width="100%"
        height="300px"
        sx={{
          backgroundImage: `url(${Conveyor})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center left",
          backgroundSize: "contain",
        }}
      />
    </Stack>
  );
};

export default Game;
