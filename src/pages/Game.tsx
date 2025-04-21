import { Box, Stack, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import Scoreboard from "../components/Scoreboard";
import Conveyor from "../components/Conveyor";
import BlockContainer from "../components/BlockContainer";
import MobileBlockContainer from "../components/MobileBlockContainer";
import { theme } from "../utils";
import BonusScoreContainer from "../components/BonusScoreContainer";
import SendButton from "../components/SendButton";
import Package from "../components/Package";
import Board from "../components/Board";
import Block from "../components/Block";
import { useAtomValue } from "jotai";
import { tileSizeAtom } from "../states";

const Game = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const level = Number(searchParams.get("level")) || 1; // 게임 레벨

  const tileSize = useAtomValue(tileSizeAtom);

  return (
    <Stack
      gap={1}
      minHeight="100vh"
      position="relative"
      overflow={{
        md: "hidden",
        sm: "auto",
      }}
    >
      {/* 점수판 */}
      <Stack
        width="90%"
        maxWidth="650px"
        marginTop={2}
        alignSelf="center"
        position="relative"
        zIndex={5}
      >
        <Scoreboard />
      </Stack>

      <Box
        height={{
          lg: "70vh",
          xs: "50vh",
        }}
        minHeight="300px"
        position="relative"
      >
        {/* 컨베이어 벨트 */}
        <Conveyor height="100%" />

        {/* 패키지 */}
        <Package>
          <Board level={level}>
            <Block
              blockId={2}
              tileSize={tileSize}
              position="absolute"
              top={`${tileSize * 0}px`}
              left={`${tileSize * 0}px`}
            />
            <Block
              blockId={18}
              tileSize={tileSize}
              position="absolute"
              top={`${tileSize * 0}px`}
              left={`${tileSize * 4}px`}
            />
            <Block
              blockId={15}
              tileSize={tileSize}
              position="absolute"
              top={`${tileSize * 1}px`}
              left={`${tileSize * 2}px`}
            />
            <Block
              blockId={19}
              tileSize={tileSize}
              position="absolute"
              top={`${tileSize * 2}px`}
              left={`${tileSize * 0}px`}
            />
            <Block
              blockId={23}
              tileSize={tileSize}
              position="absolute"
              top={`${tileSize * 3}px`}
              left={`${tileSize * 2}px`}
            />
            <Block
              blockId={22}
              tileSize={tileSize}
              position="absolute"
              top={`${tileSize * 5}px`}
              left={`${tileSize * 7}px`}
            />
            <Block
              blockId={20}
              tileSize={tileSize}
              position="absolute"
              top={`${tileSize * 5}px`}
              left={`${tileSize * 6}px`}
            />
          </Board>
        </Package>

        {/* PC, 태블릿용 블록 컨테이너 */}
        {useMediaQuery(theme.breakpoints.up("xs")) && <BlockContainer />}

        {/* PC용 보너스 점수 컨테이너 */}
        {useMediaQuery(theme.breakpoints.up("lg")) && (
          <Stack
            width="20vw"
            height="100%"
            top={0}
            right="2vw"
            justifyContent="space-between"
            padding="50px 0"
            position="absolute"
            zIndex={3}
          >
            <BonusScoreContainer />
            <SendButton />
          </Stack>
        )}
      </Box>

      {/* 모바일용 블록 컨테이너 */}
      {useMediaQuery(theme.breakpoints.only("xs")) && <MobileBlockContainer />}

      {/* 태블릿용 보너스 점수 컨테이너 */}
      {useMediaQuery(theme.breakpoints.down("lg")) && (
        <Stack
          margin={{
            xs: "-8px 0",
            sm: "30px 0",
          }}
          direction="row"
          width="100%"
          justifyContent="space-evenly"
          position="relative"
          zIndex={3}
        >
          <Box
            width="40%"
            display={{
              xs: "none",
              sm: "block",
            }}
          >
            <BonusScoreContainer />
          </Box>
          <Box
            width={{
              xs: "50%",
              sm: "40%",
            }}
          >
            <SendButton fullWidth />
          </Box>
        </Stack>
      )}
    </Stack>
  );
};

export default Game;
