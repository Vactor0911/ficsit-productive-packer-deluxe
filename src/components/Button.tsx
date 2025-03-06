import { Typography } from "@mui/material";
import ButtonBase, { ButtonBaseProps } from "./ButtonBase";

interface ButtonProps extends ButtonBaseProps {
  text: string;
}

const Button = (props: ButtonProps) => {
  const { text, onClick, ...others } = props;

  return (
    <ButtonBase onClick={onClick} {...others}>
      <Typography
        variant="h1"
        sx={{
          color: "white",
          fontWeight: "400",
          fontSize: "2.5em",
          WebkitTextStroke: "4px black",
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
