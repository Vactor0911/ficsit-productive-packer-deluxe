import styled from "styled-components";
import { color } from "../../theme";

const Style = styled.button`
    text-align: center;
    font-weight: bold;
    font-size: 1.5em;
    color: white;
    border: 2px solid black;
    background-color: ${color.orange};
    padding: 10px;
    position: relative;
    cursor: pointer;

    &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 10%;
        bottom: calc(-10% - 4px);
        left: -2px;
        border: 2px solid black;
        background-color: ${color.orange};
    }
`;

const Button = () => {
  return <Style>Button</Style>;
};

export default Button;