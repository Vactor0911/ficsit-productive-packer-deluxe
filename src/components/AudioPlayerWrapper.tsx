import { useEffect, type ReactNode } from "react";
import { playMusic } from "../utils/audio";
import MainAudio from "../assets/audio/music_1.mp3";
import { useLocation } from "react-router-dom";

const AudioPlayerWrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  // 주소 변경시 배경 음악 재생
  useEffect(() => {
    // 현재 페이지가 game이라면 종료
    if (location.pathname.startsWith("/game")) {
      return;
    }
    playMusic(MainAudio);
  }, [location.pathname]);

  // 클릭시 게임 배경 음악 재생
  useEffect(() => {
    // 메인 페이지가 아니라면 종료
    if (location.pathname !== "/") {
      return;
    }

    // 첫 클릭 시 음악 재생
    const handleFirstClick = () => {
      playMusic(MainAudio);
      window.removeEventListener("click", handleFirstClick);
    };

    window.addEventListener("click", handleFirstClick);

    return () => window.removeEventListener("click", handleFirstClick);
  }, [location.pathname]);

  return <>{children}</>;
};

export default AudioPlayerWrapper;
