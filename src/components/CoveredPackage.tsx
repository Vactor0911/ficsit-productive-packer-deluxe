import { Box, Stack, Typography } from "@mui/material";
import FicsitLogo from "../assets/images/ficsit.svg";

const CoveredPackage = () => {
  return (
    <Stack
      width="calc(100% + 4px)"
      height="calc(100% + 4px)"
      bgcolor="#e5b065"
      border="2px solid black"
      boxShadow="0 24px 0 rgba(0, 0, 0, 0.2)"
      position="absolute"
      top="-2px"
      left="calc(-2px + 75vw)"
      zIndex={10000}
    >
      {/* 덮개 */}
      <Stack flex={1} justifyContent="center" position="relative">
        {/* 덮개 장식 */}
        <Box height="2px" bgcolor="#8d5b1d" />

        {/* 덮개 문구 */}
        <Stack
          alignItems="flex-end"
          color="#8d5b1d"
          position="absolute"
          bottom={{
            xs: 10,
            md: 20,
          }}
          right={{
            xs: 10,
            md: 20,
          }}
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

      {/* 외벽 */}
      <Stack
        height="24px"
        justifyContent="flex-end"
        borderTop="2px solid black"
        bgcolor="#8d5b1d"
      >
        <Box height="8px" borderBottom="2px solid black" />

        <Box
          width="7%"
          height="50%"
          margin="0.25% 1.5%"
          bgcolor="#d6d1b5"
          border="2px solid black"
          overflow="hidden"
          alignSelf="flex-end"
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
    </Stack>
  );
};

export default CoveredPackage;
