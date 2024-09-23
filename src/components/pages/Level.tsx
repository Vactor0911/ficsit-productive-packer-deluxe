import styled from "styled-components";
import { color } from "../../../theme";
import { useContext } from "react";
import { LevelContext, MenuContext } from "../../App";
import {
  Level1,
  Level2,
  Level3,
  Level4,
  Level5,
  Level6,
} from "../../assets/images";
import Button from "../Button";

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
    box-shadow: 0 14px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  .image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    padding: 10px;
  }

  .image-wrapper img {
    width: 100%;
    aspect-ratio: 1/1;
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
`;

const Level = () => {
  const menuContext = useContext(MenuContext);
  if (!menuContext) {
    throw new Error("MenuContext is null");
  }
  const { setMenu } = menuContext;

  const levelContext = useContext(LevelContext);
  if (!levelContext) {
    throw new Error("LevelContext is null");
  }
  const { setLevel } = levelContext;

  const startGame = (level: number) => {
    setMenu("game");
    setLevel(level);
  }

  return (
    <Style>
      <div className="card" onClick={() => startGame(1)}>
        <div className="image-wrapper">
          <img src={Level1} alt="level1" />
        </div>
        <div className="container">
          <h2>레벨 1</h2>
          <h2 id="stars">★★★</h2>
          <p>최고 점수:</p>
          <h2 id="high-score">John Doe: 1,234</h2>
        </div>
      </div>
      <div className="card" onClick={() => startGame(2)}>
        <div className="image-wrapper">
          <img src={Level2} alt="level1" />
        </div>
        <div className="container">
          <h2>레벨 2</h2>
          <h2 id="stars">★★★</h2>
          <p>최고 점수:</p>
          <h2 id="high-score">John Doe: 1,234</h2>
        </div>
      </div>
      <div className="card" onClick={() => startGame(3)}>
        <div className="image-wrapper">
          <img src={Level3} alt="level1" />
        </div>
        <div className="container">
          <h2>레벨 3</h2>
          <h2 id="stars">★★★</h2>
          <p>최고 점수:</p>
          <h2 id="high-score">John Doe: 1,234</h2>
        </div>
      </div>
      <div className="card" onClick={() => startGame(4)}>
        <div className="image-wrapper">
          <img src={Level4} alt="level1" />
        </div>
        <div className="container">
          <h2>레벨 4</h2>
          <h2 id="stars">★★★</h2>
          <p>최고 점수:</p>
          <h2 id="high-score">John Doe: 1,234</h2>
        </div>
      </div>
      <div className="card" onClick={() => startGame(5)}>
        <div className="image-wrapper">
          <img src={Level5} alt="level1" />
        </div>
        <div className="container">
          <h2>레벨 5</h2>
          <h2 id="stars">★★★</h2>
          <p>최고 점수:</p>
          <h2 id="high-score">John Doe: 1,234</h2>
        </div>
      </div>
      <div className="card" onClick={() => startGame(6)}>
        <div className="image-wrapper">
          <img src={Level6} alt="level1" />
        </div>
        <div className="container">
          <h2>레벨 6</h2>
          <h2 id="stars">★★★</h2>
          <p>최고 점수:</p>
          <h2 id="high-score">John Doe: 1,234</h2>
        </div>
      </div>
      <Button text="메뉴로 돌아가기" onClick={() => setMenu("home")} />
    </Style>
  );
};

export default Level;
