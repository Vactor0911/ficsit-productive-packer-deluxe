import { Box, keyframes, Stack } from "@mui/material";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import Logo from "/Logo.png";

const LogoAnimation = keyframes`
  0% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(4deg);
  }
  100% {
    transform: rotate(-4deg);
  }
`;

const Main = () => {
  const navigate = useNavigate();

  const handlePlayButtonClick = useCallback(() => {
    navigate("/levels");
  }, [navigate]);

  const handleHowToPlayButtonClick = useCallback(() => {
    navigate("/how-to-play");
  }, [navigate]);

  return (
    <Stack alignItems="center" justifyContent="center" height="100vh" gap={2}>
      <Box
        component="img"
        alt="Logo"
        src={Logo}
        width={{
          xs: "300px",
          sm: "500px",
          md: "600px",
        }}
        sx={{ animation: `${LogoAnimation} 4s ease-in-out infinite` }}
        marginBottom="20px"
      />
      <Button text="게임 시작" onClick={handlePlayButtonClick} />
      <Button text="플레이 방법" onClick={handleHowToPlayButtonClick} />
    </Stack>
  );
};

export default Main;
