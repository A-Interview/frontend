import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { styled } from "styled-components";
import AnswerList from "../components/AnswerList";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  position: relative;
  cursor: pointer;
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
  width: 12rem;
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
  gap: 5rem;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #ccc;
  }
`;

const ChangeButton = styled.div`
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-b);
  font-size: 1rem;
  color: #fff;
`;

const ChangeUl = styled.ul<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  width: 100%;
  top: 49px;
  left: 0;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
  list-style: none;
  padding: initial;
`;

const ChangeLi = styled.li`
  cursor: pointer;
  &:hover {
    color: #68a9ff;
  }
  font-size: 1rem;
`;

const InterviewResultPage = (): JSX.Element => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  // 보여줄 데이터 상태
  const [viewData, setViewData] = useState([]);

  const [questionData, setQuestionData] = useState({
    defaultQueNum: 0,
    situationQueNum: 0,
    deepQueNum: 0,
    personalityQueNum: 0,
    totalQueNum: 0,
  });

  // 각 면접 종류 별 보기 버튼
  const [isOpen, setIsOpen] = useState(false);

  const onChangeView = (): void => {
    // 이전 인자를 받아와서 역전
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const signupNow = sessionStorage.getItem("sign_up_state");
    if (signupNow !== "true") {
      navigate("/login");
    }

    getQna();

    getQuestionNumber();
  }, []);

  // QNA를 받아오기
  const getQna = (): void => {
    const formId = sessionStorage.getItem("form_id");
    if (formId != null) {
      axios
        .get(`/api/qna/`, {
          params: { form_id: formId },
        })
        .then((res) => {
          setData(res.data.QnA);
          setViewData(res.data.QnA);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // 각 유형 별 질문 갯수 받아오기
  const getQuestionNumber = (): void => {
    const formId = sessionStorage.getItem("form_id");
    if (formId != null) {
      axios
        .get(`/api/forms/qnum/${formId}`)
        .then((res) => {
          setQuestionData({
            defaultQueNum: res.data.default_que_num,
            situationQueNum: res.data.situation_que_num,
            deepQueNum: res.data.deep_que_num,
            personalityQueNum: res.data.personality_que_num,
            totalQueNum: res.data.total_que_num,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onClickAll = (): void => {
    setViewData(data);
  };

  const onClickDefault = (): void => {
    setViewData(data.slice(0, questionData.defaultQueNum));
  };
  const onClickSituation = (): void => {
    setViewData(
      data.slice(
        questionData.defaultQueNum,
        questionData.defaultQueNum + questionData.situationQueNum
      )
    );
  };

  const onClickDeep = (): void => {
    setViewData(
      data.slice(
        questionData.defaultQueNum + questionData.situationQueNum,
        questionData.defaultQueNum +
          questionData.situationQueNum +
          questionData.deepQueNum
      )
    );
  };
  const onClickPersonality = (): void => {
    setViewData(
      data.slice(
        questionData.defaultQueNum +
          questionData.situationQueNum +
          questionData.deepQueNum,
        questionData.totalQueNum
      )
    );
  };

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
              <TitleFirst>면접 최종 결과</TitleFirst>
              <TitleSecond onClick={onChangeView}>
                <ChangeButton>전체 보기</ChangeButton>
                <ChangeUl isOpen={isOpen}>
                  <ChangeLi onClick={onClickAll}>전체보기</ChangeLi>
                  <ChangeLi onClick={onClickDefault}>기본면접</ChangeLi>
                  <ChangeLi onClick={onClickSituation}>상황면접</ChangeLi>
                  <ChangeLi onClick={onClickDeep}>심층면접</ChangeLi>
                  <ChangeLi onClick={onClickPersonality}>성향면접</ChangeLi>
                </ChangeUl>
              </TitleSecond>
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
                  <AnswerTitleText>질문 & 나와 AI 답변</AnswerTitleText>
                  <AnswerBar />
                </div>
              </AnswerTitleContainer>
              {/* 질문, 답변 리스트 */}
              <AnswerLists>
                {viewData.length === 0 ? (
                  <div>Loading...</div>
                ) : (
                  viewData?.map((chunk: any, index) => (
                    <AnswerList
                      key={index}
                      question={chunk.question}
                      answer={chunk.answer}
                      questionId={chunk.question_id}
                      baseRecode={chunk.record}
                    />
                  ))
                )}
              </AnswerLists>
            </AnswerContainer>
          </div>
        </BackGroundTwo>
      </InterviewResultBackGround>
    </div>
  );
};

export default InterviewResultPage;
