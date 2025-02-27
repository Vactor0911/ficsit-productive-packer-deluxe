import { Box, keyframes, Stack } from "@mui/material";
import Button from "../components/Button";

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
  return (
    <Stack alignItems="center" justifyContent="center" height="100vh" gap={3}>
      <Box
        component="img"
        alt="Logo"
        src="./Logo.png"
        width="600px"
        sx={{ animation: `${LogoAnimation} 4s ease-in-out infinite` }}
      />
      <Button text="게임 시작" />
      <Button text="플레이 방법" />
    </Stack>
  );
};

export default Main;
