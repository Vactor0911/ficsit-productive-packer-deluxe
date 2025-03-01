import { Typography } from "@mui/material";
import ButtonBase from "./ButtonBase";
import { useCallback } from "react";
import { playEffect } from "../utils";
import ButtonHoverAudio from "../assets/audio/button_hover.mp3";
import ButtonClickAudio from "../assets/audio/button_click.mp3";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const { text, onClick } = props;

  const handleHover = useCallback(() => {
    playEffect(ButtonHoverAudio, 0.3);
  }, []);

  const handleClick = useCallback(() => {
    playEffect(ButtonClickAudio, 0.3);
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <ButtonBase onClick={handleClick} onMouseEnter={handleHover}>
      <Typography
        variant="h1"
        sx={{
          color: "white",
          fontWeight: "400",
          WebkitTextStroke: "5px black",
          paintOrder: "stroke fill",
          textShadow: "4px 4px 0 rgba(0, 0, 0, 0.25)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {text}
      </Typography>
    </ButtonBase>
  );
};

export default Button;
