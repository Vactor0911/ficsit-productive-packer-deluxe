import { Box, Stack } from "@mui/material";
import Bolt from "../assets/images/bolt.svg";

const MobileBlockContainer = () => {
  return (
    <Stack
      display={{
        sm: "none",
        xs: "flex",
      }}
      width="100%"
      height="25vh"
      position="absolute"
      bottom={0}
      left={0}
      sx={{
        background: "#666666",
      }}
    >
      <Box
        width="100%"
        height="18px"
        top={0}
        left={0}
        position="absolute"
        borderTop="2px solid black"
        borderBottom="2px solid black"
        sx={{
          background: "#999999",
        }}
      />
      <Stack
        width="100%"
        height="calc(100% - 18px)"
        bottom={0}
        left={0}
        position="absolute"
      >
        {/* 볼트 */}
        <Box
          component="img"
          src={Bolt}
          alt="bolt"
          width="16px"
          top={10}
          left={10}
          position="absolute"
        />
        <Box
          component="img"
          src={Bolt}
          alt="bolt"
          width="16px"
          top={10}
          right={10}
          position="absolute"
        />
        {/* 블록 */}
      </Stack>
    </Stack>
  );
};

export default MobileBlockContainer;
