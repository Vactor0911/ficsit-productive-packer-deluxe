import { Box, Stack, Typography } from "@mui/material";
import Panel from "../components/Panel";
import Button from "../components/Button";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SendButton from "../components/SendButton";

const HowToPlay = () => {
  const navigate = useNavigate();

  const handleReturnButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Stack height="100vh" justifyContent="center" alignItems="center">
      <Panel
        color="#d1fec1"
        width="80%"
        maxWidth="800px"
        height="75%"
        position="relative"
      >
        <Box
          height="100%"
          sx={{
            overflowY: "auto",
          }}
        >
          <Stack padding="16px 8px" gap={1}>
            {/* 인사말 */}
            <Typography variant="h1" textAlign="center">
              FICSIT 생산 포장업체에 오신 것을 환영합니다!
            </Typography>
            <Typography variant="subtitle1">
              귀하는 당사의 존경받는 패키지 채우기 설계자 중 한 명으로 일할 수
              있는 기회를 얻은 행운의 FICSIT 직원입니다.
              <br />
              축하합니다!
              <br />
              <br />
              패키지 채우기 설계자는 할당 시간 동안 포장이 잘 된 패키지를 최대한
              많이 보내야 합니다.
            </Typography>

            {/* 플레이 방법 */}
            <Typography variant="h1" textAlign="center">
              플레이 방법
            </Typography>
            {/* TODO: 3가지 블록 컴포넌트 추가 */}
            <Typography variant="h2" textAlign="center">
              블록
            </Typography>
            <Typography variant="subtitle1" marginBottom="2em">
              보드에 블록을 올려 포장을 채우기 시작하세요. 패키지에 블록을 놓을
              때마다 패키지 포인트에 추가됩니다. 각 블록 오른쪽 아래 숫자는 해당
              블록이 제공하는 포인트를 나타냅니다.
            </Typography>

            {/* 채우기 보너스 */}
            {/* TODO: 채우기 보너스 컴포넌트 추가 */}
            <Typography variant="h1" textAlign="center">
              채우기 보너스
            </Typography>
            <Typography variant="subtitle1" marginBottom="2em">
              패키지가 가득 찰수록 채우기 보너스는 커집니다! 패키지 발송 시
              채우기 보너스가 패키지 포인트에 배율로 적용됩니다.
            </Typography>

            {/* 패키지 보내기 */}
            <Stack
              margin="0 25%"
              sx={{
                position: "relative",
                "&:after": {
                  content: "''",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  zIndex: 1,
                },
              }}
            >
              <SendButton />
            </Stack>
            <Typography variant="h1" textAlign="center">
              패키지 보내기
            </Typography>
            <Typography variant="subtitle1" marginBottom="2em">
              패키지에 더 이상 넣을 수 없는 경우 오른쪽 하단에 있는 보내기
              버튼을 누르면 됩니다. 그런 다음 패키지 포인트에 채우기 보너스가
              배로 붙으면서 총 포인트에 추가됩니다.
              <br />
              <br />
              할당 기간 동안 원하는 만큼 패키지를 보낼 수 있습니다!
            </Typography>

            {/* 보너스 타일 */}
            {/* TODO: 보너스 타일 컴포넌트 추가 */}
            <Typography variant="h1" textAlign="center">
              보너스 타일
            </Typography>
            <Typography variant="subtitle1" marginBottom="4em">
              때때로 패키지에 보너스 타일이 생성됩니다. 사라지기 전에 이 타일에
              블록을 떨어뜨리면 해당 블록이 보통 포인트의 4배를 얻게 됩니다!
            </Typography>
          </Stack>
        </Box>
        <Stack
          direction="row"
          position="absolute"
          bottom="-35px"
          left="0"
          width="100%"
          justifyContent="center"
        >
          <Button text="메뉴로 돌아가기" onClick={handleReturnButtonClick} />
        </Stack>
      </Panel>
    </Stack>
  );
};

export default HowToPlay;
