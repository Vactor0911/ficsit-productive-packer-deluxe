import { Box, Stack, StackProps } from "@mui/material";
import { ReactNode } from "react";

interface PackageProps extends StackProps {
  board: ReactNode;
}

const Package = (props: PackageProps) => {
  const { board } = props;

  return (
    <Stack
      width={{
        xs: "90%",
        sm: "50%",
      }}
      maxWidth="650px"
      height={{
        xs: "80%",
        lg: "85%",
      }}
      position="absolute"
      top="50%"
      left="50%"
      zIndex={5}
      sx={{
        transform: "translate(-50%, -50%)",
      }}
      {...props}
    >
      <Stack
        height="100%"
        marginBottom="20px"
        border="2px solid black"
        boxShadow="0 20px 0 rgba(0, 0, 0, 0.15)"
        sx={{
          background: "#e5b065",
        }}
      >
        <Stack
          height="calc(100% - 20px)"
          borderBottom="2px solid black"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            width="calc(100% - 10px)"
            height="calc(100% - 10px)"
            border="2px solid black"
          >
            <Box
              height="20px"
              boxShadow="0 20px 0 rgba(0, 0, 0, 0.15)"
              sx={{
                background: "#8d5b1d",
              }}
            />
            <Stack
              height="calc(100% - 20px)"
              borderTop="2px solid black"
              justifyContent="center"
              alignItems="center"
              position="relative"
            >
              <Box
                width="100%"
                height="2px"
                position="absolute"
                top="50%"
                left="0"
                sx={{
                  background: "#8d5b1d",
                  transform: "translateY(-50%)",
                }}
              />
              <Stack
                width="100%"
                height="100%"
                justifyContent="center"
                alignItems="center"
                position="relative"
              >
                {board}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Box
          height="20px"
          sx={{
            background: "#8d5b1d",
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Package;
