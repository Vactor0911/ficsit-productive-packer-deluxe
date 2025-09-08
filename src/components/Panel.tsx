import { Box, type BoxProps } from "@mui/material";
import { calculatePixel } from "../utils";
import { useMemo } from "react";

export interface PanelProps extends BoxProps {
  thickness?: number | string;
  backgroundColor?: string;
}

const Panel = (props: PanelProps) => {
  const {
    children,
    thickness = 1,
    backgroundColor = "white",
    sx,
    ...others
  } = props;

  const calculatedThickness = useMemo(() => {
    return calculatePixel(thickness);
  }, [thickness]);

  return (
    <Box
      border="2px solid black"
      height="100%"
      marginBottom={thickness === 1 ? 0 : calculatedThickness}
      position="relative"
      sx={{
        backgroundColor: backgroundColor,
        "&:after": {
          content: '""',
          width: "calc(100% + 4px)",
          height: `calc(${calculatedThickness} + 2px)`,
          position: "absolute",
          bottom: `calc(-${calculatedThickness} - 2px)`,
          left: "-2px",
          border: "2px solid black",
          backgroundColor: backgroundColor,
          filter: "brightness(80%) saturate(1.4)",
          boxShadow: `0 ${calculatedThickness} 0 rgba(0, 0, 0, 0.15)`,
        },
        ...sx,
      }}
      {...others}
    >
      {children}
    </Box>
  );
};

export default Panel;
