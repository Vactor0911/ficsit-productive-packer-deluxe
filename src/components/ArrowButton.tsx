import { Typography } from "@mui/material";
import ButtonBase from "./ButtonBase";

interface ArrowButtonProps {
  text: string;
  onClick?: () => void;
}

const ArrowButton = (props: ArrowButtonProps) => {
  const { text, onClick } = props;

  return (
    <ButtonBase onClick={onClick}>
      <Typography
        variant="h1"
        sx={{
          color: "white",
          textShadow: "0 2px 0 #b85400",
          position: "relative",
        }}
      >
        {text}
      </Typography>
    </ButtonBase>
  );
};

export default ArrowButton;
