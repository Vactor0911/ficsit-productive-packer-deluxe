import { atom } from "jotai";
import * as Music from "../assets/audio";
import { audioVolume } from "../utils";

// 게임 데이터
export const gameDataAtom = atom({
    menu: "home",
    level: -1,
});

// 배경음
const createAudio = (src: string, loop = false) => {
  const audio = new Audio(src);
  audio.volume = audioVolume;
  audio.loop = loop;
  return audio;
};

export const audioBgmAtom = atom(createAudio(Music.Music1, true));

export const audioButtonHoverAtom = atom(createAudio(Music.ButtonHover));
export const audioButtonClickAtom = atom(createAudio(Music.ButtonClick));

export const audioGameStartAtom = atom(createAudio(Music.GameStart));

// 패키지 블록
export const blockIndex = atom(1);