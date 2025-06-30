import { ButtonBase, useTheme, type ButtonBaseProps } from "@mui/material";
import Panel from "./Panel";
import { useCallback, useState } from "react";

interface ButtonProps extends ButtonBaseProps {
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const { children, sx, ...others } = props;

  const theme = useTheme();
  const [pushedSize, setPushedSize] = useState(0);

  // 마우스 클릭
  const handleMouseDown = useCallback(() => {
    setPushedSize(0.8);
  }, []);

  // 마우스 클릭 종료
  const handleMouseUp = useCallback(() => {
    setPushedSize(0);
  }, []);

  return (
    <ButtonBase
      disableRipple
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      sx={{ marginTop: pushedSize, ...sx }}
      {...others}
    >
      <Panel
        padding={1.5}
        paddingY={2}
        backgroundColor={theme.palette.primary.main}
        thickness={1.5 - pushedSize}
        sx={{
          "& .MuiTypography-root": {
            WebkitTextStroke: "4px black",
            paintOrder: "stroke fill",
            textShadow: "4px 4px 0 rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        {children}
      </Panel>
    </ButtonBase>
  );
};

export default Button;
