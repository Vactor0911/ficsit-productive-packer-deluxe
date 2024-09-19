import styled from "styled-components";
import Logo from "./assets/game-logo.png";
import { color } from "../theme";
import Button from "./components/Button";

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 20px;
  background-color: ${color.green};

  #logo {
    width: 30vw;
    animation: logo-tilt 4s infinite ease-out;
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

function App() {
  return (
    <Style>
      <img src={Logo} alt="logo" id="logo" />
      <Button />
      <Button />
    </Style>
  );
}

export default App;
