import { Box, Container, keyframes, Stack, Typography } from "@mui/material";
import Logo from "/Logo.png";
import { useMemo } from "react";
import Button from "../components/Button";

const Main = () => {
  // 로고 애니메이션
  const logoAnimation = useMemo(
    () =>
      keyframes({
        "0%": {
          transform: "rotate(-4deg)",
        },
        "50%": {
          transform: "rotate(4deg)",
        },
        "100%": {
          transform: "rotate(-4deg)",
        },
      }),
    []
  );

  return (
    <Container maxWidth="lg">
      <Stack
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
        gap={3}
      >
        {/* 로고 이미지 */}
        <Box
          component="img"
          alt="Logo"
          src={Logo}
          width={{
            xs: "80vw",
            sm: "60vw",
            md: "40vw",
          }}
          maxWidth="600px"
          marginBottom={3}
          sx={{ animation: `${logoAnimation} 4s ease-in-out infinite` }}
        />

        {/*게임 시작 */}
        <Button>
          <Typography variant="h4" color="white">
            게임 시작
          </Typography>
        </Button>

        {/* 플레이 방법 */}
        <Button>
          <Typography variant="h4" color="white">
            플레이 방법
          </Typography>
        </Button>
      </Stack>
    </Container>
  );
};

export default Main;
