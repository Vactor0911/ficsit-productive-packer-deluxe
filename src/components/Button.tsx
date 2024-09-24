import styled from "styled-components";
import { color } from "../../theme";

export const ButtonStyle = styled.button`
  justify-content: space-between;
  align-items: center;
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
  font-weight: bold;
  cursor: pointer;

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

  &:hover .arrow {
    animation: arrow-hover 1s infinite linear;
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

  &:hover:after {
    opacity: 1;
    animation: btn-hover 1.5s infinite linear;
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
  return (
      <ButtonStyle
        className={className}
        id={id}
        onClick={onClick}
        style={{
          display: hasArrow ? "flex" : "block",
        }}
      >
        <h2 className="text">{text}</h2>
        {hasArrow && <h2 className="text arrow">→</h2>}
      </ButtonStyle>
  );
};

export default Button;
