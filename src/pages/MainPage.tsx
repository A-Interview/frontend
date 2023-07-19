import React, { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import "animate.css";
import NavBar from "../components/NavBar";
import LoadingPage from "../components/Loading";
import { styled } from "styled-components";
import MainImage1 from "../assets/img/MainPageImage1.png";
import MainImage2 from "../assets/img/MainPageImage2.png";
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
  margin-top: 2rem;
  margin-bottom: 10em;
  cursor: pointer;
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

const MainPageBackGround2 = styled.img`
  position: absolute;
  bottom: 0px;
  width: 100vw;
  height: 25.8125rem;
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
              Commencez dès maintenant le meilleur service dentretien dembauche.
            </TitleSubContent>
          </motion.div>

          <Link to="/wating-room">
            <StartButton
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
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
    </div>
  );
};

export default MainPage;
