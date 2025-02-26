import { Box } from "@mui/material";

interface PanelProps {
  color?: string;
  children: React.ReactNode;
}

const Panel = (props: PanelProps) => {
  const { color, children } = props;

  return (
    <Box
      padding={1}
      paddingBottom="18px"
      border="2px solid black"
      position="relative"
      boxShadow="0 10px 0 rgba(0, 0, 0, 0.15)"
      sx={{
        backgroundColor: color ? color : "white",
        "&:before": {
          content: "''",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "10px",
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
