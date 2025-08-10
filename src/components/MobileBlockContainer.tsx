import { Box, Stack } from "@mui/material";
import Bolt from "./Bolt";

const MobileBlockContainer = () => {
  return (
    <Stack width="100%" height="100%" position="relative">
      {/* 상부 장식 */}
      <Box
        height="12px"
        bgcolor="#4d4d4d"
        borderTop="2px solid black"
        borderBottom="2px solid black"
      />

      {/* 블록 컨테이너 */}
      <Box flex={1} bgcolor="#666666" position="relative">
        {/* 볼트 장식 */}
        <Bolt top={8} left={8} />
        <Bolt top={8} right={8} />
      </Box>
    </Stack>
  );
};

export default MobileBlockContainer;
