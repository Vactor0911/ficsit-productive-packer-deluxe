import styled from "styled-components";
import { color } from "../../theme";
import { BlockStyle } from "./Styles";
import { playAudio } from "../utils";
import { useAtomValue } from "jotai";
import { audioButtonClickAtom, audioButtonHoverAtom } from "../state";

export const ButtonStyle = styled.button`
  display: flex;
  align-items: flex-end;
  background: rgba(0, 0, 0, 0);
  border: none;
  color: white;
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  position: relative;
  cursor: pointer;

  #btn-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 14px;
    padding-bottom: 26px;
    overflow: hidden;
  }

  .text {
    position: relative;
    -webkit-text-stroke: 5px black;
    paint-order: stroke fill;
    text-shadow: 4px 4px rgba(0, 0, 0, 0.3);
    z-index: 2;
  }

  .arrow {
    margin-right: 20px;
  }

  #btn-container:after {
    opacity: 0;
    content: "";
    position: absolute;
    width: calc(100% + 75px);
    height: calc(100% - 10px);
    top: 0;
    left: -75px;
    background: repeating-linear-gradient(
      -45deg,
      ${color.orange},
      ${color.orange} 25px,
      #f3d2c0 25px,
      #f3d2c0 50px
    );
    z-index: 1;
  }

  &:hover #btn-container:after,
  &:active #btn-container:after {
    opacity: 1;
    animation: btn-hover 1.5s infinite linear;
  }

  &:hover .arrow,
  &:active .arrow {
    animation: arrow-hover 1s infinite linear;
  }

  &:active #btn-container {
    margin-top: 6px;
    padding-bottom: 20px;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.3);
  }

  &:active #btn-container:before {
    height: 2px;
  }

  &:active #btn-container:after {
    height: calc(100% - 4px);
  }

  @keyframes btn-hover {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(73px);
    }
  }

  @keyframes arrow-hover {
    from {
      transform: translateX(0);
    }
    50% {
      transform: translateX(20px);
    }
    to {
      transform: translateX(0);
    }
  }
`;

type ButtonProps = {
  className?: string;
  id?: string;
  text: string;
  onClick?: () => void;
  hasArrow?: boolean;
};

const Button = ({
  className,
  id,
  text,
  onClick,
  hasArrow = false,
}: ButtonProps) => {
  const audioButtonHover = useAtomValue(audioButtonHoverAtom);
  const audioButtonClick = useAtomValue(audioButtonClickAtom);

  return (
    <ButtonStyle
      className={className}
      id={id}
      onClick={() => {
        if (onClick) {
          onClick();
          playAudio(audioButtonClick);
        }
      }}
      onMouseEnter={() => {
        playAudio(audioButtonHover);
      }}
    >
      <BlockStyle
        id="btn-container"
        color={color.orange}
        style={{
          gap: hasArrow ? "20px" : "0",
        }}
      >
        <h1 className="text">{text}</h1>
        {hasArrow && <h2 className="text arrow">→</h2>}
      </BlockStyle>
    </ButtonStyle>
  );
};

export default Button;
