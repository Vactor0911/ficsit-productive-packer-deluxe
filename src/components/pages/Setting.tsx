import styled from "styled-components";
import { Block, Button } from "../index";
import { useAtom } from "jotai";
import { gameDataAtom } from "../../state";

const Style = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  #container {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 80%;
    position: relative;
    padding: 20px;
    padding-bottom: 60px;
  }

  #scroll-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
    padding-bottom: 50px;
  }

  #container > #button-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    transform: translateY(50%);
  }

  h1,
  h2 {
    text-align: center;
  }

  #scroll-container > #button-wrapper {
    display: flex;
    justify-content: center;
  }

  #btn-send {
    width: 50%;
    align-self: center;
  }
`;

const HowToPlay = () => {
  const [, setGameData] = useAtom(gameDataAtom);

  return (
    <Style>
      <Block id="container" color="#d1fec1">
        <div id="scroll-container">
          <h1>게임 설정</h1>
        </div>

        <div id="button-wrapper">
          <Button text="메뉴로 돌아가기" onClick={() => setGameData({ menu: "home", level: -1 })} />
        </div>
      </Block>
    </Style>
  );
};

export default HowToPlay;
