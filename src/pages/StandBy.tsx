import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { motion } from "framer-motion";
import { ReactComponent as Blurry } from "../assets/img/Blurry.svg";
import StandByArch from "../assets/img/StandByArch.png";
import { Link, useNavigate } from "react-router-dom";
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
  cursor: w-resize;

  z-index: 1;
`;
const StandByBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: #060434;
  position: relative;
`;

const StandByInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StandByBlurry = styled(motion.svg)`
  fill: radial-gradient(
    50% 50% at 50% 50%,
    rgba(170, 211, 198, 0.69) 0%,
    rgba(116, 159, 177, 0) 100%
  );
  opacity: 0;
  width: 80rem;
  height: 40rem;
  //transform: rotate(0deg);
  display: flex;
  position: absolute;
`;

const StandByArchImg = styled(motion.img)`
  width: 105%;
  height: auto;
  display: flex;
  position: absolute;
  top: 10rem;
  right: -41px;
  align-items: center;
  opacity: 0; /* 초기 투명도를 0으로 설정 */
`;

const StandByText = styled.p`
  width: 58%;
  color: #fff;
  text-align: center;
  font-family: var(--font-r);
  font-size: 2.7rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: fixed;

  top: 48%;
  left: 21%;
  right: 10%;
  bottom: 2rem;
  @media only screen and (max-width: 1300px) {
    font-size: 2rem;
  }
`;

const StandByButton = styled(motion.button)`
  width: 21.5625rem;
  height: 5.75rem;
  flex-shrink: 0;
  border-radius: 5rem;
  box-shadow: 0px 4px 10px 0px rgba(89, 212, 169, 0.5);
  color: #fff;
  text-align: center;
  font-family: var(--font-r);
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 800;
  line-height: 134.766%;
  position: absolute;
  bottom: 20%;
  left: 37%;
  margin-left: auto;
  margin-right: auto;
  background: transparent;
  cursor: progress;
`;

const StandBy = (): JSX.Element => {
  const [archImgVisible, setArchImgVisible] = useState(false);
  const [standbyTextVisible, setStandbyTextVisible] = useState(false);
  const [standbyButton, setStandbyButton] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setArchImgVisible(true);
      setStandbyTextVisible(true);
      setStandbyButton(true);
    }, 2000); // 2초 지연
  }, []);

  const navigate = useNavigate();

  const handleGoBack = (): any => {
    navigate(-1); // 뒤로가기
  };

  return (
    <div>
      <StandByBackground>
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
        <StandByInfo>
          <div style={{ position: "relative" }}>
            <StandByBlurry
              initial={{ opacity: 0 }} // 초기 투명도를 0으로 설정
              animate={{
                opacity: [1, 0, 1], // 투명도를 1, 0, 1로 반복적으로 변경
                transition: {
                  delay: 1, // 1초 딜레이 설정
                  repeat: Infinity, // 무한 반복 설정
                  duration: 0.5, // 각 반복 지속 시간 (1초)
                },
              }}
            ></StandByBlurry>
            {
              <div style={{ position: "absolute", top: "5%", left: "-12%" }}>
                <Blurry />
              </div>
            }
          </div>
          <StandByArchImg
            src={StandByArch}
            initial={{ opacity: 0, scale: 0.8 }} // 초기 투명도를 0으로 설정, 초기 크기를 0.8로 설정
            animate={{
              opacity: archImgVisible ? 1 : 0, // archImgVisible이 true일 때 투명도를 1로, 아닐 때는 0으로 설정
              scale: archImgVisible ? 1.1 : 0.8, // archImgVisible이 true일 때 크기를 1.1로, 아닐 때는 0.8로 설정
            }}
            transition={{ duration: 1.5 }} // 애니메이션 지속 시간 설정 (1.5초)
          />
          <StandByText>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: standbyTextVisible ? 1 : 0, // standbyTextVisible이 true일 때 투명도를 1로, 아닐 때는 0으로 설정
                y: standbyTextVisible ? 0 : 100, // standbyTextVisible이 true일 때 y 좌표를 0으로, 아닐 때는 100으로 설정
              }}
              transition={{ duration: 2 }}
            >
              <span style={{ color: "#86e7b8" }}>면접</span>은 주변 소음이 없는
              곳에서 진행해야 합니다. 긴장을 풀어주시고, 준비되면 시작하세요.
            </motion.div>
          </StandByText>
        </StandByInfo>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Link to="/interview-progress">
            <StandByButton
              type="submit"
              initial={{ opacity: 0, y: 80 }} // 초기 투명도를 0으로 설정, 초기 y값을 80으로 설정하여 버튼이 아래에서 시작하도록 설정
              animate={{
                opacity: standbyButton ? 1 : 0,
                y: standbyTextVisible ? 0 : 100,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
              transition={{
                opacity: { duration: 0.3, delay: 0.5 }, // opacity에는 0.3초의 트랜지션과 0.3초의 딜레이 적용
                y: { duration: 2 }, // y에는 2초의 트랜지션 적용
              }}
            >
              면접 시작
            </StandByButton>
          </Link>
        </div>
        <LoadingPage></LoadingPage>
      </StandByBackground>
    </div>
  );
};

export default StandBy;
