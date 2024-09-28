import styled from "styled-components";
import { useAtomValue } from "jotai";
import { audioBgmAtom, gameDataAtom } from "../../state";
import { useEffect, useState } from "react";
import { Music2 } from "../../assets/audio";
import { audioVolume } from "../../utils";
import { BlockStyle, BoltStyle } from "../Styles";
import * as Level from "../../assets/images";
import Button from "../Button";

const Style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;

  .scoreboard {
    display: flex;
    width: 40%;
    min-width: 400px;
    height: 17%;
    margin-top: 20px;
  }

  .conveyor {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100vw;
    height: 75%;
    margin-bottom: 40px;
  }

  .conveyor .wall {
    width: 100%;
    height: 4vh;
  }

  .conveyor .belt {
    display: flex;
    flex: 1;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: #4d4d4d;
  }

  .belt .box,
  .belt .box2 {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .belt .box {
    width: 40vw;
    height: 63vh;
    transform: translateY(-1vh);
  }

  .belt .box2 {
    width: 98%;
    height: 98%;
    transform: rotate(180deg);
    box-shadow: none;
  }

  .belt .box:before,
  .belt .box2:before {
    background-color: #8d5b1d;
  }

  .belt .box2:before {
    box-shadow: 0 -22px 0 rgba(0, 0, 0, 0.2);
  }

  .belt .box:after {
    content: "FICSIT PACKAGE";
    font-family: "Libre Barcode 39 Text", system-ui;
    font-size: 0.5em;
    position: absolute;
    background-color: white;
    padding: 2px;
    border: 2px solid black;
    bottom: 2px;
    right: 8px;
    height: 0.6em;
    overflow: hidden;
  }

  .belt .box2:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    top: calc(50% - 14px);
    background-color: #8d5b1d;
  }

  .box2 svg {
    height: 102%;
    transform: translateY(8px) rotate(180deg);
    z-index: 1;
  }

  .box2 svg #border,
  .box2 svg #solid {
    stroke: black;
    stroke-width: 2px;
    vector-effect: non-scaling-stroke;
    filter: brightness(70%);
  }

  .container {
    display: flex;
    min-width: 20vw;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 100;
  }

  .container.left {
    background-color: #666666;
    left: 0;
    border: 2px solid black;
    border-bottom: none;
  }

  .container.left .bolt {
    position: absolute;
    right: 10px;
  }

  .container.left .bolt:nth-child(1) {
    top: 10px;
  }
  .container.left .bolt:nth-child(2) {
    bottom: calc(4vh + 10px);
  }

  .container.left .frame {
    position: absolute;
    width: 100%;
    left: 0;
  }

  .container.left .frame:nth-child(3),
  .container.left .frame:nth-child(5) {
    background-color: #4d4d4d;
    left: -2px;
    width: calc(100% + 4px);
    border: 2px solid black;
  }
  .container.left .frame:nth-child(3) {
    height: 2.5vh;
    top: -2.5vh;
  }
  .container.left .frame:nth-child(4) {
    height: 4vh;
    background-color: #999999;
    bottom: 0;
    border-top: 2px solid black;
  }
  .container.left .frame:nth-child(5) {
    bottom: -40px;
    height: 40px;
  }

  .container.left:before {
    content: "";
    position: absolute;
    width: 20px;
    height: 100%;
    top: 0;
    right: -24px;
    border: 2px solid black;
    background-color: #333333;
    box-shadow: inset 10px 0 0 rgba(0, 0, 0, 0.3);
  }
  .container.left .frame:before {
    content: "";
    position: absolute;
    width: 20px;
    height: 100%;
    top: -15px;
    right: -24px;
    border: 2px solid black;
    background-color: inherit;
    box-shadow: inset 10px 0 0 rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  .container.left .frame:nth-child(3):before,
  .container.left .frame:nth-child(5):before {
    background-color: #1a1a1a;
  }
  .container.left .frame:nth-child(3):before {
    top: 15px;
  }

  .container.right {
    justify-content: flex-start;
    right: 0;
  }

  .container.right #wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }

  .bonus-score {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 24px;
    padding-bottom: 34px;
    color: white;
    position: relative;
  }

  .bonus-score span.bolt {
    position: absolute;
    z-index: 1;
  }

  .bonus-score span.bolt:nth-child(1) {
    top: 10px;
    left: 8px;
  }
  .bonus-score span.bolt:nth-child(2) {
    top: 10px;
    right: 8px;
  }
  .bonus-score span.bolt:nth-child(3) {
    bottom: 20px;
    left: 8px;
  }
  .bonus-score span.bolt:nth-child(4) {
    bottom: 20px;
    right: 8px;
  }
`;

const Game = () => {
  const level = useAtomValue(gameDataAtom).level;

  const audioBgm = useAtomValue(audioBgmAtom);

  const [audioBgmVolume, setAudioBgmVolume] = useState(0.05);
  useEffect(() => {
    audioBgm.src = Music2;
    audioBgm.currentTime = 0;
    audioBgm.volume = audioBgmVolume;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // 게임 레벨
  const getPackage = (level: number) => {
    switch (level) {
      case 1:
        return <Level.Level1 height="0" />;
      case 2:
        return <Level.Level2 height="0" />;
      case 3:
        return <Level.Level3 height="0" />;
      case 4:
        return <Level.Level4 height="0" />;
      case 5:
        return <Level.Level5 height="0" />;
      case 6:
        return <Level.Level6 height="0" />;
      default:
        return null;
    }
  };

  return (
    <Style>
      <BlockStyle className="scoreboard">
        <div id="timer"></div>
        <div id="score">
          <h1>0</h1>
        </div>
      </BlockStyle>
      <div className="conveyor">
        <BlockStyle className="wall" thick="2.5vh" />
        <div className="belt">
          {/* 패키지 박스 */}
          <BlockStyle className="box" color="#e5b065" thick="20px">
            <BlockStyle className="box2" color="#e5b065" thick="20px">
              {getPackage(level)}
            </BlockStyle>
          </BlockStyle>
        </div>
        <BlockStyle className="wall" thick="2.5vh" />

        {/* 왼쪽 컨테이너 */}
        <div className="container left">
          <BoltStyle className="bolt" />
          <BoltStyle className="bolt" />
          <span className="frame" />
          <span className="frame" />
          <span className="frame" />
        </div>

        {/* 오른쪽 컨테이너 */}
        <div className="container right">
          <div id="wrapper">
            <BlockStyle className="bonus-score" color="#5ba6c5">
              <BoltStyle className="bolt" />
              <BoltStyle className="bolt" />
              <BoltStyle className="bolt" />
              <BoltStyle className="bolt" />

              <p>포장 점수:</p>
              <p>채우기 보너스:</p>
              <p>최종 배달 점수:</p>
            </BlockStyle>
            <Button text="보내기" hasArrow={true} />
          </div>
        </div>
      </div>
    </Style>
  );
};

export default Game;
