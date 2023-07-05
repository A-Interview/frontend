import React from "react";
import { styled } from "styled-components";
import WatingPageImage from "../assets/img/WatingPageImage.png";
import WatingPageImage2 from "../assets/img/WatingPageImage2.png";
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
  width: 86rem;
  height: 51.3125rem;
`;

const OptionalContainer = styled.div`
  width: 30rem;
  height: 37rem;
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
`;

const RightContainer = styled.div`
  width: 30rem;
  height: 37rem;
  border-radius: 2.9375rem;
  background: url(${WatingPageImage2}), transparent 50% / cover no-repeat;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  filter: blur(1.5px);
`;

const RequestText = styled.p`
  color: #fff;
  text-align: center;
  font-size: 1.3rem;
  font-family: NanumSquare Neo;
  font-style: normal;
  font-weight: 400;
  line-height: 127.075%;
`;

const Input = styled.input``;

const WatingPage = (): JSX.Element => {
  return (
    <Background>
      <WatingPageImage1 src={WatingPageImage} />
      <div style={{ display: "flex", gap: "6.2rem" }}>
        <OptionalContainer>
          <div>
            <RequestText>어떠한 직종에 지원하시나요?</RequestText>
            <Input />
          </div>
          <div>
            <RequestText>현재 경력은 어떠신가요?</RequestText>
          </div>
          <div>
            <RequestText>지원하시려는 곳은 어디신가요?</RequestText>
          </div>
          <div>
            <RequestText>자기소개서 파일을 첨부해주세요!</RequestText>
          </div>
        </OptionalContainer>

        <RightContainer></RightContainer>
      </div>
    </Background>
  );
};

export default WatingPage;
