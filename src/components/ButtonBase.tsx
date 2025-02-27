import { Box } from "@mui/material";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ButtonBase = (props: ButtonProps) => {
  const { children, onClick } = props;

  return (
    <Box
      paddingBottom="10px"
      border="2px solid black"
      position="relative"
      boxShadow="0 10px 0 rgba(0, 0, 0, 0.15)"
      sx={{
        backgroundColor: "#e59344",
        cursor: "pointer",
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
        "&:hover > div:before": {
          display: "block",
        },
        "&:active": {
          boxShadow: "0 5px 0 rgba(0, 0, 0, 0.15)",
          marginTop: "5px",
          paddingBottom: "5px",
          "&:before": {
            height: "5px",
          },
          "&:after": {
            height: "calc(100% - 5px)",
          },
        },
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

export default ButtonBase;
