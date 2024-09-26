import styled from "styled-components";
import Logo from "../../assets/images/game-logo.png";
import Button from "../Button";
import { gameDataAtom } from "../../state";
import { useAtom } from "jotai";

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  height: 100vh;
  padding: 20px;

  #logo {
    width: 30vw;
    animation: logo-tilt 4s infinite ease-out;
    margin-bottom: 20px;
  }

  #float-container {
    display: flex;
    flex-direction: column;
    justify-content: end;
    position: absolute;
    bottom: 40px;
    right: 40px;
    gap: 20px;
  }

  #float-container * {
    margin-left: auto;
  }

  @keyframes logo-tilt {
    from {
      transform: rotate(10deg);
    }
    50% {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(10deg);
    }
  }
`;

const Home = () => {
  const [, setGameData] = useAtom(gameDataAtom);

  const setMenu = (menuName: string) => {
    setGameData({menu: menuName, level: -1})
  }

  return (
    <Style>
      <img src={Logo} alt="logo" id="logo" />
      <Button
        text="게임 시작"
        onClick={() => {
          setMenu("level");
        }}
      />
      <Button
        text="플레이 방법"
        onClick={() => {
          setMenu("how-to-play");
        }}
      />

      <div id="float-container">
        <Button
          text="게임 설정"
          onClick={() => {
            setMenu("setting");
          }}
        />
        <Button
          text="Github 방문하기"
          onClick={() => {
            window.open(
              "https://github.com/Vactor0911/ficsit-productive-packer-deluxe",
              "_blank"
            );
          }}
        />
      </div>
    </Style>
  );
};

export default Home;
