import { atom } from "jotai";
import type { BlockBaseProps } from "../components/BlockBase";

// vh 단위 보정
export const vhAtom = atom(window.innerHeight * 0.01);

// 블록 큐
export const blockIdQueueAtom = atom<number[]>([0, 5, 8, 12, 11, 20, 23, 18]);

// 보드 그리드
export interface BoardGridProps extends BlockBaseProps {
  blockId?: number;
}

export const boardGridAtom = atom<BoardGridProps[][]>([]);

// 점수
export const scoreAtom = atom(0);
