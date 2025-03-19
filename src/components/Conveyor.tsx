import { Box, keyframes, Stack, StackProps } from "@mui/material";
import Panel from "./Panel";

interface ConveyorProps extends StackProps {
  children?: React.ReactNode;
  isRunning?: boolean;
}

const ConveyorAnimation = keyframes`
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 220px 0;
    }
`;

const Conveyor = (props: ConveyorProps) => {
  const { children, isRunning = false, ...others } = props;
  return (
    <Stack {...others}>
      {/* 상부 지지대 */}
      <Panel padding="4px" thickness="24px" position="relative" zIndex={1} />

      {/* 컨베이어어 */}
      <Box
        width="100%"
        height="100%"
        position="relative"
        sx={{
          background: `
            conic-gradient(from -15deg at calc(100% - 2px), #0000 210deg, #4d4d4d 0),
            conic-gradient(from -15deg at 100%, #4d4d4d 210deg, #000 0)`,
          backgroundSize: "220px 100%",
          animation: isRunning
            ? `${ConveyorAnimation} 0.25s linear infinite`
            : "none",
        }}
      >
        {children}
      </Box>

      {/* 하부 지지대 */}
      <Panel padding="4px" thickness="24px" />
    </Stack>
  );
};

export default Conveyor;
