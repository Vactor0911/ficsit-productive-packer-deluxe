import { Box, keyframes, Typography } from "@mui/material";

const HoverAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(71px);
  }
`;

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const { text, onClick } = props;

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
      <Box
        padding={1}
        sx={{
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: "''",
            display: "none",
            position: "absolute",
            top: 0,
            left: "-75px",
            width: "calc(100% + 75px)",
            height: "100%",
            background:
              "repeating-linear-gradient(-45deg, #e59344, #e59344 25px, #f3d2c0 25px, #f3d2c0 50px)",
            animation: `${HoverAnimation} 1.5s linear infinite`,
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "white",
            fontWeight: "500",
            WebkitTextStroke: "5px black",
            paintOrder: "stroke fill",
            textShadow: "4px 4px 0 rgba(0, 0, 0, 0.25)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default Button;
