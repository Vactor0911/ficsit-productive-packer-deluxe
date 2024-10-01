import styled from "styled-components";
import { BlockStyle, Button } from "../index";
import { useAtom } from "jotai";
import { gameDataAtom } from "../../state";
import { getBlock, getBlockImg, getBlockSize } from "../../utils";
import { useState } from "react";
import { BorderedTextStyle } from "../Styles";
import { color } from "../../../theme";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

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

  .os-scrollbar {
    --os-size: 10px;
    --os-handle-bg: white;
    --os-handle-border-radius: 2px;
    --os-handle-border: 1px solid #aaa;
  }

  #scroll-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 15px;
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
    min-width: 200px;
    align-self: center;
  }

  .block-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  #bonus-wrapper {
    border-radius: 50px;
    background-color: rgba(0, 0, 0, 0.25);
    align-self: center;
    width: 150px;
    height: 100px;
  }

  #bonus-wrapper > #bonus {
    color: ${color.orange};
    font-size: 3em;
  }
  #bonus-wrapper > #bonus:before {
    content: "x";
  }

  .margin-top {
    margin-top: 50px;
  }
`;

interface PackageBlockProps {
  rotate: number;
  color: string;
  shape: Array<Array<number>>;
  size: Array<number>;
}

const PackageBlockStyle = styled.div<PackageBlockProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color};
  stroke: black;
  stroke-width: 2px;
  vector-effect: non-scaling-stroke;
  width: 150px;
  height: 150px;

  svg {
    width: ${(props) => props.size[0] * 50}px;
    height: ${(props) => props.size[1] * 50}px;
    transform: rotate(${(props) => props.rotate * 90}deg);
  }

  #solid {
    transform: translate(
      ${(props) => {
        switch (props.rotate) {
          case 0:
            return "0, 8px";
          case 1:
            return "8px, 0";
          case 2:
            return "0, -8px";
          case 3:
            return "-8px, 0";
        }
      }}
    );
    filter: brightness(70%);
  }
`;

const HowToPlay = () => {
  const [, setGameData] = useAtom(gameDataAtom);
  const [blocks] = useState([
    getBlock("J", 2),
    getBlock("O", 0),
    getBlock("Z", 1),
  ]);

  return (
    <Style>
      <BlockStyle id="container" color="#d1fec1">
        <OverlayScrollbarsComponent id="scroll">
          <div id="scroll-container">
            <h1>
              <span className="bold">FICSIT</span> 생산 포장 업체에 오신 것을
              환영합니다!
            </h1>
            <p>
              귀하는 당사의 존경받는 패키지 채우기 설계자 중 한 명으로 일할 수
              있는 기회를 얻은 행운의 FICSIT 직원입니다. <br />
              축하합니다!
            </p>
            <p>
              패키지 채우기 설계자는 할당 시간 동안 포장이 잘 된 패키지를 최대한
              많이 보내야 합니다.
            </p>
            <h1>플레이 방법</h1>
            {/* 패키지 블록 */}
            <div className="block-wrapper">
              {blocks.map((block, index) => {
                const BlockImg = getBlockImg(block.type);
                return BlockImg ? (
                  <PackageBlockStyle
                    key={index}
                    rotate={block.rotate}
                    color={block.color}
                    shape={block.shape}
                    size={getBlockSize(block.type) || [1, 1]}
                  >
                    <BlockImg />
                  </PackageBlockStyle>
                ) : null;
              })}
            </div>
            <h2>블록</h2>
            <p>
              보드에 블록을 올려 포장을 채우기 시작하세요. 패키지에 블록을 놓을
              때마다 패키지 포인트에 추가됩니다. 각 블록 오른쪽 아래 숫자는 해당
              블록이 제공하는 포인트를 나타냅니다.
            </p>
            <div className="margin-top" id="bonus-wrapper">
              <BorderedTextStyle id="bonus">1</BorderedTextStyle>
            </div>
            {/* 채우기 보너스 */}
            <h2>채우기 보너스</h2>
            <p>
              패키지가 가득 찰수록 채우기 보너스는 커집니다! 패키지 발송 시
              채우기 보너스가 패키지 포인트에 배율로 적용됩니다.
            </p>
            <div id="button-wrapper">
              <Button text="보내기" id="btn-send" hasArrow={true} />
            </div>
            <h2>패키지 보내기</h2>
            <p>
              패키지에 더 이상 넣을 수 없는 경우 오른쪽 하단에 있는 보내기
              버튼을 누르면 됩니다. 그런 다음 패키지 포인트에 채우기 보너스가
              배로 붙으면서 총 포인트에 추가됩니다.
            </p>
            <p>할당 기간 동안 원하는 만큼 패키지를 보낼 수 있습니다!</p>
            {/* 보너스 타일 */}
            <h2>보너스 타일</h2>
            <p>
              때때로 패키지에 보너스 타일이 생성됩니다. 사라지기 전에 이 타일에
              블록을 떨어뜨리면 해당 블록이 보통 포인트의 4배를 얻게 됩니다!
            </p>
          </div>
        </OverlayScrollbarsComponent>
        <div id="button-wrapper">
          <Button
            text="메뉴로 돌아가기"
            onClick={() => setGameData({ menu: "home", level: -1 })}
          />
        </div>
      </BlockStyle>
    </Style>
  );
};

export default HowToPlay;
