import React, { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import "animate.css";
import NavBar from "../components/NavBar";
import LoadingPage from "../components/Loading";
import { styled } from "styled-components";
import MainImage1 from "../assets/img/MainPageImage1.png";
import MainImage2 from "../assets/img/MainPageImage2.png";
import MainImage3 from "../assets/img/MainPageImage3.png";
import MainPageLogo from "../assets/img/MainPageLogo.png";
import MainPageInterview from "../assets/img/MainPageInterview.png";
import MainPageStar from "../assets/img/MainPageStar.png";
import { Link } from "react-router-dom";

const MainPageBackGround = styled.div`
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
`;

const MainPageImage = styled(motion.img)`
  width: 40.4375rem;
  height: 34.5625rem;
`;

const TitleInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled(motion.p)`
  color: rgba(255, 255, 255, 0.83);
  text-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  font-size: 5rem;
  font-family: PyeongChang Peace;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-bottom: 3rem;
  font-family: var(--font-b);
`;

const TitleContent = styled(motion.p)`
  color: #fff;
  font-size: 1.25rem;
  font-family: var(--font-r);
  font-style: normal;
  font-weight: 400;
  line-height: 140.625%;
`;

const TitleSubContent = styled(motion.p)`
  color: #fff;
  font-size: 1rem;
  font-family: var(--font-r);
  font-style: normal;
  font-weight: 400;
  line-height: 140.625%;
`;

const StartButton = styled(motion.button)`
  border-radius: 0.5625rem;
  border: 1px solid #fff;
  box-shadow: 0px 3px 8px 0px #000;
  border-radius: 0.3125rem;
  width: 12.5rem;
  height: 3.75rem;
  background: transparent;
  color: #fff;
  text-align: center;
  font-size: 1.375rem;
  font-family: var(--font-b);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  z-index: 1;
`;

const variants: Variants = {
  hidden: {
    opacity: 0.2,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const variants2: Variants = {
  hidden: {
    opacity: 0.5,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const variants3: Variants = {
  hidden: {
    opacity: 0.2,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const MainPageBackGround2 = styled.img`
  position: absolute;
  bottom: 0px;
  width: 100vw;
  height: 25.8125rem;
`;

const MainPageImage3 = styled(motion.img)`
  width: 100%;
  height: 100%;
`;

const MainLogo = styled(motion.img)`
  width: 37rem;
  display: block;
  margin: auto;
`;

const MainInterview = styled(motion.img)`
  width: 85%;
  height: 85%;
  display: block;
  margin: auto;
`;

const MainStar = styled(motion.img)`
  width: 100%;
  height: 100%;
  display: block;
  margin: auto;
  margin-top: 32rem;
  z-index: -1;
`;

const MainPage = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <MainPageBackGround>
        <TitleInfo>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Title>A-Interview</Title>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <TitleContent>
              최고의 ai 면접 서비스 지금 당장 시작하세요.
            </TitleContent>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <TitleSubContent>
              Start the best ai interview service right now.
            </TitleSubContent>
          </motion.div>

          <Link
            to="/apply-form-picker"
            style={{
              display: "flex",
              textDecoration: "none",
              width: "12.5rem",
              marginTop: "2rem",
              marginBottom: "10rem",
            }}
          >
            <StartButton
              initial={{ opacity: 0, y: 50 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 1.1 }}
              transition={{
                opacity: { duration: 0.3, delay: 0.3 }, // opacity에는 0.3초의 트랜지션과 0.3초의 딜레이 적용
                y: { duration: 2 }, // y에는 2초의 트랜지션 적용
              }}
            >
              면접 시작
            </StartButton>
          </Link>
        </TitleInfo>
        <MainPageImage
          src={MainImage1}
          initial="hidden"
          animate="visible"
          variants={variants}
        />
        <MainPageBackGround2 src={MainImage2} />
        <LoadingPage></LoadingPage>
      </MainPageBackGround>
      <MainPageBackGround>
        <div>
          <motion.div
            style={{
              marginTop: "10rem",
              lineHeight: "50px",
              textAlign: "center",
              width: "100%",
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#21d696cc",
            }}
            initial={{ opacity: 0, y: 100 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            chat-GPT를 이용한
          </motion.div>
          <motion.div
            style={{
              lineHeight: "50px",
              marginBottom: "40px",
              textAlign: "center",
              width: "100%",
              fontSize: "1.3rem",
              fontWeight: "600",
              color: "white",
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            스마트한 면접 서비스
          </motion.div>
          <div
            style={{
              padding: "0 5rem",
            }}
          >
            <MainPageImage3
              src={MainImage3}
              initial="hidden"
              animate="visible"
              variants={variants2}
            ></MainPageImage3>
          </div>
        </div>
      </MainPageBackGround>
      <MainPageBackGround>
        <div>
          <motion.div
            style={{
              marginTop: "32rem",
              marginBottom: "2rem",
              lineHeight: "50px",
              textAlign: "center",
              width: "100%",
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "white",
            }}
            initial={{ opacity: 0, y: 100 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            AI 면접 질문
          </motion.div>
          <MainInterview
            src={MainPageInterview}
            initial="hidden"
            animate="visible"
            variants={variants2}
          ></MainInterview>
        </div>
      </MainPageBackGround>
      <MainPageBackGround>
        <div>
          <MainStar
            src={MainPageStar}
            initial="hidden"
            animate="visible"
            variants={variants3}
          ></MainStar>
        </div>
      </MainPageBackGround>
      <MainPageBackGround>
        <div
          style={{
            width: "100%",
            height: "15rem",
            marginTop: "36rem",
            paddingTop: "2rem",
            backgroundColor: "rgba(22, 20, 52, 0.71)",
          }}
        >
          <div
            style={{
              lineHeight: "50px",
              textAlign: "center",
              width: "100%",
              fontSize: "1.6rem",
              fontWeight: "600",
              color: "white",
              zIndex: "-1",
              marginTop: "1.5rem",
              marginBottom: "-1rem",
            }}
          >
            최고의 ai 면접 서비스
          </div>
          <MainLogo src={MainPageLogo}></MainLogo>
        </div>
      </MainPageBackGround>
    </div>
  );
};

export default MainPage;
