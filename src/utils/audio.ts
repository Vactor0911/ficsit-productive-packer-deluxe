import MainAudio from "../assets/audio/music_1.mp3";

// 배경음악 오디오
export const musicAudio = new Audio(MainAudio);
// musicAudio.autoplay = true;
musicAudio.loop = true;
musicAudio.volume = 0.3;
// musicAudio.play();

// 효과음 오디오
export const effectAudios = [
  new Audio(),
  new Audio(),
  new Audio(),
  new Audio(),
  new Audio(),
];
