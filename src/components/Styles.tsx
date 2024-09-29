import styled from "styled-components";
import { color } from "../../theme";

interface BlockProps {
  color?: string;
  thick?: string;
}

export const BlockStyle = styled.div<BlockProps>`
  border: 2px solid black;
  background-color: ${(props) => (props.color ? props.color : "white")};
  position: relative;
  box-shadow: 0 ${(props) => (props.thick ? props.thick : "8px")} 0
    rgba(0, 0, 0, 0.2);
  padding-bottom: calc(${(props) => (props.thick ? props.thick : "8px")} + 4px);

  &:before {
    content: "";
    position: absolute;
    bottom: -2px;
    left: -2px;
    width: 100%;
    height: ${(props) => (props.thick ? props.thick : "8px")};
    border: 2px solid black;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const BoltStyle = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #737373;
  background: linear-gradient(
    45deg,
    #737373,
    #737373 43%,
    #555555 43%,
    #555555 57%,
    #737373 57%,
    #737373 100%
  );
  border: 2px solid black;
`;

const ScoreTextStyle = styled.h1`
  -webkit-text-stroke: 4px black;
  paint-order: stroke fill;
  letter-spacing: 0.1em;

  &:before {
    content: "";
    display: inline-block;
    color: rgba(0, 0, 0, 0);
    width: 0.8em;
    height: 0.8em;
    margin-right: 10px;
    background-color: ${color.orange};
    border: 2px solid black;
    border-radius: 50%;
    box-shadow: inset 0px 0 0 0.075em ${color.orange},
      inset 0px 0 0 0.1em #a25f27, 0 2px 0 -1px #975823, 0 3px 0 black;
  }
`;

export const ScoreText = (score: number = 0, textColor: string = "black") => {
  return <ScoreTextStyle style={{ color: textColor }}>{score}</ScoreTextStyle>;
};
