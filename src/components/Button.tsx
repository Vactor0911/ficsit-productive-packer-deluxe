import { Box, Typography } from "@mui/material";

interface ButtonProps {
  text: string;
}

const Button = (props: ButtonProps) => {
  const { text } = props;

  return (
    <Box
      padding={1}
      paddingBottom="18px"
      border="2px solid black"
      position="relative"
      boxShadow="0 10px 0 rgba(0, 0, 0, 0.15)"
      sx={{
        backgroundColor: "#e59344",
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
        "&:hover": {
          cursor: "pointer",
        },
        "&:active": {
          boxShadow: "0 5px 0 rgba(0, 0, 0, 0.15)",
          marginTop: "5px",
          paddingBottom: "13px",
        },
        "&:active:before": {
          height: "5px",
        },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "white",
          WebkitTextStroke: "5px black",
          paintOrder: "stroke fill",
          letterSpacing: "0.05em",
          textShadow: "4px 4px 0 rgba(0, 0, 0, 0.25)",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Button;
