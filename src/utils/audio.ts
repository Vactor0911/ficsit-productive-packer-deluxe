// 배경음악 오디오
const musicAudios = [new Audio()];

// 효과음 오디오
const effectAudios = [
  new Audio(),
  new Audio(),
  new Audio(),
  new Audio(),
  new Audio(),
];

/**
 * 배경 음악을 재생하는 함수
 * @param src 음악 파일의 경로
 * @param volume 음악 볼륨 (기본값: 0.3)
 */
export const playMusic = (src: string, volume = 0.3, loop = true) => {
  // 이미 재생 중인 음악이면 무시
  if (musicAudios[0].src.endsWith(src) && !musicAudios[0].paused) {
    return;
  }

  // 새로운 오디오 객체 생성
  const newMusicAudio = new Audio(src);
  newMusicAudio.autoplay = true;
  newMusicAudio.loop = loop;
  newMusicAudio.volume = volume;
  newMusicAudio.play();

  // 새로운 음악을 맨 앞에 추가
  musicAudios.unshift(newMusicAudio);

  // 기존 음악 페이드아웃
  const prevAudio = musicAudios[1];
  const fadeOutInterval = setInterval(() => {
    if (prevAudio.volume > 0.1) {
      prevAudio.volume -= 0.05;
    } else {
      prevAudio.volume = 0;
      prevAudio.pause();
      musicAudios.pop();
      console.log("play music / pop:", musicAudios);
      clearInterval(fadeOutInterval);
    }
  }, 100);

  // 새로운 음악 페이드인
  newMusicAudio.volume = 0;
  const fadeInInterval = setInterval(() => {
    if (newMusicAudio.volume < volume - 0.1) {
      newMusicAudio.volume += 0.05;
    } else {
      newMusicAudio.volume = volume;
      clearInterval(fadeInInterval);
    }
  }, 100);

  console.log("play music:", src, musicAudios);
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
