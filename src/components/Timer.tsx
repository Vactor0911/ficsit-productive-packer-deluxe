import { Stack, Typography, useTheme } from "@mui/material";

const Timer = () => {
  const theme = useTheme();

  return (
    <Stack
      height="100%"
      justifyContent="center"
      alignItems="center"
      borderRadius="50%"
      border="2px solid black"
      sx={{
        aspectRatio: "1 / 1",
        "& .MuiStack-root": {
          borderRadius: "50%",
        },
      }}
    >
      <Stack
        width="95.5%"
        height="95.5%"
        justifyContent="center"
        alignItems="center"
        bgcolor={theme.palette.primary.main}
      >
        <Stack
          width="75%"
          height="75%"
          justifyContent="center"
          alignItems="center"
          bgcolor="white"
        >
          <Stack
            width="93%"
            height="93%"
            alignItems="center"
            paddingTop={1}
            bgcolor="#666666"
            color="white"
          >
            <Typography variant="subtitle2">시간:</Typography>
            <Typography variant="h5">12.3초</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Timer;
