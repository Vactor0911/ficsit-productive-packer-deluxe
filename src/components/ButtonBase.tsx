import { Box, ButtonProps } from "@mui/material";

interface ButtonBaseProps extends ButtonProps {
  children?: React.ReactNode;
}

const ButtonBase = (props: ButtonBaseProps) => {
  const { children, ...otherProps } = props;

  return (
    <Box
      padding={0}
      component="button"
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
      {...otherProps}
    >
      {children}
    </Box>
  );
};

export default ButtonBase;
