import React from "react";
import NavBar from "../components/NavBar";
import { styled } from "styled-components";
import AnswerList from "../components/AnswerList";

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
const AnswerContainer = styled.div`
  border-radius: 2rem;
  border: 1px solid #fff;
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const AnswerTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
const AnswerTitleText = styled.div`
  color: #fff;
  text-align: center;
  font-family: var(--font-b);
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 134.766%;
  padding-bottom: 0.1rem;
`;
const AnswerBar = styled.div`
  width: 9rem;
  height: 0.1875rem;
  background: #fff;
`;

const AnswerLists = styled.div`
  overflow: auto;
  height: 100%;
  padding-top: 1rem;
  padding-right: 1rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #ccc;
  }
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
              height: "100%",
              gap: "1rem",
            }}
          >
            <ResultTitle>
              <TitleFirst>면접 종합 평가</TitleFirst>
              <TitleSecond>녹음본 듣기</TitleSecond>
            </ResultTitle>
            <AnswerContainer>
              <AnswerTitleContainer>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22 8.25C22 9.70869 21.4205 11.1076 20.3891 12.1391C19.3576 13.1705 17.9587 13.75 16.5 13.75C15.0413 13.75 13.6424 13.1705 12.6109 12.1391C11.5795 11.1076 11 9.70869 11 8.25C11 6.79131 11.5795 5.39236 12.6109 4.36091C13.6424 3.32946 15.0413 2.75 16.5 2.75C17.9587 2.75 19.3576 3.32946 20.3891 4.36091C21.4205 5.39236 22 6.79131 22 8.25ZM16.5 16.5C18.688 16.5 20.7865 15.6308 22.3336 14.0836C23.8808 12.5365 24.75 10.438 24.75 8.25C24.75 6.06196 23.8808 3.96354 22.3336 2.41637C20.7865 0.869194 18.688 0 16.5 0C14.312 0 12.2135 0.869194 10.6664 2.41637C9.11919 3.96354 8.25 6.06196 8.25 8.25C8.25 10.438 9.11919 12.5365 10.6664 14.0836C12.2135 15.6308 14.312 16.5 16.5 16.5ZM33 30.25C33 33 30.25 33 30.25 33H2.75C2.75 33 0 33 0 30.25C0 27.5 2.75 19.25 16.5 19.25C30.25 19.25 33 27.5 33 30.25ZM30.25 30.239C30.2472 29.5625 29.8265 27.5275 27.962 25.663C26.169 23.87 22.7948 22 16.5 22C10.2025 22 6.831 23.87 5.038 25.663C3.1735 27.5275 2.7555 29.5625 2.75 30.239H30.25Z"
                    fill="white"
                  />
                </svg>
                <div>
                  <AnswerTitleText>질문과 나의 답변</AnswerTitleText>
                  <AnswerBar />
                </div>
              </AnswerTitleContainer>
              {/* 질문, 답변 리스트 */}
              <AnswerLists>
                <AnswerList
                  question="Q. 실제 환자와의 상호작용에서 발생할 수 있는 윤리적인 문제나 난관에 대해 어떻게 대처할 것인지 설명해주세요."
                  answer="A. 잘 대처해야 한다고 생각합니다."
                  aiAnswer="AI-A. 인간시대의 끝이 도래했다."
                />

                <AnswerList
                  question="Q. 실제 환자와의 상호작용에서 발생할 수 있는 윤리적인 문제나 난관에 대해 어떻게 대처할 것인지 설명해주세요."
                  answer="A. 잘 대처해야 한다고 생각합니다."
                  aiAnswer="AI-A. 인간시대의 끝이 도래했다."
                />

                <AnswerList
                  question="Q. 실제 환자와의 상호작용에서 발생할 수 있는 윤리적인 문제나 난관에 대해 어떻게 대처할 것인지 설명해주세요."
                  answer="A. 잘 대처해야 한다고 생각합니다."
                  aiAnswer="AI-A. 인간시대의 끝이 도래했다."
                />
                <AnswerList
                  question="Q. 실제 환자와의 상호작용에서 발생할 수 있는 윤리적인 문제나 난관에 대해 어떻게 대처할 것인지 설명해주세요."
                  answer="A. 잘 대처해야 한다고 생각합니다."
                  aiAnswer="AI-A. 인간시대의 끝이 도래했다."
                />
                <AnswerList
                  question="Q. 실제 환자와의 상호작용에서 발생할 수 있는 윤리적인 문제나 난관에 대해 어떻게 대처할 것인지 설명해주세요."
                  answer="A. 잘 대처해야 한다고 생각합니다."
                  aiAnswer="AI-A. 인간시대의 끝이 도래했다."
                />
                <AnswerList
                  question="Q. 실제 환자와의 상호작용에서 발생할 수 있는 윤리적인 문제나 난관에 대해 어떻게 대처할 것인지 설명해주세요."
                  answer="A. 잘 대처해야 한다고 생각합니다."
                  aiAnswer="AI-A. 인간시대의 끝이 도래했다."
                />
              </AnswerLists>
            </AnswerContainer>
          </div>
        </BackGroundTwo>
      </InterviewResultBackGround>
    </div>
  );
};

export default InterviewResultPage;
