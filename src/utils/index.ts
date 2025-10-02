import { useEffect, useState } from "react";
import BlockData from "../assets/blocks.json";
import { LeaderBoard, type LeaderBoardData } from "../states";

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

/**
 * 게임 점수를 로컬 스토리지에 저장하는 함수
 * @param level 게임 레벨
 * @param score 점수
 * @param stars 별 개수
 */
export const saveScoreToLocalStorage = (
  level?: string,
  score?: number,
  stars?: number
) => {
  const levelNum = Number(level);

  // 파라미터 검증
  if (!levelNum || !score || !stars) {
    return;
  }

  const storedScores = localStorage.getItem(LeaderBoard);
  if (storedScores) {
    const scores = JSON.parse(storedScores) as LeaderBoardData[];

    if (scores[levelNum - 1]) {
      // 기존 점수보다 높을 때만 업데이트
      if (score > scores[levelNum - 1].maxScore) {
        scores[levelNum - 1] = { stars, maxScore: score };
        localStorage.setItem(LeaderBoard, JSON.stringify(scores));
      }
    }
  } else {
    const scores: LeaderBoardData[] = Array(6).fill({
      stars: 0,
      maxScore: 0,
    });
    scores[levelNum - 1] = { stars, maxScore: score };
    localStorage.setItem(LeaderBoard, JSON.stringify(scores));
  }
};
