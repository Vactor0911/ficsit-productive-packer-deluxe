import { Typography } from "@mui/material";
import ButtonBase from "./ButtonBase";

interface ArrowButtonProps {
  onClick?: () => void;
}

const SendButton = (props: ArrowButtonProps) => {
  const { onClick } = props;

  return (
    <ButtonBase onClick={onClick}>
      <Typography
        variant="h1"
        sx={{
          color: "white",
          fontSize: "2.5em",
          textShadow: "0 2px 0 #b85400",
          position: "relative",
        }}
      >
        보내기
      </Typography>
    </ButtonBase>
  );
};

export default SendButton;
