import styled from "styled-components";
import { color } from "../../theme";

const Style = styled.button`
  text-align: center;
  font-weight: bold;
  font-size: 1.5em;
  color: white;
  border: 2px solid black;
  background-color: ${color.orange};
  padding: 14px;
  padding-bottom: 28px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 6px 1px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  #text {
    position: relative;
    -webkit-text-stroke: 2px black;
    z-index: 2;
  }

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 8px;
    bottom: -2px;
    left: -2px;
    background-color: rgba(120, 0, 0, 0.3);
    border: 2px solid black;
  }

  &:after {
    opacity: 0;
    content: "";
    position: absolute;
    width: 200%;
    height: calc(100% - 10px);
    top: 0;
    left: -100%;
    background: repeating-linear-gradient(
      -45deg,
      ${color.orange},
      ${color.orange} 15px,
      #f3d2c0 15px,
      #f3d2c0 30px
    );
    z-index: 1;
  }

  &:hover:after {
    opacity: 1;
    animation: btn-hover 5s infinite linear;
  }

  &:active {
    transform: translateY(6px);
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.3);
    margin-top: 6px;
    margin-bottom: 6px;
    padding-bottom: 16px;
  }
  &:active:before {
    height: 2px;
  }
  &:active:after {
    height: calc(100% - 4px);
  }

  @keyframes btn-hover {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(50%);
    }
  }
`;

type ButtonProps = {
  text: string;
};

const Button = ({text}: ButtonProps) => {
  return <Style>
    <h2 id="text">{text}</h2>
  </Style>;
};

export default Button;
