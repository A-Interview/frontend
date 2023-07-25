import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ApplyFormImage1 from "../assets/img/ApplyFormImage1.png";
import ApplyFormImage2 from "../assets/img/ApplyFormImage2.png";
import ApplyForm from "../components/ApplyForm";
import SelectOption from "../components/SelectOption";
import { useRecoilState } from "recoil";
import {
  defaultQeustionNum,
  situationQuestionNum,
  deepQuestionNum,
  personalityQuestionNum,
} from "../state/Atom";
import axios from "axios";
const ApplyFormPickerWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #060434;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomDesign = styled.div`
  background: url(${ApplyFormImage1});
  width: 100%;
  height: 20%;
  bottom: 0;
  background-size: cover;
  position: absolute;
  z-index: 1;
`;

const BottomDesign2 = styled.div`
  background: url(${ApplyFormImage2});
  width: 100%;
  height: 20%;
  bottom: 0;
  background-size: cover;
  position: absolute;
`;

const ApplyContainer = styled.div`
  flex-direction: column;
  display: flex;
  gap: 3rem;
  min-width: 50%;
`;

const ApplyTitle = styled.div`
  color: #fff;
  text-align: center;
  font-family: var(--font-b);
  font-size: 2.1875rem;
  font-style: normal;
  font-weight: 800;
  line-height: 134.766%; /* 2.948rem */
`;

const ApplyForms = styled.div`
  display: flex;
  gap: 2rem;
`;

const SelectQuestionNumber = styled.div`
  border-radius: 0rem 3.125rem;
  background: rgba(215, 215, 215, 0.3);
  width: 100%;
  height: 7.0625rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  padding-right: 2rem;
  padding-left: 2rem;
`;

const SelectQuestionTitle = styled.div`
  color: #fff;
  text-align: center;
  font-family: var(--font-b);
  font-style: normal;
  font-weight: 700;
  line-height: 134.766%; /* 2.10569rem */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const TitleCustomBar = styled.div`
  width: 14rem;
  height: 0.1875rem;
  background: #fff;
`;

interface FormType {
  job_name: string;
  created_at: string;
}

const SelectNum = styled.div``;

const ApplyFormPickerPage = (): JSX.Element => {
  const [defaultNum, setDefaultNum] = useRecoilState(defaultQeustionNum);
  const [situationNum, setSituationNum] = useRecoilState(situationQuestionNum);
  const [deepNum, setDeepNum] = useRecoilState(deepQuestionNum);
  const [personalityNum, setPersonalityNum] = useRecoilState(
    personalityQuestionNum
  );

  const [formDatas, setFormDatas] = useState([]);

  useEffect(() => {
    getForm()
      .then(() => {
        console.log("get form");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getForm = async (): Promise<void> => {
    const accessToken: string | null = sessionStorage.getItem("access_token");
    try {
      if (accessToken != null) {
        const response = await axios.get(`/api/forms/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setFormDatas(response.data);
      }
    } catch (error) {
      console.log("get 오류 발생");
    }
  };
  console.log(formDatas);

  return (
    <>
      <ApplyFormPickerWrapper>
        <ApplyContainer>
          <ApplyTitle>작성하신 지원서를 선택하세요</ApplyTitle>
          <ApplyForms>
            {formDatas.map((data: FormType, index) => (
              <ApplyForm
                key={index}
                jobName={data.job_name}
                createdAt={data.created_at}
              />
            ))}
          </ApplyForms>

          <SelectQuestionNumber>
            <SelectQuestionTitle>
              <div style={{ fontSize: "1.5rem" }}>진행할 면접 개수 선택</div>
              <TitleCustomBar />
            </SelectQuestionTitle>

            <SelectNum>
              <SelectOption
                currentValue={defaultNum}
                setCurrentValue={setDefaultNum}
                name="기본면접"
              />
            </SelectNum>
            <SelectNum>
              <SelectOption
                currentValue={situationNum}
                setCurrentValue={setSituationNum}
                name="상황면접"
              />
            </SelectNum>
            <SelectNum>
              <SelectOption
                currentValue={deepNum}
                setCurrentValue={setDeepNum}
                name="심층면접"
              />
            </SelectNum>
            <SelectNum>
              <SelectOption
                currentValue={personalityNum}
                setCurrentValue={setPersonalityNum}
                name="성향면접"
              />
            </SelectNum>
          </SelectQuestionNumber>
        </ApplyContainer>
        <BottomDesign />
        <BottomDesign2 />
      </ApplyFormPickerWrapper>
    </>
  );
};

export default ApplyFormPickerPage;
