import React from "react";
import { styled } from "styled-components";
import ProgressImage from "../assets/img/ProgressImage.png";
import ProgressFace from "../assets/img/ProgressFace.png";
import ProgressRobotBox from "../assets/img/ProgressRobotBox.png";
import ProgressTimerBox from "../assets/img/ProgressTimerBox.png";
import ProgressTimerBox2 from "../assets/img/ProgressTimer2Box.png";
import ProgressRobot from "../assets/img/ProgressRobot.gif";
import ProgressTimer2 from "../assets/img/ProgressTimer2.png";
import { useNavigate } from "react-router";
import LoadingPage from "../components/Loading";

const ProgressBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: #060434;
`;

const BackWard = styled.div`
  display: inline-flex;
  height: 2.25rem;
  padding: 0.375rem 0.3125rem 0.375rem 0.4375rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  position: fixed;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.3);
  left: 1.5rem;
  top: 1.5rem;
  cursor: pointer;
  z-index: 1;
`;

const ProgressBox1 = styled.div`
  width: 72.25rem;
  height: 12.625rem;
  flex-shrink: 0;
  fill: rgba(242, 242, 242, 0.15);
  stroke-width: 1px;
  stroke: rgba(255, 255, 255, 0.43);
  margin-top: 5rem;
  background: url(${ProgressImage});
`;

const ProgressBox2 = styled.div`
  width: 57.4375rem;
  height: 32.4375rem;
  flex-shrink: 0;
  border-radius: 2.75rem;
  background: rgba(255, 255, 255, 0.14);
  box-shadow: 0px 8px 6px 0px rgba(0, 0, 0, 0.05),
    0px 1px 1px 0px rgba(255, 255, 255, 0.15) inset,
    0px -1px 1px 0px rgba(255, 255, 255, 0.15) inset;
  backdrop-filter: blur(50px);
`;

const ProgressBox3 = styled.div`
  width: 13.8125rem;
  height: 32.4375rem;
  flex-shrink: 0;
  border-radius: 2.75rem;
  background: rgba(255, 255, 255, 0.14);
  box-shadow: 0px 8px 6px 0px rgba(0, 0, 0, 0.05),
    0px 1px 1px 0px rgba(255, 255, 255, 0.15) inset,
    0px -1px 1px 0px rgba(255, 255, 255, 0.15) inset;
  backdrop-filter: blur(50px);
`;

const ProgressQuestionText = styled.p`
  display: flex;
  width: 38.3125rem;
  height: 2.625rem;
  flex-direction: column;
  color: #fff;
  text-align: center;
  font-family: var(--font-r);
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ProgressImage2 = styled.img`
  width: 51.9375rem;
  height: 27.375rem;
  flex-shrink: 0;
  border-radius: 3.03713rem;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat, #fff;
  box-shadow: 0px 0px 0.29790791869163513px 0px rgba(66, 71, 76, 0.32);
`;

const ProgressRobotStateBox = styled.img`
  width: 11rem;
  height: 9.875rem;
  flex-shrink: 0;
  fill: rgba(255, 255, 255, 0.14);
`;

const ProgressRobotState = styled.img`
  width: 7.75rem;
  height: 7.5rem;
  flex-shrink: 0;
`;
const ProgressTimerStateBox = styled.img`
  width: 11rem;
  height: 3.875rem;
  flex-shrink: 0;
`;

const ProgressTimerState = styled.p`
  display: flex;
  width: 8.1875rem;
  height: 1.8125rem;
  flex-direction: column;
  flex-shrink: 0;
  color: #fff;
  text-align: center;
  font-family: var(--font-l);
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ProgressTimer2StateBox = styled.img`
  width: 11rem;
  height: 8.8125rem;
  flex-shrink: 0;
`;

const ProgressTimer2State = styled.img`
  width: 6.5625rem;
  height: 6.5625rem;
  flex-shrink: 0;
`;

const ProgressNextButtonBox = styled.button`
  width: 10.8125rem;
  height: 3.75rem;
  flex-shrink: 0;
  border-radius: 2.75rem;
  background: rgba(1, 0, 26, 0.14);
  box-shadow: 0px 8px 6px 0px rgba(0, 0, 0, 0.05),
    0px 1px 1px 0px rgba(255, 255, 255, 0.15) inset,
    0px -1px 1px 0px rgba(255, 255, 255, 0.15) inset;
  backdrop-filter: blur(50px);
  border-radius: 1.1875rem;
  box-shadow: 0px 4px 10px 0px rgba(89, 212, 169, 0.5);
`;

const ProgressNextButtonText = styled.p`
  display: flex;
  width: 5.75rem;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #59d4a9;
  text-align: center;
  font-family: var(--font-r);
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 800;
  line-height: 134.766%;
  cursor: pointer;
`;

const InterviewProgressPage = (): JSX.Element => {
  const navigate = useNavigate();

  const handleGoBack = (): any => {
    navigate(-1); // 뒤로가기
  };
  return (
    <>
      <ProgressBackground>
        <BackWard onClick={handleGoBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12C5 12.3946 5.14656 12.7328 5.46223 13.0259L14.2334 21.6167C14.4814 21.8647 14.7971 22 15.1691 22C15.9132 22 16.5107 21.4138 16.5107 20.6584C16.5107 20.2864 16.3529 19.9594 16.1048 19.7001L8.2018 12L16.1048 4.29989C16.3529 4.04059 16.5107 3.70237 16.5107 3.3416C16.5107 2.58625 15.9132 2 15.1691 2C14.7971 2 14.4814 2.13529 14.2334 2.38331L5.46223 10.9628C5.14656 11.2672 5 11.6054 5 12Z"
              fill="white"
            />
          </svg>
        </BackWard>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              position: "relative",
            }}
          >
            <ProgressBox1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                }}
              >
                <ProgressQuestionText>
                  간단하게 자기소개해주세요.
                </ProgressQuestionText>
              </div>
            </ProgressBox1>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            <ProgressBox2
              style={{
                display: "flex",
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                }}
              >
                <ProgressImage2 src={ProgressFace} />
              </div>
            </ProgressBox2>
            <ProgressBox3
              style={{
                display: "flex",
                position: "relative",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ProgressRobotStateBox src={ProgressRobotBox} />
                  <div
                    style={{
                      position: "absolute",
                      display: "flex",
                      top: "0.5rem",
                    }}
                  >
                    <ProgressRobotState src={ProgressRobot} />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ProgressTimerStateBox src={ProgressTimerBox} />
                  <div
                    style={{
                      position: "absolute",
                      display: "flex",
                    }}
                  >
                    <ProgressTimerState>진행 시간: 0분 32초</ProgressTimerState>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ProgressTimer2StateBox src={ProgressTimerBox2} />
                  <div
                    style={{
                      position: "absolute",
                      display: "flex",
                      top: "0.5rem",
                    }}
                  >
                    <ProgressTimer2State src={ProgressTimer2} />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ProgressNextButtonBox />
                  <div
                    style={{
                      position: "absolute",
                      display: "flex",
                    }}
                  >
                    <ProgressNextButtonText>다음 질문</ProgressNextButtonText>
                  </div>
                </div>
              </div>
            </ProgressBox3>
          </div>
        </div>
        <LoadingPage></LoadingPage>
      </ProgressBackground>
    </>
  );
};

export default InterviewProgressPage;
