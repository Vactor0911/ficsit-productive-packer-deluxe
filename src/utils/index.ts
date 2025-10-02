import { useEffect, useState } from "react";
import BlockData from "../assets/blocks.json";

/**
 * 숫자 혹은 문자열 형태의 값을 px 단위로 변환하는 함수
 * @param value px로 변환할 값
 * @returns px 단위로 변환된 문자열
 */
export const calculatePixel = (value: number | string) => {
  if (typeof value === "number") {
    return `${value * 8}px`;
  }
  return value;
};

/**
 * 현재 화면이 모바일 환경에서 가로 모드인지 여부를 반환하는 훅
 * @returns 현재 화면이 모바일 환경에서 가로 모드인지 여부
 */
export const useIsMobileLandscape = () => {
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileLandscape(
        window.innerHeight < window.innerWidth * 0.6 && window.innerWidth < 1200
      );
    };

    handleResize(); // 초기 상태 설정
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobileLandscape;
};

/**
 * 랜덤 블록 ID를 반환하는 함수
 * @returns 랜덤 블록 ID
 */
export const getRandBlockId = () => {
  const blockIds = BlockData.map((block) => block.id);
  const randomIndex = Math.floor(Math.random() * blockIds.length);

  return blockIds[randomIndex];
};
