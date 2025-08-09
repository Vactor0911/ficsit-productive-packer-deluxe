import { Box } from "@mui/material";
import * as Levels from "../assets/images/levels";
import { useLocation } from "react-router-dom";

const Board = () => {
  const location = useLocation();
  const level = location.pathname.split("/").pop();

  const commonImageStyles = {
    width: "100%",
    height: "100%",
    component: "img" as const,
    src: Levels[`Level${level}` as keyof typeof Levels],
  };

  return (
    <Box width="80%" height="90%" position="relative">
      {/* 보드 */}
      <Box {...commonImageStyles} position="relative" zIndex={2} />

      {/* 장식 */}
      <Box
        {...commonImageStyles}
        bottom="-2%"
        left="50%"
        position="absolute"
        zIndex={1}
        sx={{
          transform: "translateX(-50%)",
          filter: "brightness(50%)",
        }}
      />

      {/* 그림자 */}
      <Box
        {...commonImageStyles}
        bottom="-4%"
        left="50%"
        position="absolute"
        sx={{
          transform: "translateX(-50%)",
          filter: "brightness(0%)",
          opacity: 0.25,
        }}
      />
    </Box>
  );
};

export default Board;
