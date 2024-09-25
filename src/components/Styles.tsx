import styled from "styled-components";

interface BlockProps {
  color?: string;
  thick?: string;
}

export const Block = styled.div<BlockProps>`
  border: 2px solid black;
  background-color: ${(props) => (props.color ? props.color : "white")};
  position: relative;
  box-shadow: 0 ${(props) => (props.thick ? props.thick: "8px")} 0 rgba(0, 0, 0, 0.3);
  padding-bottom: calc(${(props) => (props.thick ? props.thick: "8px")} + 4px);

  &:before {
    content: "";
    position: absolute;
    bottom: -2px;
    left: -2px;
    width: 100%;
    height: ${(props) => (props.thick ? props.thick: "8px")};
    border: 2px solid black;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
