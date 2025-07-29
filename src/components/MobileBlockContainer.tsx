import { Box, Stack } from "@mui/material";

const MobileBlockContainer = () => {
  return (
    <Stack width="100%" height="100%" position="relative">
      {/* 상부 장식 */}
      <Box
        height="16px"
        bgcolor="#4d4d4d"
        borderTop="2px solid black"
        borderBottom="2px solid black"
      />

      {/* 블록 컨테이너 */}
      <Box flex={1} bgcolor="#666666"></Box>
    </Stack>
  );
};

export default MobileBlockContainer;
