import { atom } from "jotai";

// vh 단위 보정
export const vhAtom = atom(window.innerHeight * 0.01);
