import { Box, Grid, Stack } from "@mui/material";
import Bolt from "./Bolt";
import { useIsMobileLandscape } from "../utils";
import Block from "./Block";

const BlockContainer = () => {
  const isMobileLandscape = useIsMobileLandscape();
  const boltOffset = isMobileLandscape ? 4 : 8;

  return (
    <Stack
      width="100%"
      height="100%"
      borderTop="2px solid black"
      borderRight="2px solid black"
      position="relative"
    >
      {/* 상부 장식 */}
      <Box
        width="calc(100% + 2px)"
        height={{
          xs: "20px",
          md: "40px",
        }}
        bgcolor="#4d4d4d"
        position="absolute"
        top={0}
        left={0}
        borderTop="2px solid black"
        borderRight="2px solid black"
        sx={{
          transform: "translateY(calc(-100% - 2px))",
        }}
      />

      {/* 블록 컨테이너 */}
      <Box
        height={
          isMobileLandscape
            ? "calc(100% - 36px)"
            : {
                xs: "calc(100% - 36px)",
                sm: "calc(100% - 72px)",
              }
        }
        bgcolor="#666666"
        position="relative"
      >
        {/* 볼트 장식 */}
        <Bolt top={boltOffset} right={boltOffset} />
        <Bolt bottom={boltOffset} right={boltOffset} />

        {/* 블록 */}
        <Stack
          width="100%"
          height="100%"
          direction="row"
          padding={isMobileLandscape ? 1.5 : 3}
          flexWrap="wrap"
        >
          <Block id="block-1" width="50%" height="25%" blockId={2} />
          <Block id="block-1" width="50%" height="25%" blockId={5} />
          <Block id="block-1" width="50%" height="25%" blockId={8} />
          <Block id="block-1" width="50%" height="25%" blockId={12} />
          <Block id="block-1" width="50%" height="25%" blockId={11} />
          <Block id="block-1" width="50%" height="25%" blockId={20} />
          <Block id="block-1" width="50%" height="25%" blockId={23} />
          <Block id="block-1" width="50%" height="25%" blockId={18} />
        </Stack>
      </Box>

      {/* 하부 지지대 */}
      <Box
        height={{
          xs: "16px",
          md: "32px",
        }}
        bgcolor="#999999"
        borderTop="2px solid black"
      />

      {/* 하부 장식 */}
      <Box
        height={{
          xs: "20px",
          md: "40px",
        }}
        bgcolor="#4d4d4d"
      />

      {/* 우측 장식 */}
      <Stack
        width="20px"
        height="100%"
        position="absolute"
        top={0}
        right={0}
        border="2px solid black"
        borderLeft="none"
        sx={{
          transform: "translate(calc(100% + 2px), -10px)",
          "&: after": {
            content: '""',
            position: "absolute",
            width: "8px",
            height: "100%",
            top: 0,
            left: 0,
            background: "rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        {/* 상부 지지대 */}
        <Box
          height={{
            xs: "12px",
            md: "24px",
          }}
          bgcolor="#1a1a1a"
        />

        {/* 중앙 장식 */}
        <Box flex={1} bgcolor="#333333" />

        {/* 하부 지지대 */}
        <Box
          height={{
            xs: "16px",
            md: "32px",
          }}
          bgcolor="#808080"
        />

        {/* 하부 장식 */}
        <Box
          height={{
            xs: "20px",
            md: "40px",
          }}
          bgcolor="#4d4d4d"
        />
      </Stack>
    </Stack>
  );
};

export default BlockContainer;
