import { Box, Stack, type StackProps } from "@mui/material";

const ConveyorSupport = (props: StackProps) => {
  return (
    <Stack
      position="relative"
      zIndex={10}
      boxShadow={{
        xs: "0 12px 0 rgba(0, 0, 0, 0.15)",
        md: "0 24px 0 rgba(0, 0, 0, 0.15)",
      }}
      {...props}
    >
      <Box
        height={{
          xs: "4px",
          md: "8px",
        }}
        bgcolor="white"
        borderTop="2px solid black"
      />
      <Box
        height={{
          xs: "12px",
          md: "24px",
        }}
        bgcolor="#b3b3b3"
        borderTop="2px solid black"
        borderBottom="2px solid black"
      />
    </Stack>
  );
};

export default ConveyorSupport;
