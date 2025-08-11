import { Box, Stack, Typography, useTheme } from "@mui/material";

const Timer = () => {
  const theme = useTheme();

  return (
    <Stack
      minHeight="60px"
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
          width="70%"
          height="70%"
          justifyContent="center"
          alignItems="center"
          bgcolor="white"
        >
          <Stack
            width="92%"
            height="92%"
            paddingTop="5%"
            justifyContent="space-evenly"
            alignItems="center"
            bgcolor="#666666"
            color="white"
            fontSize={{
              xs: "1em",
              md: "1.25em",
            }}
          >
            {/* 텍스트 */}
            <Typography variant="subtitle2" fontSize="60%" lineHeight="60%">
              시간:
            </Typography>

            {/* 잔여 시간 */}
            <Typography
              variant="subtitle2"
              fontSize="100%"
              lineHeight="100%"
              fontWeight="bold"
            >
              12.3초
            </Typography>

            {/* 여백 */}
            <Box />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Timer;
