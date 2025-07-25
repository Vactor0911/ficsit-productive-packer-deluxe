import { useEffect, useState } from "react";
import { effectAudios, musicAudio } from "./audio";

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
 * 배경 음악을 재생하는 함수
 * @param src 음악 파일의 경로
 * @param volume 음악 볼륨 (기본값: 0.3)
 */
export const playMusic = (src: string, volume = 0.3) => {
  musicAudio.src = src;
  musicAudio.volume = volume;
  musicAudio.play();
};

/**
 * 효과음을 재생하는 함수
 * @param src 효과음 파일의 경로
 * @param volume 효과음 볼륨 (기본값: 0.3)
 */
export const playEffect = (src: string, volume = 0.3) => {
  for (const audio of effectAudios) {
    if (audio.paused) {
      audio.src = src;
      audio.volume = volume;
      audio.play();
      break;
    }
  }
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
        window.innerHeight < (window.innerWidth * 0.75) && window.innerWidth < 768
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
