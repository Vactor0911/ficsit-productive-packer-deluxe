import { Stack, StackProps } from "@mui/material";

const BlockContainer = (props: StackProps) => {
  return (
    <Stack
      display={{
        sm: "flex",
        xs: "none",
      }}
      width="20vw"
      maxWidth="300px"
      height="100%"
      position="absolute"
      zIndex={3}
      top={0}
      left={0}
      sx={{
        background: "#666666",
      }}
      {...props}
    ></Stack>
  );
};

export default BlockContainer;
