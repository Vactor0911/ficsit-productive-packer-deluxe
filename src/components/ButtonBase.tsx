import { Box, Button, ButtonProps, keyframes } from "@mui/material";
import { useCallback } from "react";

const HoverAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(71px);
  }
`;

export interface ButtonBaseProps extends ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const ButtonBase = (props: ButtonBaseProps) => {
  const { children, disabled, onClick, ...otherProps } = props;

  const handleClick = useCallback(() => {
    if (onClick && !disabled) {
      onClick();
    }
  }, [disabled, onClick]);

  return (
    <Button
      disabled={disabled}
      sx={{
        padding: "0",
        paddingBottom: "10px",
        border: "2px solid black",
        backgroundColor: disabled ? "#666666" : "#e59344",
        boxShadow: "0 10px 0 rgba(0, 0, 0, 0.15)",
        position: "relative",
        transition: "none",
        borderRadius: "0",
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
        "&:hover > div:before, &:active > div:before": {
          display: "block",
        },
        "&:active": {
          boxShadow: "0 5px 0 rgba(0, 0, 0, 0.15)",
          marginTop: "5px",
          paddingBottom: "5px",
          "&:before": {
            height: "5px",
          },
        },
      }}
      onClick={handleClick}
      {...otherProps}
    >
      <Box
        width="100%"
        padding="8px 16px"
        justifyContent="center"
        alignItems="center"
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
        {children}
      </Box>
    </Button>
  );
};

export default ButtonBase;
