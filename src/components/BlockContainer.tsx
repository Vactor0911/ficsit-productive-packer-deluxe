import { Box, Grid2, Stack, StackProps } from "@mui/material";
import Bolt from "../assets/images/bolt.svg";
import BlockWithScore from "./BlockWithScore";
import { useEffect, useRef, useState } from "react";

const BlockContainer = (props: StackProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [tileSize, setTileSize] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect;

      const newTileSize = Math.floor(width / 9);

      // 크기 적용
      setTileSize(newTileSize);
    });

    if (rootRef.current) {
      observer.observe(rootRef.current);
    }

    return () => observer.disconnect();
  }, [setTileSize]);

  return (
    <Stack
      display={{
        sm: "flex",
        xs: "none",
      }}
      width="20vw"
      height="100%"
      minHeight="300px"
      maxHeight="1600px"
      position="absolute"
      zIndex={3}
      top={0}
      left={0}
      borderRight="2px solid black"
      sx={{
        background: "#666666",
      }}
      {...props}
    >
      {/* 블록 저장 div */}
      <Stack
        width="100%"
        height="calc(100% - 36px)"
        position="relative"
        padding={4}
        pt={6}
      >
        {/* 볼트 */}
        <Box
          component="img"
          src={Bolt}
          alt="bolt"
          width="20px"
          top={10}
          right={10}
          position="absolute"
        />
        <Box
          component="img"
          src={Bolt}
          alt="bolt"
          width="20px"
          bottom={10}
          right={10}
          position="absolute"
        />

        {/* 블록 */}
        <Grid2
          container
          height="100%"
          justifyContent="space-between"
          alignContent="space-between"
          ref={rootRef}
        >
          {[1, 2, 3, 22, 5, 6, 22, 8].map((block, index) => (
            <Grid2
              key={index}
              size={6}
              maxWidth="130px"
              sx={{
                aspectRatio: "1 / 1",
              }}
            >
              <BlockWithScore blockId={block} tileSize={tileSize} />
            </Grid2>
          ))}
        </Grid2>
      </Stack>

      {/* 장식용 div */}
      <Box
        width="100%"
        height="36px"
        bottom={0}
        left={0}
        position="absolute"
        borderTop="2px solid black"
        sx={{
          background: "#999999",
        }}
      />

      {/* 상부 장식용 div */}
      <Box
        width="calc(100% + 2px)"
        height="24px"
        top="-24px"
        left={0}
        position="absolute"
        border="2px solid black"
        borderLeft="none"
        sx={{
          background: "#4d4d4d",
        }}
      />

      {/* 하부 장식용 div */}
      <Box
        width="calc(100% + 2px)"
        height="72px"
        bottom="-72px"
        left={0}
        position="absolute"
        border="2px solid black"
        borderTop="none"
        borderLeft="none"
        sx={{
          background: "#4d4d4d",
        }}
      />

      {/* 우측 장식용 div */}
      <Box
        width="24px"
        height="calc(100% + 72px)"
        top="-8px"
        right="-24px"
        position="absolute"
        border="2px solid black"
        sx={{
          background: "#333333",
        }}
      >
        <Box
          width="100%"
          height="24px"
          top={0}
          left={0}
          position="absolute"
          borderBottom="2px solid black"
          sx={{
            background: "#1a1a1a",
          }}
        />
        <Box
          width="100%"
          height="36px"
          bottom="72px"
          left={0}
          position="absolute"
          borderTop="2px solid black"
          sx={{
            background: "#808080",
          }}
        />
        <Box
          width="100%"
          height="72px"
          bottom={0}
          left={0}
          position="absolute"
          borderTop="2px solid black"
          sx={{
            background: "#1a1a1a",
          }}
        />
        <Box
          width="100%"
          height="100%"
          top={0}
          left={0}
          position="absolute"
          zIndex={1}
          boxShadow="inset 10px 0 0 rgba(0, 0, 0, 0.15)"
        />
      </Box>
    </Stack>
  );
};

export default BlockContainer;
