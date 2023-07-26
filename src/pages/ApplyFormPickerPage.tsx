import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
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
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/Loading";
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
  const navigate = useNavigate();
  const handleGoBack = (): any => {
    navigate(-1); // 뒤로가기
  };

  useEffect(() => {
    const signupNow = sessionStorage.getItem("sign_up_state");

    if (signupNow !== "true") {
      navigate("/login");
    }
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
      <LoadingPage></LoadingPage>
    </>
  );
};

export default ApplyFormPickerPage;
