import { Box, Stack, Typography } from "@mui/material";
import Coin from "../assets/images/coin.svg";

interface ScoreCoinProps {
  score: number;
}

const ScoreCoin = (props: ScoreCoinProps) => {
  const { score } = props;

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        borderRadius: "50px",
      }}
    >
      <Box
        component="img"
        src={Coin}
        alt="coin"
        width="30px"
      />
      <Typography
        variant="h1"
        color="white"
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
        {score}
      </Typography>
    </Stack>
  );
};

export default ScoreCoin;
