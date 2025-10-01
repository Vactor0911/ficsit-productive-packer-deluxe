import { atom } from "jotai";
import type { BlockBaseProps } from "../components/BlockBase";
import type { RefObject } from "react";

// vh 단위 보정
export const vhAtom = atom(window.innerHeight * 0.01);

// 블록 큐
export const blockIdQueueAtom = atom<number[]>([]);

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
export const fillingPercentageAtom = atom(0);
export const fillingBonusAtom = atom(1);

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
export const packageRefAtom = atom<RefObject<HTMLDivElement | null> | null>(null);

// 점수 이펙트 객체 배열
export const scoreEffectsAtom = atom<
  {
    score: number;
    x: number;
    y: number;
  }[]
>([]);

// 패키지 전송 여부
export const isPackageSendingAtom = atom(false);

// 게임 타이머
export const MAX_TIME = 90000; // ms 단위
export const timerAtom = atom(Date.now());

// 시간 초과 여부
export const isTimeOverAtom = atom(false);

// 배치한 블록 수
export const placedBlockCountAtom = atom(0);
// 보낸 패키지 수
export const sentPackageCountAtom = atom(0);
// 포장 최고 점수
export const bestPackageScoreAtom = atom(0);
// 최고 포장 패키지
export const bestFillingPercentageAtom = atom(0);
