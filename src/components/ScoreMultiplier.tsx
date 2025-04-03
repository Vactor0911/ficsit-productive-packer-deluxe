import { Box, Typography } from "@mui/material";
import { useCallback } from "react";

interface ScoreMultiplierProps {
  score: number;
}

const ScoreMultiplier = (props: ScoreMultiplierProps) => {
  const { score } = props;

  const formatScore = useCallback((score: number) => {
    return Math.floor(score * 10) / 10;
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        borderRadius: "50px",
      }}
    >
      <Typography
        variant="h1"
        color="primary"
        fontSize="2.5em"
        textAlign="center"
        lineHeight="1.25em"
        overflow="hidden"
        px={2}
        sx={{
          WebkitTextStroke: "4px black",
          paintOrder: "stroke fill",
          letterSpacing: "0.1em",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        x{formatScore(score)}
      </Typography>
    </Box>
  );
};

export default ScoreMultiplier;
