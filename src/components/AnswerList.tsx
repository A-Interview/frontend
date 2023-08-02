import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import AiImage from "../assets/img/AiImage.png";
import axios from "axios";
// import AnswerPlay from "../assets/img/AnswerPlay.svg";

interface Props {
  question: string;
  answer: string;
  questionId: number;
  baseRecode: string;
}

const Question = styled.div`
  color: #c6fdeb;
  text-align: left;
  font-family: var(--font-r);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 134.766%;
  padding-left: 0.4rem;
`;

const Answer = styled.div`
  color: #fff;
  text-align: left;
  font-family: var(--font-r);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 134.766%;
  padding-top: 1rem;
  cursor: pointer;
  padding-left: 0.4rem;
  &:hover {
    color: #68a9ff;
  }
`;

const AiAnswer = styled.div`
  color: rgba(255, 255, 255, 0.61);
  text-align: left;
  font-family: var(--font-r);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 134.766%;
  display: inline-block;
`;

const AiAnswerContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;

const AnswerButton = styled.button<{ showBulb: boolean }>`
  border: none;
  outline: none;
  background: url(${AiImage});
  width: 2rem;
  height: 2rem;
  background-repeat: no-repeat;
  background-size: contain;
  display: ${(props) => (props.showBulb ? "inline-block" : "none")};
  cursor: pointer;
`;

const AnswerList = ({
  question,
  answer,
  questionId,
  baseRecode,
}: Props): JSX.Element => {
  // 답변 생성 여부 확인 변수
  const [isMakeAnswer, setIsMakeAnswer] = useState(false);
  const [isClickAnable, setClickAnable] = useState(true);
  const [gptAnswer, setGptAnswer] = useState(
    "왼쪽 전구를 클릭하면 AI 답변이 나옵니다..!"
  );
  const [loading, setLoading] = useState(false);

  const [showBulb, setShowBulb] = useState(true);

  // GPT 답변 만들어주는 함수
  const getGptMakeAnswer = (): void => {
    setLoading(true);
    setClickAnable(false);

    axios
      .post("/api/gptanswer/", {
        question_id: questionId,
      })
      .then((res) => {
        console.log("GPT 답변 생성 완료");
        setIsMakeAnswer(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    try {
      axios
        .get("/api/gptanswer/", {
          params: { question_id: questionId },
        })
        .then((res) => {
          setGptAnswer(res.data.gpt_answer_content);
          setShowBulb(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("");
    }
  }, []);

  useEffect(() => {
    if (isMakeAnswer) {
      getGptAnswer();
    }
  }, [isMakeAnswer]);

  const getGptAnswer = (): void => {
    axios
      .get("/api/gptanswer/", {
        params: { question_id: questionId },
      })
      .then((res) => {
        setGptAnswer(res.data.gpt_answer_content);
        setLoading(false);
        setShowBulb(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* -------------------------------------------------------------------------- */

  // 음성 변환하는 코드

  const handleDecodeAndPlay = (): void => {
    // 이 함수는 base64를 디코딩하고, 음성으로 변환하여 실행하는 작업을 수행합니다.

    const base64Data = baseRecode; // base64로 인코딩된 오디오 데이터를 여기에 입력해주세요.

    // base64를 디코딩하여 ArrayBuffer로 변환합니다.
    const decodedData = Uint8Array.from(atob(base64Data), (c) =>
      c.charCodeAt(0)
    ).buffer;

    // ArrayBuffer를 Blob으로 변환합니다.
    const blob = new Blob([decodedData], { type: "audio/wav" }); // 원하는 오디오 포맷으로 변경 가능합니다.

    // Blob을 URL.createObjectURL()을 사용하여 오디오 URL로 변환합니다.
    const audioURL = URL.createObjectURL(blob);

    // 음성 재생을 위해 Audio 객체를 생성합니다.
    const audio = new Audio(audioURL);

    // 음성 재생을 시작합니다.
    audio
      .play()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Question>Q. {question}</Question>

      <Answer onClick={handleDecodeAndPlay}>A. {answer}</Answer>
      <AiAnswerContainer>
        <AnswerButton
          onClick={getGptMakeAnswer}
          disabled={!isClickAnable}
          showBulb={showBulb}
        />
        {loading ? (
          <AiAnswer>AI 답변 가져오는 중...</AiAnswer>
        ) : (
          <AiAnswer>{gptAnswer}</AiAnswer>
        )}
      </AiAnswerContainer>
    </div>
  );
};

export default AnswerList;
