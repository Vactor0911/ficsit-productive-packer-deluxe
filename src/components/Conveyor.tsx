import { Box, keyframes, Stack, StackProps } from "@mui/material";
import Panel from "./Panel";
import Marquee from "react-fast-marquee";

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
      <Panel padding="4px" thickness="24px" position="relative" zIndex={2} />

      {/* 컨베이어 */}
      <Marquee
        autoFill
        direction="right"
        speed={500}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background: "#4d4d4d",
        }}
      >
        <Box
          width="220px"
          height="70vh"
          sx={{
            background: `
          conic-gradient(from -15deg at calc(100% - 2px), #0000 210deg, #4d4d4d 0),
          conic-gradient(from -15deg at 100%, #4d4d4d 210deg, #000 0)`,
            backgroundSize: "220px 100%",
          }}
        />
      </Marquee>

      {/* 하부 지지대 */}
      <Panel padding="4px" thickness="24px" />
    </Stack>
  );
};

export default Conveyor;
