import React from "react";
import NavBar from "../components/NavBar";
import { styled } from "styled-components";

const InterviewResultBackGround = styled.div`
  background: linear-gradient(
    90deg,
    rgba(33, 214, 150, 0.8) 0%,
    rgba(3, 0, 69, 0.9) 42.19%
  );
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  padding-top: 2rem;
`;

const BackGroundTwo = styled.div`
  width: 83rem;
  height: 48.375rem;

  @media only screen and (max-width: 1500px) {
    width: 60rem;
    height: 35rem;
  }

  border-radius: 2.625rem;
  background: rgba(75, 75, 75, 0.52);
`;

const ResultTitle = styled.div`
  display: flex;
  height: 3.75rem;
  gap: 1rem;
  color: #fff;
  text-align: center;
  font-family: var(--font-r);
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 700;
  line-height: 134.766%;
`;

const TitleFirst = styled.div`
  flex: 1;
  height: 100%;
  border-radius: 2.5rem;
  border: 2px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleSecond = styled.div`
  flex-shrink: 0;
  height: 100%;
  border-radius: 2.5rem;
  font-size: 1.2rem;
  border: 2px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 2rem;
  padding-left: 2rem;
`;
const InterviewResultPage = (): JSX.Element => {
  return (
    <div>
      <NavBar />
      <InterviewResultBackGround>
        <BackGroundTwo>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
            }}
          >
            <ResultTitle>
              <TitleFirst>면접 종합 평가</TitleFirst>
              <TitleSecond>녹음본 듣기</TitleSecond>
            </ResultTitle>
          </div>
        </BackGroundTwo>
      </InterviewResultBackGround>
    </div>
  );
};

export default InterviewResultPage;
