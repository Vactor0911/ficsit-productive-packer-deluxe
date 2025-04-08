import { Box, Stack } from "@mui/material";

interface BlockImageProps {
  type: string;
  color: string;
}

const BlockImage = (props: BlockImageProps) => {
  const { type, color } = props;
  let svg = "";

  switch (type) {
    case "L":
      svg = `
        <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0 L8 0 L8 4 L4 4 L4 12 L0 12 z" fill="${color}" />
        </svg>`;
      break;
  }
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const Block = () => {
  return (
    <Stack position="relative">
      <Box
        component="img"
        src={BlockImage({ type: "L", color: "red" })}
        alt="Block"
        sx={{
          filter: "grayscale(0.3)",
        }}
      />
      <Box
        component="img"
        src={BlockImage({ type: "L", color: "red" })}
        alt="Block"
        position="absolute"
        width="100%"
        height="100%"
        content='""'
        top="-10px"
        left="0"
      />
    </Stack>
  );
};

export default Block;
