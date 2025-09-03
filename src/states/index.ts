import { atom } from "jotai";
import type { BlockBaseProps } from "../components/BlockBase";

// vh 단위 보정
export const vhAtom = atom(window.innerHeight * 0.01);

// 블록 큐
export const blockIdQueueAtom = atom<number[]>([0, 5, 8, 12, 11, 20, 23, 18]);

// 보드 위치
export const boardPositionRefAtom = atom<SVGRectElement | null>(null);

// 보드 그리드
export interface BoardGridProps extends BlockBaseProps {
  blockId?: number;
}
export const boardGridAtom = atom<BoardGridProps[][]>([]);

// 보드 그리드 크기
export const boardGridSizeAtom = atom(0);

// 점수
export const scoreAtom = atom(0);

// 포장 점수
export const packageScoreAtom = atom(0);

// 채우기 보너스
export const fillingBonusAtom = atom(1000); // 소숫점 계산을 위해 1000배로 저장

// 드래그 블럭 고스트 위치
export const draggableBlockGhostAtom = atom<{
  id: number | null;
  x: number;
  y: number;
}>({
  id: null,
  x: 0,
  y: 0,
});

// 드래그 스냅 포인트
export const dragSnapPointAtom = atom<{
  x: number;
  y: number;
  isValid: boolean;
} | null>(null);

// 패키지 객체
export const packageRefAtom = atom<HTMLDivElement | null>(null);

// 점수 이펙트 객체 배열
export const scoreEffectsAtom = atom<
  {
    score: number;
    x: number;
    y: number;
  }[]
>([]);
