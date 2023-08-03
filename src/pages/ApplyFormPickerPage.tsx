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
  SaveDefaultNumToSessionStorage,
  SaveSituationNumToSessionStorage,
  SaveDeepNumToSessionStorage,
  SavePersonalNumToSessionStorage,
} from "../state/Atom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/Loading";
import { motion } from "framer-motion";

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
  position: fixed;
  left: 0%;
  z-index: 1;
`;

const BottomDesign2 = styled.div`
  background: url(${ApplyFormImage2});
  width: 100%;
  height: 20%;
  bottom: 0;
  position: fixed;
  left: 0%;
  background-size: cover;
  position: absolute;
`;

const ApplyContainer = styled.div`
  flex-direction: column;
  display: flex;
  gap: 3rem;
  min-width: 50%;
`;

const ApplyTitle = styled(motion.div)`
  color: #fff;
  text-align: center;
  font-family: var(--font-b);
  font-size: 2.1875rem;
  font-style: normal;
  font-weight: 800;
  line-height: 134.766%; /* 2.948rem */
`;

const ApplyForms = styled(motion.div)`
  display: flex;
  gap: 2rem;
  justify-content: center;
`;

const SelectQuestionNumber = styled(motion.div)`
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

const ApplyFormWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  cursor: pointer;
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

const FormAddText = styled.div`
  color: #dcdcdc;
  text-align: center;
  font-family: var(--font-r);
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 134.766%;
`;

const BackWard = styled(motion.div)`
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

  z-index: 2;
`;

interface FormType {
  job_name: string;
  created_at: string;
  id: number;
}

const SelectNum = styled.div``;

const ApplyFormPickerPage = (): JSX.Element => {
  const [defaultNum, setDefaultNum] = useRecoilState(defaultQeustionNum);
  const [situationNum, setSituationNum] = useRecoilState(situationQuestionNum);
  const [deepNum, setDeepNum] = useRecoilState(deepQuestionNum);
  const [personalityNum, setPersonalityNum] = useRecoilState(
    personalityQuestionNum
  );
  const navigate = useNavigate();

  const [formDatas, setFormDatas] = useState([]);

  const handleGoBack = (): any => {
    navigate(-1); // 뒤로가기
  };

  useEffect(() => {
    const signupNow = sessionStorage.getItem("sign_up_state");

    if (signupNow !== "true") {
      navigate("/login");
    }
    getForm()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });

    SaveDefaultNumToSessionStorage(defaultNum);
    SaveSituationNumToSessionStorage(situationNum);
    SaveDeepNumToSessionStorage(deepNum);
    SavePersonalNumToSessionStorage(personalityNum);
  }, []);

  const getForm = async (): Promise<void> => {
    const accessToken: string | null = sessionStorage.getItem("access_token");
    const userId = sessionStorage.getItem("user_id");
    try {
      if (accessToken != null && userId != null) {
        const response = await axios.get(`/api/forms/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setFormDatas(response.data);
      }
    } catch (error) {}
  };

  const moveToWatingRoom = (e: any): void => {
    navigate("/wating-room");
  };
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);
  return (
    <>
      <ApplyFormPickerWrapper>
        <BackWard
          onClick={handleGoBack}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        >
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
          <ApplyTitle
            initial={{ opacity: 0, y: 100 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            작성하신 지원서를 선택하세요
          </ApplyTitle>
          <ApplyForms
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {formDatas.map((data: FormType, index) => (
              <ApplyForm
                key={index}
                jobName={data.job_name}
                createdAt={data.created_at}
                id={data.id}
              />
            ))}

            <ApplyFormWrapper
              onClick={moveToWatingRoom}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
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
                <FormName>+</FormName>
                <FormAddText>지원서 작성하기</FormAddText>
              </FormContainer>
            </ApplyFormWrapper>
          </ApplyForms>

          <SelectQuestionNumber
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
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
