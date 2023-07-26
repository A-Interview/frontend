import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { styled } from "styled-components";
import MyPageImage1 from "../assets/img/MyPageImage1.png";
import MyPageImage2 from "../assets/img/MyPageImage2.png";
import MyPageImage3 from "../assets/img/MyPageImage3.png";
import { useNavigate } from "react-router";
import LoadingPage from "../components/Loading";
import { useRecoilState, useRecoilValue } from "recoil";
import { formId, maxId } from "../state/Atom";
import Modal from "../components/Modal";
import ModalResult from "../components/ModalResult";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MyPageContainer = styled.div`
  background: #01001a;
  width: 100vw;
  height: 100vh;
  position: relative;
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
  top: 5rem;
  cursor: pointer;
`;

const Background = styled.div`
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(82, 202, 162, 0.46) 0%,
    rgba(116, 159, 177, 0) 100%
  );

  width: 80%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media only screen and (max-width: 1500px) {
    width: 60rem;
    height: 35rem;
  }
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  z-index: 1;
  gap: 2rem;
`;

const Upper = styled.div`
  display: flex;
  gap: 2rem;
`;

const Lower = styled.div`
  display: flex;
  flex-direction: row;
`;

const SelfIntroduction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const Pic = styled.div`
  border-radius: 1.9375rem;
  background: url(${MyPageImage1});
  width: 18.8125rem;
  height: 18.875rem;
  z-index: 1;
`;

const InfoLeft = styled.div`
  color: #fff;
  text-align: left;
  font-family: var(--font-r);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 135.938%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoRight = styled.div`
  color: #fff;
  text-align: right;
  font-family: NanumSquare Neo;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 135.938%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;
const Info = styled.div`
  width: 39.72944rem;
  height: 18.875rem;
  border-radius: 1.75rem;
  border: 1px solid #fff;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`;

const SelfContainer = styled(motion.div)<{ image: any }>`
  width: 19.1875rem;
  height: 8.5625rem;
  border-radius: 2.4375rem;
  border: 0.5px solid #f2f2f2;
  position: relative;
  background: url(${(props) => props.image}), lightgray 50% / cover no-repeat;
  background-color: rgba(0, 0, 0, 0.19);
  cursor: pointer;
`;

const Wrap = styled.div`
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  border-radius: 2.4375rem;
  position: absolute;
`;

const Text = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  text-align: center;
  font-family: var(--font-r);
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 135.938%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Results = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

const ResultDay = styled(motion.button)`
  text-align: center;
  font-family: var(--font-r);
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 134.766%;
  cursor: pointer;
  background: transparent;
  color: #fff;
  border: none;
`;

const ResultLink = styled(motion.button)`
  text-align: center;
  font-family: var(--font-r);
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 134.766%;
  cursor: pointer;
  width: 100%;
  background: transparent;
  color: #fff;
  border: none;
`;

const ResultBox = styled.div`
  width: 18.8125rem;
  height: 17rem;
  border-radius: 2.4375rem;
  border: 1px solid #f2f2f2;
  background: rgba(0, 0, 0, 0.19);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
`;

const ModalWrapper = styled.div`
  position: relative;
  z-index: 2;
  // Modal을 위에 배치
`;
const MyPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalResultOpen, setModalResultOpen] = useState(false);

  const [sectorName, setSector] = useState("");
  const [jobName, setJob] = useState("");
  const [career, setCareer] = useState("");
  const [resume, setResume] = useState("");
  const idform = useRecoilValue(formId);
  const [userId, setuserId] = useState(0);
  const [maxidnow, setMaxIdNow] = useRecoilState<number>(maxId);

  const [idTime1, setidTime1] = useState("");

  const [idTime2, setidTime2] = useState("");
  const [idTime3, setidTime3] = useState("");
  const [idTime4, setidTime4] = useState("");
  const handleGoBack = (): any => {
    navigate(-1); // 뒤로가기
  };
  interface FormNow {
    sector_name: string;
    job_name: string;
    career: string;
    resume: string;
    updated_at: string;
    id: number;
  }
  const [formState, setformState] = useState<FormNow[]>([]);
  const [formAll, setformAll] = useState<FormNow[]>([]);
  // 페이지 처음들어올때 자기소개서 및 시간대 설정
  useEffect(() => {
    setSector(idform.sectorname);
    setJob(idform.jobname);
    setCareer(idform.career);
    setResume(idform.resume);
    handlegetForm().catch((error) => {
      console.log("저장 실패:", error);
    });
  }, []);
  // 버튼 누를 때마다 get 요청
  useEffect(() => {
    handleSave().catch((error) => {
      console.log("저장 실패:", error);
    });
  }, [userId]);
  // form id 바뀔때마다 상태 업데이트
  useEffect(() => {
    if (formAll.length > 0) {
      // 마이페이지로 바로 들어왔을때 잘못된 post, get 방지
      setMaxIdNow(formAll[formAll.length - 1].id);
      setuserId(formAll[formAll.length - 1].id);
      // 각 칸마다 시간설정
      if (formAll.length === 1) {
        setidTime1(formAll[formAll.length - 1].updated_at);
      } else if (formAll.length === 2) {
        setidTime1(formAll[formAll.length - 2].updated_at);
        setidTime2(formAll[formAll.length - 1].updated_at);
      } else if (formAll.length === 3) {
        setidTime1(formAll[formAll.length - 3].updated_at);
        setidTime2(formAll[formAll.length - 2].updated_at);
        setidTime3(formAll[formAll.length - 1].updated_at);
      } else {
        setidTime1(formAll[formAll.length - 4].updated_at);
        setidTime2(formAll[formAll.length - 3].updated_at);
        setidTime3(formAll[formAll.length - 2].updated_at);
        setidTime4(formAll[formAll.length - 1].updated_at);
      }
    }
  }, [formAll]);
  useEffect(() => {
    if (formState.length > 0) {
      // 보이는 화면의 form 설정
      setSector(formState[0].sector_name);
      setJob(formState[0].job_name);
      setCareer(formState[0].career);
      setResume(formState[0].resume);
    }
  }, [formState]);

  // 자기소개서 수정 모달
  const handleModalClose = (): void => {
    setModalOpen(false);
  };
  const openModal = (): void => {
    setModalOpen(true);
  };
  // 자기소개서 확인 모달
  const openModalResult = (): void => {
    setModalResultOpen(true);
  };
  const handleModalResultClose = (): void => {
    setModalResultOpen(false);
  };

  // 1번~4번 버튼 눌렀을때 현재 아이디에 따른 위치 조정
  const handleButtonClick1 = (): void => {
    if (formAll.length === 1) {
      setuserId(maxidnow);
    } else if (formAll.length === 2) {
      setuserId(maxidnow - 1);
    } else if (formAll.length === 3) {
      setuserId(maxidnow - 2);
    } else {
      setuserId(maxidnow - 3);
    }
  };
  const handleButtonClick2 = (): void => {
    if (formAll.length === 1) {
      setuserId(0);
    } else if (formAll.length === 2) {
      setuserId(maxidnow);
    } else if (formAll.length === 3) {
      setuserId(maxidnow - 1);
    } else {
      setuserId(maxidnow - 2);
    }
  };

  const handleButtonClick3 = (): void => {
    if (formAll.length === 1) {
      setuserId(0);
    } else if (formAll.length === 2) {
      setuserId(0);
    } else if (formAll.length === 3) {
      setuserId(maxidnow);
    } else {
      setuserId(maxidnow - 1);
    }
  };

  const handleButtonClick4 = (): void => {
    if (formAll.length === 1) {
      setuserId(0);
    } else {
      setuserId(maxidnow);
    }
  };
  // 자기소개서 업데이트
  const updateResume = (newResume: string): void => {
    setResume(newResume);
    console.log(newResume);
  };

  useEffect(() => {
    handlechangeForm()
      .then(() => {
        console.log("저장 성공");
      })
      .catch((error) => {
        console.log("저장 실패:", error);
      });
  }, [resume]);
  // 자기소개서 수정 PUT 요청 부분
  const changeForm = async (): Promise<void> => {
    try {
      if (process.env.REACT_APP_API_URL_FORMID !== undefined) {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL_FORMID}${userId}`,
          {
            userId,
            resume,
          }
        );
        console.log(response.data);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };
  const handlechangeForm = async (): Promise<void> => {
    try {
      await changeForm();
    } catch (error) {
      console.log("오류 발생:", error);
    }
  };
  // 전체 form 가져오기
  const getForm = async (): Promise<void> => {
    try {
      const accessToken: string | null = sessionStorage.getItem("access_token");
      const response = await axios.get(process.env.REACT_APP_API_URL_FORM, {
        headers: {
          Authorization: `Bearer ${accessToken ?? ""}`,
        },
      });
      setformAll(response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };
  const handlegetForm = async (): Promise<void> => {
    try {
      await getForm();
    } catch (error) {
      console.log("오류 발생:", error);
    }
  };
  // formId로 get
  const handleForm = async (): Promise<void> => {
    try {
      if (process.env.REACT_APP_API_URL_FORMID !== undefined) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_FORMID}${userId}`
        );
        setformState(response.data);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };
  const handleSave = async (): Promise<void> => {
    try {
      await handleForm();
    } catch (error) {
      console.log("오류 발생:", error);
    }
  };
  return (
    <>
      <MyPageContainer>
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

        <NavBar />

        <ContentContainer>
          <Upper>
            <Pic />
            <Info>
              <InfoLeft>
                <div>희망하는 직종</div>
                <div>지원하고자 하는 곳</div>
                <div>경력 사항</div>
              </InfoLeft>
              <InfoRight>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                  >
                    <path
                      d="M17.8922 18.0809H4.77063C4.52206 18.0809 4.28366 18.176 4.10789 18.3453C3.93212 18.5146 3.83337 18.7442 3.83337 18.9835C3.83337 19.2229 3.93212 19.4525 4.10789 19.6218C4.28366 19.791 4.52206 19.8861 4.77063 19.8861H17.8922C18.1408 19.8861 18.3792 19.791 18.555 19.6218C18.7307 19.4525 18.8295 19.2229 18.8295 18.9835C18.8295 18.7442 18.7307 18.5146 18.555 18.3453C18.3792 18.176 18.1408 18.0809 17.8922 18.0809Z"
                      fill="#F2F2F2"
                      fillOpacity="0.57"
                    />
                    <path
                      d="M4.77054 16.2758H4.8549L8.76326 15.9328C9.19139 15.8917 9.59183 15.7101 9.89734 15.4183L18.3327 7.29486C18.6601 6.96177 18.837 6.51727 18.8247 6.05877C18.8124 5.60028 18.6119 5.16517 18.267 4.8488L15.699 2.37566C15.3638 2.07247 14.9246 1.89851 14.4649 1.88686C14.0052 1.87521 13.5571 2.02669 13.2059 2.31248L4.77054 10.4359C4.46759 10.7301 4.27895 11.1158 4.23631 11.5281L3.83328 15.2919C3.82066 15.4242 3.83847 15.5574 3.88545 15.6822C3.93244 15.807 4.00743 15.9203 4.10509 16.014C4.19267 16.0977 4.29653 16.1639 4.41072 16.2088C4.52492 16.2537 4.64719 16.2765 4.77054 16.2758ZM14.3962 3.63931L16.9549 6.10342L15.0804 7.8635L12.5685 5.44452L14.3962 3.63931ZM6.05458 11.6815L11.3313 6.63596L13.8619 9.07299L8.6133 14.1276L5.80153 14.3803L6.05458 11.6815Z"
                      fill="#F2F2F2"
                      fillOpacity="0.57"
                    />
                  </svg>
                  {sectorName}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                  >
                    <path
                      d="M17.8922 18.0809H4.77063C4.52206 18.0809 4.28366 18.176 4.10789 18.3453C3.93212 18.5146 3.83337 18.7442 3.83337 18.9835C3.83337 19.2229 3.93212 19.4525 4.10789 19.6218C4.28366 19.791 4.52206 19.8861 4.77063 19.8861H17.8922C18.1408 19.8861 18.3792 19.791 18.555 19.6218C18.7307 19.4525 18.8295 19.2229 18.8295 18.9835C18.8295 18.7442 18.7307 18.5146 18.555 18.3453C18.3792 18.176 18.1408 18.0809 17.8922 18.0809Z"
                      fill="#F2F2F2"
                      fillOpacity="0.57"
                    />
                    <path
                      d="M4.77054 16.2758H4.8549L8.76326 15.9328C9.19139 15.8917 9.59183 15.7101 9.89734 15.4183L18.3327 7.29486C18.6601 6.96177 18.837 6.51727 18.8247 6.05877C18.8124 5.60028 18.6119 5.16517 18.267 4.8488L15.699 2.37566C15.3638 2.07247 14.9246 1.89851 14.4649 1.88686C14.0052 1.87521 13.5571 2.02669 13.2059 2.31248L4.77054 10.4359C4.46759 10.7301 4.27895 11.1158 4.23631 11.5281L3.83328 15.2919C3.82066 15.4242 3.83847 15.5574 3.88545 15.6822C3.93244 15.807 4.00743 15.9203 4.10509 16.014C4.19267 16.0977 4.29653 16.1639 4.41072 16.2088C4.52492 16.2537 4.64719 16.2765 4.77054 16.2758ZM14.3962 3.63931L16.9549 6.10342L15.0804 7.8635L12.5685 5.44452L14.3962 3.63931ZM6.05458 11.6815L11.3313 6.63596L13.8619 9.07299L8.6133 14.1276L5.80153 14.3803L6.05458 11.6815Z"
                      fill="#F2F2F2"
                      fillOpacity="0.57"
                    />
                  </svg>
                  {jobName}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                  >
                    <path
                      d="M17.8922 18.0809H4.77063C4.52206 18.0809 4.28366 18.176 4.10789 18.3453C3.93212 18.5146 3.83337 18.7442 3.83337 18.9835C3.83337 19.2229 3.93212 19.4525 4.10789 19.6218C4.28366 19.791 4.52206 19.8861 4.77063 19.8861H17.8922C18.1408 19.8861 18.3792 19.791 18.555 19.6218C18.7307 19.4525 18.8295 19.2229 18.8295 18.9835C18.8295 18.7442 18.7307 18.5146 18.555 18.3453C18.3792 18.176 18.1408 18.0809 17.8922 18.0809Z"
                      fill="#F2F2F2"
                      fillOpacity="0.57"
                    />
                    <path
                      d="M4.77054 16.2758H4.8549L8.76326 15.9328C9.19139 15.8917 9.59183 15.7101 9.89734 15.4183L18.3327 7.29486C18.6601 6.96177 18.837 6.51727 18.8247 6.05877C18.8124 5.60028 18.6119 5.16517 18.267 4.8488L15.699 2.37566C15.3638 2.07247 14.9246 1.89851 14.4649 1.88686C14.0052 1.87521 13.5571 2.02669 13.2059 2.31248L4.77054 10.4359C4.46759 10.7301 4.27895 11.1158 4.23631 11.5281L3.83328 15.2919C3.82066 15.4242 3.83847 15.5574 3.88545 15.6822C3.93244 15.807 4.00743 15.9203 4.10509 16.014C4.19267 16.0977 4.29653 16.1639 4.41072 16.2088C4.52492 16.2537 4.64719 16.2765 4.77054 16.2758ZM14.3962 3.63931L16.9549 6.10342L15.0804 7.8635L12.5685 5.44452L14.3962 3.63931ZM6.05458 11.6815L11.3313 6.63596L13.8619 9.07299L8.6133 14.1276L5.80153 14.3803L6.05458 11.6815Z"
                      fill="#F2F2F2"
                      fillOpacity="0.57"
                    />
                  </svg>
                  {career}
                </div>
              </InfoRight>
            </Info>
            <SelfIntroduction>
              <SelfContainer
                image={MyPageImage2}
                onClick={openModalResult}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                <Wrap />
                <Text>내 자기 소개서 확인</Text>
              </SelfContainer>

              <SelfContainer
                image={MyPageImage3}
                onClick={openModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                <Wrap />
                <Text>내 자기 소개서 수정</Text>
              </SelfContainer>
            </SelfIntroduction>
          </Upper>
          <Lower>
            <Results>
              <ResultBox>
                <ResultDay
                  onClick={() => {
                    handleButtonClick1();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  {idTime1.substring(0, 10)}
                  {/* 시간까지만 보이게 자르기 */}
                </ResultDay>
                <Link to="/interview-result">
                  <ResultLink
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                    style={{ justifyContent: "center" }}
                  >
                    면접 평가 보러가기
                  </ResultLink>
                </Link>
              </ResultBox>

              <ResultBox>
                <ResultDay
                  onClick={() => {
                    handleButtonClick2();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  {idTime2.substring(0, 10)}
                  {/* 시간까지만 보이게 자르기 */}
                </ResultDay>
                <Link to="/interview-result">
                  <ResultLink
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                    style={{ justifyContent: "center" }}
                  >
                    면접 평가 보러가기
                  </ResultLink>
                </Link>
              </ResultBox>

              <ResultBox>
                <ResultDay
                  onClick={() => {
                    handleButtonClick3();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  {idTime3.substring(0, 10)}
                  {/* 시간까지만 보이게 자르기 */}
                </ResultDay>
                <Link to="/interview-result">
                  <ResultLink
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                    style={{ justifyContent: "center" }}
                  >
                    면접 평가 보러가기
                  </ResultLink>
                </Link>
              </ResultBox>

              <ResultBox>
                <ResultDay
                  onClick={() => {
                    handleButtonClick4();
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  {idTime4.substring(0, 10)}
                  {/* 시간까지만 보이게 자르기 */}
                </ResultDay>
                <Link to="/interview-result">
                  <ResultLink
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                    style={{ justifyContent: "center" }}
                  >
                    면접 평가 보러가기
                  </ResultLink>
                </Link>
              </ResultBox>
            </Results>
          </Lower>
        </ContentContainer>
        <Background />
        <LoadingPage></LoadingPage>
        {isModalOpen && (
          <ModalWrapper>
            <Modal
              isModalOpen={isModalOpen}
              setModalOpen={handleModalClose}
              updateResume={updateResume}
            />
          </ModalWrapper>
        )}
        {isModalResultOpen && (
          <ModalWrapper>
            <ModalResult
              isModalResultOpen={isModalResultOpen}
              setModalResultOpen={handleModalResultClose}
              resume={resume}
            />
          </ModalWrapper>
        )}
      </MyPageContainer>
      <LoadingPage></LoadingPage>\
    </>
  );
};

export default MyPage;
