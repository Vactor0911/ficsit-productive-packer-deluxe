import { Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Game = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return (
    <Stack>
      <Typography variant="h1">Game Page</Typography>
      <Typography variant="subtitle1">Level: {searchParams.get("level")}</Typography>
    </Stack>
  );
};

export default Game;
