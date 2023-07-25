import React from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const FormName = styled.div`
  color: #fff;
  text-align: center;
  font-family: var(--font-b);
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 700;
  line-height: 134.766%;
`;

const FormDate = styled.div`
  color: #dcdcdc;
  text-align: center;
  font-family: var(--font-r);
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 134.766%;
`;

const ApplyFormWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  jobName: string;
  createdAt: string;
}
const ApplyForm = ({ jobName, createdAt }: Props): JSX.Element => {
  return (
    <ApplyFormWrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="219"
        height="159"
        viewBox="0 0 219 159"
        fill="none"
      >
        <path
          d="M18.25 28.7576C8.17053 28.7576 0 35.2281 0 43.1364V143.788C0 151.696 8.1708 158.167 18.25 158.167H200.75C210.833 158.167 219 151.696 219 143.788V43.1364C219 35.2281 210.833 28.7576 200.75 28.7576H18.25Z"
          fill="#2980B9"
        />
        <path
          d="M27.3752 0C17.2958 0 9.12524 6.47045 9.12524 14.3788V115.03C9.12524 122.939 17.2958 129.409 27.3752 129.409H127.75H173.375H191.625C201.708 129.409 209.875 122.939 209.875 115.03V50.3258V28.7576C209.875 20.8492 201.708 14.3788 191.625 14.3788H173.375H127.75H118.625L91.2503 0H27.3752Z"
          fill="#2980B9"
        />
        <path
          d="M209.875 93.4622V35.947C209.875 28.0387 201.708 21.5682 191.625 21.5682H91.2503H45.6252H27.3752C17.2958 21.5682 9.12524 28.0387 9.12524 35.947V93.4622H209.875Z"
          fill="#E4E4E4"
        />
        <path
          d="M18.25 28.7576C8.17053 28.7576 0 35.2281 0 43.1364V86.2728V93.4622V136.599C0 144.507 8.1708 150.977 18.25 150.977H200.75C210.833 150.977 219 144.507 219 136.599V93.4622V86.2728V43.1364C219 35.2281 210.833 28.7576 200.75 28.7576H18.25Z"
          fill="#005F9E"
        />
      </svg>

      <FormContainer>
        <FormName>{jobName}</FormName>
        <FormDate>{createdAt.split("T")[0]}</FormDate>
      </FormContainer>
    </ApplyFormWrapper>
  );
};

export default ApplyForm;
