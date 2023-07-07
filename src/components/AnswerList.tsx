import React from "react";
import { styled } from "styled-components";

interface Props {
  question: string;
  answer: string;
  aiAnswer: string;
}

const Question = styled.div`
  color: #c6fdeb;
  text-align: left;
  font-family: var(--font-r);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 134.766%;
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
`;

const AiAnswer = styled.div`
  color: rgba(255, 255, 255, 0.61);
  text-align: left;
  font-family: var(--font-r);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 134.766%;
  padding-top: 1rem;
`;
const AnswerList = ({ question, answer, aiAnswer }: Props): JSX.Element => {
  return (
    <div>
      <Question>{question}</Question>
      <Answer>{answer}</Answer>
      <AiAnswer>{aiAnswer}</AiAnswer>
    </div>
  );
};

export default AnswerList;
