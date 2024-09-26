// 배경음
export const audioVolume = 0.2;

export const playAudio = (audio: HTMLAudioElement) => {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
};