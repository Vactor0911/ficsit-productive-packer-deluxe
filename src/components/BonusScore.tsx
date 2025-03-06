import { Box, Typography } from "@mui/material";

interface BonusScoreProps {
  score: number;
}

const BonusScore = (props: BonusScoreProps) => {
  const { score } = props;

  return (
    <Box
      padding="0 64px"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        borderRadius: "50px",
      }}
    >
      <Typography
        variant="h1"
        color="primary"
        fontSize="2.5em"
        sx={{
          WebkitTextStroke: "4px black",
          paintOrder: "stroke fill",
          letterSpacing: "0.1em",
        }}
      >
        x{score}
      </Typography>
    </Box>
  );
};

export default BonusScore;
