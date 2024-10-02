import blockData from "../assets/blocks.json";
import * as Block from "../assets/images/blocks";

// 배경음
export const audioVolume = 0.2;

export const playAudio = (audio: HTMLAudioElement) => {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
};

// 패키지 블럭
type BlockType = {
  type: string;
  rotate: number;
  color: string;
  point: number;
  shape: Array<Array<number>>;
};

const getValidBlocks = () => {
  const blocks = blockData as BlockType[];
  const validBlocks = blocks.filter(
    (block) => block.type !== "" && block.point !== 0 && block.shape.length > 0
  );
  return validBlocks;
};

export const getBlockImg = (type: string) => {
  switch (type) {
    case "J":
      return Block.J;
    case "O":
      return Block.O;
    case "Z":
      return Block.Z;
  }
};

export const getBlockSize = (type: string) => {
  switch (type) {
    case "J":
      return [2, 3];
    case "O":
      return [2, 2];
    case "Z":
      return [3, 2];
  }
}

export const getBlock = (type: string, rotate: number) => {
  const validBlocks = getValidBlocks();
  const block = validBlocks.find(
    (block) => block.type === type && block.rotate === rotate
  );
  if (!block) {
    throw new Error(`Block not found: ${type}`);
  }
  return block;
};

export const getRandBlocks = (count: number = 1) => {
  const validBlocks = getValidBlocks();
  const result: BlockType[] = [];
  for (let i = 0; i < count; i++) {
    const rand = Math.floor(Math.random() * validBlocks.length);
    result.push(validBlocks[rand]);
  }
  return result;
};
