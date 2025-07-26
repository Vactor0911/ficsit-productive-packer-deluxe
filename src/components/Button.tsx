import { Box, ButtonBase, useTheme, type ButtonBaseProps } from "@mui/material";
import Panel from "./Panel";
import React, { useCallback, useState } from "react";
import Marquee from "react-fast-marquee";
import DiagonalPattern from "../assets/images/diagonal_pattern.svg?react";
import { playEffect } from "../utils";
import ButtonHoverAudio from "../assets/audio/button_hover.mp3";
import ButtonClickAudio from "../assets/audio/button_click.mp3";

interface ButtonProps extends ButtonBaseProps {
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const { children, onClick, sx, ...others } = props;

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

  // 마우스 호버
  const handleHover = useCallback(() => {
    playEffect(ButtonHoverAudio);
  }, []);

  // 마우스 클릭
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      playEffect(ButtonClickAudio);
      if (onClick) {
        onClick(event);
      }
    },
    [onClick]
  );

  return (
    <ButtonBase
      disableRipple
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
      onMouseEnter={handleHover}
      onClick={handleClick}
      sx={{
        marginTop: pushedSize,
        "&:hover .pattern-container": {
          display: "block",
        },
        ...sx,
      }}
      {...others}
    >
      <Panel
        padding={1.5}
        paddingY={2}
        backgroundColor={theme.palette.primary.main}
        thickness={1.5 - pushedSize}
        display="inline-flex"
        height="auto"
        sx={{
          "& .MuiTypography-root": {
            WebkitTextStroke: "4px black",
            paintOrder: "stroke fill",
            textShadow: "4px 4px 0 rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <Box
          position="relative"
          zIndex={2}
          sx={{
            "& .MuiTypography-root": {
              color: "white",
              fontWeight: 500,
            },
          }}
        >
          {children}
        </Box>

        {/* 대각선 패턴 */}
        <Box
          className="pattern-container"
          display={pushedSize > 0 ? "block" : "none"}
          position="absolute"
          overflow="hidden"
          width="100%"
          height="calc(100% - 1px)"
          sx={{
            top: 0,
            left: 0,
          }}
        >
          <Marquee
            direction="left"
            autoFill={true}
            css={{
              height: "100%",
              overflow: "hidden",
              "& div.rfm-initial-child-container, & div.rfm-child": {
                height: "100%",
              },
            }}
          >
            <DiagonalPattern
              style={{ width: "100%", height: "100%", color: "#f3d2c0" }}
            />
          </Marquee>
        </Box>
      </Panel>
    </ButtonBase>
  );
};

export default Button;
