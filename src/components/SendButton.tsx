import { keyframes, Stack, Typography } from "@mui/material";
import ButtonBase, { ButtonBaseProps } from "./ButtonBase";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const HoverAnimation = keyframes`
  0% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(-10px);
  }
`;

const SendButton = (props: ButtonBaseProps) => {
  const { onClick, disabled, ...others } = props;

  return (
    <ButtonBase onClick={onClick} disabled={disabled} {...others}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
      >
        <Typography
          variant="h1"
          sx={{
            color: "white",
            fontSize: "2.5em",
            textShadow: "0 2px 0 rgba(0, 0, 0, 0.25)",
            position: "relative",
          }}
        >
          보내기
        </Typography>
        <ArrowForwardIcon
          sx={{
            color: "white",
            fontSize: "4em",
            animation: disabled
              ? undefined
              : `${HoverAnimation} 1s ease-in-out infinite`,
            WebkitFilter: "drop-shadow(0 3px 0 rgba(0, 0, 0, 0.25))",
            filter: "drop-shadow(0 3px 0 rgba(0, 0, 0, 0.25))",
          }}
        />
      </Stack>
    </ButtonBase>
  );
};

export default SendButton;
