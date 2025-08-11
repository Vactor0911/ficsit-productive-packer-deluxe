import { Box, Stack, type StackProps } from "@mui/material";
import { useIsMobileLandscape } from "../utils";

const Bolt = (props: StackProps) => {
  const isMobileLandscape = useIsMobileLandscape();

  return (
    <Stack
      width={isMobileLandscape ? "10px" : "18px"}
      height={isMobileLandscape ? "10px" : "18px"}
      justifyContent="center"
      alignItems="center"
      borderRadius="50%"
      bgcolor="#737373"
      border={isMobileLandscape ? "1px solid black" : "2px solid black"}
      position="absolute"
      {...props}
    >
      <Box
        width={isMobileLandscape ? "1px" : "2px"}
        height="100%"
        bgcolor="#555555"
        sx={{
          transform: "rotate(-45deg)",
        }}
      />
    </Stack>
  );
};

export default Bolt;
