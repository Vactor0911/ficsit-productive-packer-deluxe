import { Box, Container, Stack, Typography } from "@mui/material";
import Panel from "../components/Panel";
import StyledOverlayScrollbarsComponent from "../components/StyledOverlayScrollbarsComponent";
import Button from "../components/Button";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const HowToPlay = () => {
  const navigate = useNavigate();

  const handleBackToMenuButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Container maxWidth="md">
      <Stack
        height="100vh"
        paddingY={{
          xs: 4,
          md: 10,
        }}
        paddingBottom={{
          xs: 10,
        }}
      >
        <Panel
          backgroundColor="#d1fec1"
          height="100%"
          padding={2}
          position="relative"
        >
          {/* 플레이 방법 */}
          <StyledOverlayScrollbarsComponent defer>
            <Stack
              paddingRight={2}
              paddingY={{
                xs: 0,
                md: 6,
              }}
              paddingBottom={{
                xs: 6,
              }}
              gap={3}
            >
              {/* 헤더 */}
              <Typography variant="h4" textAlign="center">
                FICSIT 생산 포장업체에 오신 것을 환영합니다!
              </Typography>
              <Typography variant="subtitle1">
                귀하는 당사의 존경받는 패키지 채우기 설계자 중 한 명으로 일할 수
                있는 기회를 얻은 행운의 FICSIT 직원입니다. 축하합니다!
              </Typography>
              <Typography variant="subtitle1">
                패키지 채우기 설계자는 할당 시간 동안 포장이 잘 된 패키지를
                최대한 많이 보내야 합니다.
              </Typography>

              {/* 플레이 방법 */}
              <Typography variant="h4" textAlign="center">
                플레이 방법
              </Typography>

              {/* 블록 */}
              <Stack direction="row" gap={2} justifyContent="center">
                {/* TODO: 블록 추가 */}
                <Box height="80px" />
              </Stack>
              <Typography variant="h4" textAlign="center">
                블록
              </Typography>
              <Typography variant="subtitle1">
                보드에 블록을 올려 포장을 채우기 시작하세요. 패키지에 블록을
                놓을 때마다 패키지 포인트에 추가됩니다. 각 블록 오른쪽 아래
                숫자는 해당 블록이 제공하는 포인트를 나타냅니다.
              </Typography>

              {/* 채우기 보너스 */}
              {/* TODO: 채우기 보너스 컴포넌트 추가 */}
              <Box height="50px" />
              <Typography variant="h4" textAlign="center">
                채우기 보너스
              </Typography>
              <Typography variant="subtitle1">
                패키지가 가득 찰수록 채우기 보너스는 커집니다! 패키지 발송 시
                채우기 보너스가 패키지 포인트에 배율로 적용됩니다.
              </Typography>

              {/* 패키지 보내기 */}
              <Box height="50px" />
              <Typography variant="h4" textAlign="center">
                패키지 보내기
              </Typography>
              <Typography variant="subtitle1">
                패키지에 더 이상 넣을 수 없는 경우 오른쪽 하단에 있는 보내기
                버튼을 누르면 됩니다. 그런 다음 패키지 포인트에 채우기 보너스가
                배로 붙으면서 총 포인트에 추가됩니다.
              </Typography>
              <Typography variant="subtitle1">
                할당 기간 동안 원하는 만큼 패키지를 보낼 수 있습니다!
              </Typography>

              {/* 보너스 타일 */}
              <Box height="50px" />
              <Typography variant="h4" textAlign="center">
                보너스 타일
              </Typography>
              <Typography variant="subtitle1">
                때떄로 패키지에 보너스 타일이 생성됩니다. 사라지기 전에 이
                타일에 블록을 떨어뜨리면 해당 블록이 보통 포인트의 4배를 얻게
                됩니다!
              </Typography>
            </Stack>
          </StyledOverlayScrollbarsComponent>

          {/* 메뉴로 돌아가기 버튼 */}
          <Box
            position="absolute"
            bottom={0}
            left="50%"
            zIndex={1}
            sx={{
              transform: "translate(-50%, 50%)",
            }}
          >
            <Button onClick={handleBackToMenuButtonClick}>
              <Typography variant="h4" color="white">
                메뉴로 돌아가기
              </Typography>
            </Button>
          </Box>
        </Panel>
      </Stack>
    </Container>
  );
};

export default HowToPlay;
