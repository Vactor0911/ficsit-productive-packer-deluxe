import { Box, Stack, StackProps } from "@mui/material";
import Panel from "./Panel";
import Marquee from "react-fast-marquee";

interface ConveyorProps extends StackProps {
  isRunning?: boolean;
}

const Conveyor = (props: ConveyorProps) => {
  const { isRunning = false, ...others } = props;
  return (
    <Stack minHeight="300px" maxHeight="1600px" {...others}>
      {/* 상부 지지대 */}
      <Panel padding="4px" thickness="24px" position="relative" zIndex={2} />

      {/* 컨베이어 */}
      <Marquee
        autoFill
        direction="right"
        speed={500}
        play={isRunning}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background: "#4d4d4d",
        }}
      >
        <Box
          width={{
            sm: "220px",
            xs: "110px",
          }}
          height="70vh"
          sx={{
            background: `
          conic-gradient(from -15deg at calc(100% - 2px), #0000 210deg, #4d4d4d 0),
          conic-gradient(from -15deg at 100%, #4d4d4d 210deg, #000 0)`,
            backgroundSize: {
              sm: "220px 100%",
              xs: "110px 100%",
            },
          }}
        />
      </Marquee>

      {/* 하부 지지대 */}
      <Panel padding="4px" thickness="24px" />
    </Stack>
  );
};

export default Conveyor;
