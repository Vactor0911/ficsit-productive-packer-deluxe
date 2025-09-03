import { Box, keyframes, Stack, Typography } from "@mui/material";
import { useIsMobileLandscape } from "../utils";
import Button from "./Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const activeAnimation = keyframes`
    0% 100% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(-12px);
    }
`;

interface SendButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const SendButton = (props: SendButtonProps) => {
  const { onClick, disabled } = props;

  const isMobileLandscape = useIsMobileLandscape();

  return (
    <Button
      fullWidth
      disabled={disabled}
      onClick={onClick}
      playSound={false}
      slots={{
        buttonProps: {
          sx: {
            "&:enabled .arrow-button-container > .MuiBox-root": {
              animation: `${activeAnimation} 1s ease-in-out infinite`,
            },
          },
        },
        panelProps: isMobileLandscape
          ? {
              padding: 1,
              paddingY: 0.5,
              sx: {
                "& .MuiTypography-root": {
                  textShadow: "2px 4px 0 rgba(0, 0, 0, 0.25)",
                },
              },
            }
          : {
              sx: {
                "& .MuiTypography-root": {
                  textShadow: "2px 4px 0 rgba(0, 0, 0, 0.25)",
                },
              },
            },
      }}
    >
      <Stack
        className="arrow-button-container"
        width="100%"
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        gap={1}
      >
        {/* 텍스트 */}
        <Typography variant={isMobileLandscape ? "h6" : "h4"}>
          보내기
        </Typography>

        {/* 화살표 아이콘 */}
        <Box
          sx={{
            position: "relative",
            "& .MuiSvgIcon-root": {
              width: "auto",
              height: "100%",
              transform: "translateX(-100%) scale(1.25)",
            },
          }}
        >
          <ArrowForwardIcon
            sx={{
              color: disabled ? "#b3b3b3" : "white",
            }}
          />
          <ArrowForwardIcon
            sx={{
              position: "absolute",
              top: "4px",
              left: 0,
              color: "rgba(0, 0, 0, 0.2)",
              zIndex: -1,
            }}
          />
        </Box>
      </Stack>
    </Button>
  );
};

export default SendButton;
