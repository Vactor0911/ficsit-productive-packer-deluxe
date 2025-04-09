import { Box, Stack, StackProps } from "@mui/material";
import BlockData from "../assets/blocks.json";
import {
  BlockC,
  BlockI,
  BlockJ,
  BlockL,
  BlockN,
  BlockO,
  BlockP,
  BlockQ,
  BlockS,
  BlockT,
  BlockX,
  BlockZ,
} from "../assets/images/blocks";
import { useAtomValue } from "jotai";
import { tileSizeAtom } from "../states";
import { useMemo } from "react";

interface BlockImageProps {
  blockId: number;
}

const BlockImage = (props: BlockImageProps) => {
  const { blockId } = props;
  const tileSize = useAtomValue(tileSizeAtom);

  // 블록 데이터 가져오기
  const blockData = useMemo(() => {
    return BlockData[blockId];
  }, [blockId]);

  const BlockProps = useMemo(() => {
    // 회전된 블록 offset 계산
    let multiplier = 0;
    switch (blockData.type) {
      case "J":
      case "L":
        multiplier = blockData.rotation === 90 ? -0.5 : 0.5;
        break;
      case "T":
        multiplier = blockData.rotation === 270 ? -0.5 : 0.5;
        break;
      case "S":
      case "Z":
        multiplier = 0.5;
        break;
      case "I":
        multiplier = -1.5;
        break;
    }

    const offset =
      (blockData?.rotation ?? 0) % 180 !== 0 ? tileSize * multiplier : 0;

    // 블록 높이 계산
    const height =
      (blockData?.rotation ?? 0) % 180 !== 0
        ? blockData.grid[0].length
        : blockData.grid.length;

    // 블록 공통 속성
    const BlockProps = {
      fill: blockData.color,
      height: tileSize * height,
      style: {
        transform: `rotate(${blockData.rotation}deg) translate(${offset}px, ${offset}px)`,
      },
    };

    return BlockProps;
  }, [
    blockData.color,
    blockData.grid,
    blockData.rotation,
    blockData.type,
    tileSize,
  ]);

  // 블록 타입에 따른 컴포넌트 렌더링
  switch (blockData.type) {
    case "X":
      return <BlockX {...BlockProps} />;
    case "J":
      return <BlockJ {...BlockProps} />;
    case "L":
      return <BlockL {...BlockProps} />;
    case "T":
      return <BlockT {...BlockProps} />;
    case "Z":
      return <BlockZ {...BlockProps} />;
    case "S":
      return <BlockS {...BlockProps} />;
    case "I":
      return <BlockI {...BlockProps} />;
    case "O":
      return <BlockO {...BlockProps} />;
    case "P":
      return <BlockP {...BlockProps} />;
    case "C":
      return <BlockC {...BlockProps} />;
    case "Q":
      return <BlockQ {...BlockProps} />;
    case "N":
      return <BlockN {...BlockProps} />;
  }
};

interface BlockProps extends StackProps {
  blockId: number;
}

const Block = (props: BlockProps) => {
  const { blockId, ...others } = props;

  return (
    <Stack position="relative" {...others}>
      <Box
        position="relative"
        zIndex={1}
        sx={{
          filter: "brightness(0.7)",
        }}
      >
        <BlockImage blockId={blockId} />
      </Box>
      <Box position="absolute" top="-10px" left="0" zIndex={2}>
        <BlockImage blockId={blockId} />
      </Box>
    </Stack>
  );
};

export default Block;
