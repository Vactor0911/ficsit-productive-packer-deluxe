import {
  Box,
  Container,
  keyframes,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import Panel from "../components/Panel";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";
import { useIsMobileLandscape } from "../utils";
import {
  placedBlockCountAtom,
  sentPackageCountAtom,
  bestPackageScoreAtom,
  bestFillingPercentageAtom,
} from "../states";
import { useAtomValue } from "jotai";
import BoardData from "../assets/boards.json";
import Button from "../components/Button";
import Bolt from "../components/Bolt";
import { useGame } from "../hooks";
import { theme } from "../utils/theme";

// 별 점등 애니메이션
const StarLightUpAnimation = keyframes`
  0% {
    color: ${theme.palette.text.secondary};
  }
  100% {
    color: ${theme.palette.primary.main};
  }
`;

// 텍스트 점등 애니메이션
const TextLightUpAnimation = keyframes`
  0% {
    color: ${theme.palette.text.secondary};
  }
  100% {
    color: white;
  }
`;

// 슬라이딩 애니메이션 (좌측)
const SlideLeftAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateX(1em);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// 슬라이딩 애니메이션 (우측)
const SlideRightAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-1em);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

interface GameOverViewProps {
  show: boolean;
}

const ANIMATION_DELAY = 1.5;

const GameOverView = (props: GameOverViewProps) => {
  const { show } = props;

  const theme = useTheme();
  const navigate = useNavigate();
  const { level, getStarLevel } = useGame();

  const isMobileLandscape = useIsMobileLandscape();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const placedBlockCount = useAtomValue(placedBlockCountAtom);
  const sentPackageCount = useAtomValue(sentPackageCountAtom);
  const bestPackageScore = useAtomValue(bestPackageScoreAtom);
  const bestFillingBonus = useAtomValue(bestFillingPercentageAtom);

  // 현재 레벨의 별점
  const starPoints = useMemo(() => {
    const board = BoardData.find((board) => board.level === Number(level));
    return board ? board.stars : [0, 0, 0];
  }, [level]);

  // 메뉴로 돌아가기 버튼 클릭
  const handleMenuButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Stack width="100%" alignItems="center" marginTop={3}>
      {/* 최종 점수 */}
      <Container
        maxWidth={isMobileLandscape ? "xs" : "md"}
        sx={{
          maxWidth: isMobileLandscape ? "auto" : "800px !important",
        }}
      >
        <Panel backgroundColor="#d1fec1">
          <Stack>
            {/* 별점 컨테이너 */}
            <Stack
              direction="row"
              justifyContent="center"
              gap={5}
              padding={
                isMobileLandscape
                  ? 1
                  : {
                      xs: 2,
                      sm: 4,
                    }
              }
            >
              {starPoints.map((points, index) => (
                <Stack key={index} alignItems="center">
                  <StarTwoToneIcon
                    sx={{
                      fontSize: isMobileLandscape
                        ? "2rem"
                        : {
                            xs: "3.5rem",
                            sm: "5rem",
                          },
                      animation: show
                        ? getStarLevel() > index
                          ? `${StarLightUpAnimation} 0.25s ease-out ${
                              index * 0.5 + ANIMATION_DELAY
                            }s forwards`
                          : "none"
                        : "none",
                    }}
                  />
                  <Typography
                    variant={
                      isMobileLandscape ? "subtitle1" : isXs ? "h5" : "h4"
                    }
                    color="#666666"
                    sx={{
                      WebkitTextStroke: "4px black",
                      paintOrder: "stroke fill",
                      textShadow: "0.1em 0.1em 0 rgba(0, 0, 0, 0.25)",
                      animation: show
                        ? getStarLevel() > index
                          ? `${TextLightUpAnimation} 0.25s ease-out ${
                              index * 0.5 + ANIMATION_DELAY
                            }s forwards`
                          : "none"
                        : "none",
                    }}
                  >
                    {points}
                  </Typography>
                </Stack>
              ))}
            </Stack>

            {/* 구분선 */}
            <Box height="2px" bgcolor="#6ecf76" />

            {/* 점수 컨테이너 */}
            <Stack
              gap={
                isMobileLandscape
                  ? 0
                  : {
                      xs: 1,
                      md: 2,
                    }
              }
              position="relative"
              padding={isMobileLandscape ? 3 : 5}
              sx={{
                "& .MuiTypography-root.outlined": {
                  color: "white",
                  WebkitTextStroke: "4px black",
                  paintOrder: "stroke fill",
                  textShadow: "0.1em 0.1em 0 rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              {/* 볼트 장식 */}
              <Bolt top={8} left={8} />
              <Bolt top={8} right={8} />
              <Bolt bottom={8} left={8} />
              <Bolt bottom={8} right={8} />

              {[
                ["배치한 블록:", placedBlockCount],
                ["보낸 패키지:", sentPackageCount],
                ["포장 최고 점수:", bestPackageScore],
                ["최고 포장 패키지:", `${Math.floor(bestFillingBonus)}%`],
              ].map(([label, value], index) => (
                <Stack
                  key={`game-result-${index}`}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography
                    variant={isMobileLandscape ? "subtitle2" : "h5"}
                    sx={{
                      opacity: 0,
                      animation: show
                        ? `${SlideRightAnimation} 0.2s ease-out ${
                            index * 0.15 + ANIMATION_DELAY
                          }s forwards`
                        : "none",
                    }}
                  >
                    {label}
                  </Typography>
                  <Typography
                    className="outlined"
                    variant={isMobileLandscape ? "subtitle1" : "h4"}
                    sx={{
                      opacity: 0,
                      animation: show
                        ? `${SlideLeftAnimation} 0.2s ease-out ${
                            index * 0.15 + ANIMATION_DELAY
                          }s forwards`
                        : "none",
                    }}
                  >
                    {value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Panel>
      </Container>

      {/* 메뉴로 돌아가기 버튼 */}
      <Box marginY={7}>
        <Button onClick={handleMenuButtonClick}>
          <Typography variant="h4" color="white">
            메뉴로 돌아가기
          </Typography>
        </Button>
      </Box>
    </Stack>
  );
};

export default GameOverView;
