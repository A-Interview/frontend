import React from "react";
import { styled } from "styled-components";
import WatingPageImage from "../assets/img/WatingPageImage.png";
import WatingPageImage2 from "../assets/img/WatingPageImage2.png";
import FileAddImage from "../assets/img/FileAddImage.png";

const Background = styled.div`
  background: #060434;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WatingPageImage1 = styled.img`
  position: absolute;
  width: 80vw;
  height: 80vh;
`;

const OptionalContainer = styled.div`
  width: 27rem;
  height: 33.6rem;
  border-radius: 2.75rem;
  background: rgba(255, 255, 255, 0.14);
  box-shadow: 0px 8px 6px 0px rgba(0, 0, 0, 0.05),
    0px 1px 1px 0px rgba(255, 255, 255, 0.15) inset,
    0px -1px 1px 0px rgba(255, 255, 255, 0.15) inset;
  backdrop-filter: blur(50px);
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  gap: 2rem;
  padding-top: 3rem;
`;

const RightContainer = styled.div`
  width: 27rem;
  height: 33.6rem;
  border-radius: 2.9375rem;
  background: url(${WatingPageImage2}), transparent 50% / cover no-repeat;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  filter: blur(1.5px);
`;

const RequestText = styled.p`
  color: #fff;
  text-align: left;
  font-size: 1.3rem;
  font-family: NanumSquare Neo;
  font-style: normal;
  font-weight: 400;
  line-height: 127.075%;
`;

const Input = styled.input`
  stroke-width: 1px;
  outline: 1.2px solid rgba(255, 255, 255, 0.19);
  width: 100%;
  height: 2.4375rem;
  background: rgba(0, 0, 0, 0.14);
  border: none;
  padding-left: 1rem;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  color: #c4c4c4;
  text-align: left;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 127.075%;
  font-family: var(--font-r);
  border-radius: 0.8rem;
`;

const SelfIntroContainer = styled.div`
  display: flex;
  width: 100%;
  height: 2.5rem;
  justify-content: space-between;
  margin-top: 1rem;
`;

const FileAddButton = styled.div`
  border-radius: 0.9375rem;
  border: 1px solid #76878d;
  background: rgba(0, 0, 0, 0.14);
  width: 45%;
  display: flex;
  align-items: center;
`;

const FileAddImg = styled.img`
  margin-left: 1rem;
`;

const Text = styled.p`
  color: #f4f6f6;
  text-align: left;
  font-family: var(--font-l);
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: 127.075%;
  margin: auto;
`;

const InfoFirst = styled.p`
  white-space: pre-wrap;
  color: #fff;
  text-align: center;
  font-family: var(--font-r);
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 800;
  line-height: 127.075%;
`;
const InfoSecond = styled.p`
  color: #fff;
  text-align: center;
  font-family: var(--font-r);
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 127.075%;
`;

const QuestionCreate = styled.button`
  border-radius: 2.75rem;
  background: rgba(1, 0, 26, 0.14);
  box-shadow: 0px 8px 6px 0px rgba(0, 0, 0, 0.05),
    0px 1px 1px 0px rgba(255, 255, 255, 0.15) inset,
    0px -1px 1px 0px rgba(255, 255, 255, 0.15) inset;
  backdrop-filter: blur(50px);
  width: 16.5625rem;
  height: 3.75rem;
  border: none;
  :focus {
    border: none;
    outline: none;
  }
  color: #fff;
  text-align: center;
  font-family: var(--font-b);
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 800;
  line-height: 134.766%;
  position: fixed;
  bottom: 2.5rem;
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
`;
const WatingPage = (): JSX.Element => {
  return (
    <>
      <BackWard>
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
      <Background>
        <WatingPageImage1 src={WatingPageImage} />
        <div style={{ display: "flex", gap: "6.2rem" }}>
          <OptionalContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <RequestText>
                어떠한 <span style={{ color: "#56BD66" }}>직종</span>에
                지원하시나요?
              </RequestText>
              <Input placeholder="ex) 웹 프론트엔드 개발자" />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <RequestText>
                현재 <span style={{ color: "#56BD66" }}>경력</span>은
                어떠신가요?
              </RequestText>
              <Input placeholder="ex) 신입" />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <RequestText>
                <span style={{ color: "#56BD66" }}>지원하시려는 곳</span>은
                어디신가요?
              </RequestText>
              <Input placeholder="ex) IT 솔루션 이커머스" />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <RequestText>
                <span style={{ color: "#56BD66" }}>자기소개서 파일</span>을
                첨부해주세요!
              </RequestText>
              <SelfIntroContainer>
                <FileAddButton>
                  <FileAddImg src={FileAddImage} />
                  <Text>파일 첨부하기</Text>
                </FileAddButton>
                <FileAddButton style={{ justifyContent: "center" }}>
                  <Text>파일 경로 정보</Text>
                </FileAddButton>
              </SelfIntroContainer>
            </div>
          </OptionalContainer>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <RightContainer />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5rem",
                position: "absolute",
              }}
            >
              <InfoFirst>
                여러분의 정보를 <br /> <br />
                입력해주세요
              </InfoFirst>

              <InfoSecond>입력하신 내용은 AI 분석에 사용됩니다.</InfoSecond>
            </div>
          </div>
        </div>

        <QuestionCreate>면접 생성</QuestionCreate>
      </Background>
    </>
  );
};

export default WatingPage;