import { Box, keyframes, Stack, StackProps } from "@mui/material";

interface ConveyorProps extends StackProps {
  isRunning?: boolean;
}

const ConveyorAnimation = keyframes`
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 10% 0;
    }
`;

const Conveyor = (props: ConveyorProps) => {
  const { isRunning = false, ...others } = props;
  return (
    <Stack {...others}>
      <Box
        height="8px"
        sx={{
          backgroundColor: "white",
        }}
      />
      <Box
        height="16px"
        sx={{
          backgroundColor: "#b3b3b3",
        }}
      />

      <Box
        width="100%"
        height="100%"
        sx={{
          background: `
            conic-gradient(from -15deg at calc(100% - 2px), #0000 210deg, #4d4d4d 0),
            conic-gradient(from -15deg at 100%, #4d4d4d 210deg, #000 0)`,
          backgroundSize: "12% 100%",
          animation: isRunning
            ? `${ConveyorAnimation} 1s linear infinite`
            : "none",
        }}
      />

      <Box
        height="8px"
        sx={{
          backgroundColor: "white",
        }}
      />
      <Box
        height="16px"
        sx={{
          backgroundColor: "#b3b3b3",
        }}
      />
    </Stack>
  );
};

export default Conveyor;
