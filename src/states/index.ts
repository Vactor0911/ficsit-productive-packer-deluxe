import { atom } from "jotai";

// 게임 남은 시간
export const timeLeftAtom = atom(95);

// 게임 최대 시간
export const maxTimeAtom = atom(95);

// 게임 점수
export const scoreAtom = atom(0);

// 블록 저장
export const blocksAtom = atom([]);