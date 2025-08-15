import { Box, Stack, Typography } from "@mui/material";
import Board from "./Board";
import FicsitLogo from "../assets/images/ficsit.svg";

const Package = () => {
  return (
    <Stack
      width="100%"
      height="100%"
      bgcolor="#e5b065"
      border="2px solid black"
      boxShadow="0 24px 0 rgba(0, 0, 0, 0.2)"
      position="relative"
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
          {/* 패키지 하부 장식 */}
          <Box width="100%" height="2px" bgcolor="#8d5b1d" />

          {/* 보드 */}
          <Stack
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
            position="absolute"
            top={0}
            left={0}
          >
            <Board />
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
        >
          <Typography
            variant="subtitle2"
            fontFamily="'Libre Barcode 39'"
            textAlign="center"
            lineHeight={1}
            color="#515045"
          >
            Ficsit
          </Typography>
        </Box>
      </Stack>

      {/* 덮개 */}
      <Stack
        width="calc(100% + 4px)"
        height="calc(100% - 12px)"
        position="absolute"
        top="-2px"
        left="-2px"
        zIndex={1000}
      >
        <Stack
          flex={1}
          justifyContent="center"
          bgcolor="#e5b065"
          border="2px solid black"
          position="relative"
        >
          {/* 덮개 장식 */}
          <Box width="100%" height="2px" bgcolor="#8d5b1d" />

          {/* 덮개 문구 */}
          <Stack
            alignItems="flex-end"
            color="#8d5b1d"
            position="absolute"
            bottom={10}
            right={10}
          >
            <Box component="img" src={FicsitLogo} width="3.5rem" />
            <Typography variant="subtitle1" lineHeight="1rem">
              DELIVERY
            </Typography>
            <Typography variant="subtitle1" lineHeight="1rem">
              SERVICES
            </Typography>
          </Stack>
        </Stack>

        {/* 덮개 외벽 */}
        <Box
          height="8px"
          bgcolor={"#8d5b1d"}
          border="2px solid black"
          borderTop="none"
        />
      </Stack>
    </Stack>
  );
};

export default Package;
