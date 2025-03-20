import { Box, StackProps } from "@mui/material";

interface PanelProps extends StackProps {
  color?: string;
  thickness?: string;
  padding?: number | string;
  children?: React.ReactNode;
}

const Panel = (props: PanelProps) => {
  const {
    color = "white",
    thickness = "10px",
    padding = "0",
    children,
    ...others
  } = props;

  const calcSize = (size: number | string) => {
    if (typeof size === "string") {
      return size;
    }
    return `${size * 8}px`;
  };

  return (
    <Box
      padding={padding}
      paddingBottom={`calc(${calcSize(padding)} + ${thickness})`}
      border="2px solid black"
      position="relative"
      boxShadow={`0 ${thickness} 0 rgba(0, 0, 0, 0.15)`}
      {...others}
      sx={{
        backgroundColor: color,
        "&:before": {
          content: "''",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: thickness,
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          borderTop: "2px solid black",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default Panel;
