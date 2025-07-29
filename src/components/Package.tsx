import { Box, Stack, Typography } from "@mui/material";
import { useIsMobileLandscape } from "../utils";

const Package = () => {
  const isMobileLandscape = useIsMobileLandscape();

  return (
    <Stack
      width="100%"
      height="100%"
      bgcolor="#e5b065"
      border="2px solid black"
      boxShadow="0 24px 0 rgba(0, 0, 0, 0.2)"
    >
      <Stack flex={1} margin={0.5} border="2px solid black">
        {/* 패키지 내벽 */}
        <Box
          height="20px"
          bgcolor="#8d5b1d"
          borderBottom="2px solid black"
          boxShadow="0 20px 0 rgba(0, 0, 0, 0.2)"
        />

        <Stack
          flex={1}
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          {/* 패키지 하부 */}
          <Box width="100%" height="2px" bgcolor="#8d5b1d" />

          <Stack
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
            position="absolute"
            top={0}
            left={0}
          >
            <Box width="80%" height="80%" bgcolor="red" />
          </Stack>
        </Stack>
      </Stack>

      {/* 패키지 외벽 */}
      <Stack
        height="24px"
        justifyContent="flex-end"
        alignItems="flex-end"
        bgcolor="#8d5b1d"
        borderTop="2px solid black"
      >
        <Box
          width="7%"
          height="50%"
          margin="0.25% 1.5%"
          bgcolor="#d6d1b5"
          border="2px solid black"
          overflow="hidden"
        />
      </Stack>
    </Stack>
  );
};

export default Package;
