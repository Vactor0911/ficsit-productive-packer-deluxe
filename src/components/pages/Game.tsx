import styled from "styled-components";
import { useAtomValue } from "jotai";
import { audioBgmAtom, gameDataAtom } from "../../state";
import { useEffect, useState } from "react";
import { Music2 } from "../../assets/audio";
import { audioVolume } from "../../utils";

const Style = styled.div``;

const Game = () => {
  const level = useAtomValue(gameDataAtom).level;

  const audioBgm = useAtomValue(audioBgmAtom);

  const [audioBgmVolume, setAudioBgmVolume] = useState(0.05);
  useEffect(() => {
    audioBgm.src = Music2;
    audioBgm.currentTime = 0;
    audioBgm.volume = audioBgmVolume;
  }, [audioBgm]);

  useEffect(() => {
    const audioFadeIn = setInterval(() => {
      setAudioBgmVolume((v) => v + 0.01);
      audioBgm.volume = audioBgmVolume;
    }, 100);

    if (audioBgmVolume > audioVolume) {
      clearInterval(audioFadeIn);
    }

    // 클리너
    return () => clearInterval(audioFadeIn);
  }, [audioBgm, audioBgmVolume]);

  return (
    <Style>
      <h1>Game</h1>
      <p>게임 화면</p>
      <p>레벨: {level}</p>
    </Style>
  );
};

export default Game;
