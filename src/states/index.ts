import { atom } from "jotai";

// vh 단위 보정
export const vhAtom = atom(window.innerHeight * 0.01);

// 블록 큐
export const blockIdQueueAtom = atom<number[]>([0, 5, 8, 12, 11, 20, 23, 18]);
