import { Box, Stack, Typography } from "@mui/material";

interface BonusTileProps {
  degree?: number;
  multiplier?: number;
}

const BonusTile = (props: BonusTileProps) => {
  const { degree = 0, multiplier = 1 } = props;

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      border="2px solid black"
      sx={{
        aspectRatio: "1 / 1",
        background: "#d78b00",
      }}
    >
      <Box
        width="100%"
        height="100%"
        display="inline-block"
        position="relative"
        borderRadius="50%"
        sx={{
          "&:after": {
            content: '""',
            position: "absolute",
            width: "70%",
            height: "70%",
            top: "50%",
            left: "50%",
            background: "#d78b00",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <Box
          width="inherit"
          height="inherit"
          borderRadius="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            background: `conic-gradient(#ffffff ${degree}deg, #6b4500 ${degree}deg)`,
          }}
        >
          <Typography variant="h1" color="white" position="relative" zIndex="1">
            x{multiplier}
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default BonusTile;
