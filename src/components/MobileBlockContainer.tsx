import { Stack } from "@mui/material";

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
    ></Stack>
  );
};

export default MobileBlockContainer;
