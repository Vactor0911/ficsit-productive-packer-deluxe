import styled from "styled-components";
import { color } from "../../../theme";
import {
  Level1,
  Level2,
  Level3,
  Level4,
  Level5,
  Level6,
} from "../../assets/images/levels";
import Button from "../Button";
import {
  audioButtonHoverAtom,
  audioGameStartAtom,
  gameDataAtom,
} from "../../state";
import { useAtom, useAtomValue } from "jotai";
import { playAudio } from "../../utils";

const Style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 60px 0;
  gap: 25px;

  .card {
    display: flex;
    width: 40%;
    padding: 5px;
    background-color: white;
    border: 2px solid black;
    box-shadow: 0 14px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .card * {
    z-index: 2;
  }

  .card:after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      -30deg,
      transparent 0%,
      transparent 30%,
      rgba(255, 255, 255, 0.25) 30%,
      rgba(255, 255, 255, 0.25) 70%,
      transparent 70%,
      transparent 100%
    );
    z-index: 1;
    opacity: 1;
  }

  .card:hover {
    background-color: #b6e5d5;
  }

  .card:hover:after {
    opacity: 1;
    animation: card-hover 0.3s linear;
  }

  .image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    padding: 10px;
  }

  .image-wrapper svg {
    height: 100%;
    aspect-ratio: 1/1;
  }

  .image-wrapper svg #border {
    stroke: black;
    stroke-width: 2px;
    vector-effect: non-scaling-stroke;
  }

  .image-wrapper svg #solid {
    display: none;
  }

  .container {
    display: flex;
    flex-direction: column;
  }

  #stars {
    -webkit-text-stroke: 2px black;
    paint-order: stroke fill;
    letter-spacing: 10px;
    color: ${color.orange};
  }

  #high-score {
    color: ${color.orange};
  }

  Button {
    margin-top: 50px;
  }

  @keyframes card-hover {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(200%);
    }
  }
`;

const Level = () => {
  // 게임 데이터
  const [, setGameData] = useAtom(gameDataAtom);

  const startGame = (levelNum: number) => {
    setGameData({ menu: "game", level: levelNum });
  };

  // 배경음
  const audioButtonHover = useAtomValue(audioButtonHoverAtom);
  const audioGameStart = useAtomValue(audioGameStartAtom);

  return (
    <Style>
      <div
        className="card"
        onClick={() => {
          startGame(1);
          playAudio(audioGameStart);
        }}
        onMouseEnter={() => {
          playAudio(audioButtonHover);
        }}
      >
        <div className="image-wrapper">
          <Level1 />
        </div>
        <div className="container">
          <h2>레벨 1</h2>
          <h2 id="stars">★★★</h2>
          <p>최고 점수:</p>
          <h2 id="high-score">John Doe: 1,234</h2>
        </div>
      </div>
      <div
        className="card"
        onClick={() => {
          startGame(2);
          playAudio(audioGameStart);
        }}
        onMouseEnter={() => {
          playAudio(audioButtonHover);
        }}
      >
        <div className="image-wrapper">
          <Level2 />
        </div>
        <div className="container">
          <h2>레벨 2</h2>
          <h2 id="stars">★★★</h2>
          <p>최고 점수:</p>
          <h2 id="high-score">John Doe: 1,234</h2>
        </div>
      </div>
      <div
        className="card"
        onClick={() => {
          startGame(3);
          playAudio(audioGameStart);
        }}
        onMouseEnter={() => {
          playAudio(audioButtonHover);
        }}
      >
        <div className="image-wrapper">
          <Level3 />
        </div>
        <div className="container">
          <h2>레벨 3</h2>
          <h2 id="stars">★★★</h2>
          <p>최고 점수:</p>
          <h2 id="high-score">John Doe: 1,234</h2>
        </div>
      </div>
      <div
        className="card"
        onClick={() => {
          startGame(4);
          playAudio(audioGameStart);
        }}
        onMouseEnter={() => {
          playAudio(audioButtonHover);
        }}
      >
        <div className="image-wrapper">
          <Level4 />
        </div>
        <div className="container">
          <h2>레벨 4</h2>
          <h2 id="stars">★★★</h2>
          <p>최고 점수:</p>
          <h2 id="high-score">John Doe: 1,234</h2>
        </div>
      </div>
      <div
        className="card"
        onClick={() => {
          startGame(5);
          playAudio(audioGameStart);
        }}
        onMouseEnter={() => {
          playAudio(audioButtonHover);
        }}
      >
        <div className="image-wrapper">
          <Level5 />
        </div>
        <div className="container">
          <h2>레벨 5</h2>
          <h2 id="stars">★★★</h2>
          <p>최고 점수:</p>
          <h2 id="high-score">John Doe: 1,234</h2>
        </div>
      </div>
      <div
        className="card"
        onClick={() => {
          startGame(6);
          playAudio(audioGameStart);
        }}
        onMouseEnter={() => {
          playAudio(audioButtonHover);
        }}
      >
        <div className="image-wrapper">
          <Level6 />
        </div>
        <div className="container">
          <h2>레벨 6</h2>
          <h2 id="stars">★★★</h2>
          <p>최고 점수:</p>
          <h2 id="high-score">John Doe: 1,234</h2>
        </div>
      </div>
      <Button
        text="메뉴로 돌아가기"
        onClick={() => setGameData({ menu: "home", level: -1 })}
      />
    </Style>
  );
};

export default Level;
