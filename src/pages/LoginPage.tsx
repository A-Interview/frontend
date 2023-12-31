import React, {
  useState,
  type ChangeEvent,
  type FormEvent,
  useEffect,
} from "react";
import { motion } from "framer-motion";
import { styled } from "styled-components";
import loginstars from "../assets/img/LoginStarspng.png";
import LoginBoxImage from "../assets/img/LoginBoxImage.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  SaveAccessTokenToSessionStorage,
  SaveCurrentUserIdToSessionStorage,
  SaveRefreshTokenToSessionStorage,
  SaveSignUpstateToSessionStorage,
  SaveUserNameStateToSessionStorage,
} from "../state/Atom";
import Swal from "sweetalert2";
const ProgressBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: #060434;
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
  top: 1.5rem;
  cursor: pointer;
`;
const LoginStarsimg = styled.img`
  width: 72.78869rem;
  height: 32.17175rem;
`;
const LoginQuote = styled.p`
  color: #fff;
  text-align: center;
  font-family: var(--font-r);
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 135.938%;
`;
const LoginBoxImg = styled.img`
  width: 29rem;
  height: 32.25rem;
  margin-left: 6rem;
`;
const LoginTitle = styled.p`
  display: flex;
  text-align: center;
  height: 2.1875rem;
  flex-shrink: 0;
  color: #fff;
  font-family: var(--font-r);
  font-size: 1.5625rem;
  font-style: normal;
  font-weight: 900;
  line-height: 140.625%;
  margin-top: 4rem;
  margin-bottom: 1rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 30rem;
`;
const Input = styled.input`
  width: 22.74931rem;
  height: 3.5rem;
  flex-shrink: 0;
  border-radius: 1.625rem;
  border: 1px solid #000;
  background: #fff;
  color: rgba(0, 0, 0, 0.5);
  font-family: var(--font-r);
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 350%;
  padding-left: 20px;
`;
const Button = styled(motion.button)`
  width: 22.75rem;
  height: 3.4375rem;
  flex-shrink: 0;
  border-radius: 1.1875rem;
  background: #464759;
  box-shadow: 0px 4px 10px 0px rgba(89, 212, 169, 0.5);
  border-radius: 2.75rem;
  color: #59d4a9;
  font-family: var(--font-r);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 800;
  line-height: 134.766%;
  margin-top: 1rem;
  cursor: pointer;
`;
const Account = styled(motion.address)`
  text-align: center;
  font-family: var(--font-r);
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  color: white;
  line-height: normal;
  text-decoration-line: underline;
  width: 26.25rem;
  height: 4.25rem;
  flex-shrink: 0;
  cursor: pointer;
`;
const LoginPage = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [signupnow, setSignupState] = useRecoilState(signupState);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const navigate = useNavigate();
  // fadeOut 상태 추가
  const [fadeOut, setFadeOut] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const handleLogin = async (): Promise<void> => {
    try {
      const response = await axios.post("/api/users/login/", {
        username,
        email,
        password,
      });
      setUsername(email);
      SaveUserNameStateToSessionStorage(email);
      SaveCurrentUserIdToSessionStorage(response.data.user_id);
      SaveAccessTokenToSessionStorage(response.data.access);
      SaveRefreshTokenToSessionStorage(response.data.refresh);
      SaveSignUpstateToSessionStorage("true");
      // 로그인 성공 후 fadeOut 상태 변경
      setFadeOut(true);
      await showToast();
    } catch (error) {
      await showToast2();
      console.log(error);
    }
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    setButtonDisabled(true);

    // 비활성화된 상태를 1초 후에 해제
    setTimeout(() => {
      setButtonDisabled(false);
    }, 1000);

    e.preventDefault();
    try {
      await handleLogin();
    } catch (error) {
      await showToast2();
      console.log(error);
    }
  };
  const checkInput = (): void => {
    if (email.trim() === "" || password.trim() === "") {
      setAllFieldsFilled(false);
    } else {
      setAllFieldsFilled(true);
    }
  };
  useEffect(() => {
    checkInput();
  }, [email, password]);
  // 토스트 보여주는 함수
  const showToast = async (): Promise<void> => {
    await Swal.fire({
      icon: "success",
      title: "로그인 성공",
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    navigate("/");
  };
  const showToast2 = async (): Promise<void> => {
    await Swal.fire({
      icon: "error",
      title: "로그인 실패: 아이디 혹은\n비밀번호를 확인해주세요.",
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  };
  const handleGoBack = (): any => {
    navigate(-1); // 뒤로가기
  };
  return (
    <>
      <ProgressBackground
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
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
        <div
          style={{
            display: "flex",
            position: "fixed",
            top: "-14rem",
            right: "-14rem",
          }}
        >
          <LoginStarsimg src={loginstars} />
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            maxWidth: "100%",
            top: "13%",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <LoginQuote>
            &ldquo;꿈을 이루기 위해 시작할 때가 가장 좋은 때입니다.&ldquo; -
            나폴레옹 힐
            <br />
            &ldquo;오류를 넘으면 또 오류가 있다.&ldquo;
          </LoginQuote>
          <div
            style={{
              display: "flex",
              position: "relative",
            }}
          >
            <LoginBoxImg src={LoginBoxImage} />
            <div
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2rem",
                left: "5.5rem",
              }}
            >
              <LoginTitle>로그인</LoginTitle>
              <Form
                onSubmit={
                  onSubmit as (e: React.FormEvent<HTMLFormElement>) => void
                }
              >
                <Input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.currentTarget.value);
                  }}
                  placeholder="이메일을 입력해주세요."
                />
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.currentTarget.value);
                  }}
                  placeholder="비밀번호를 입력해주세요."
                />
                <Button
                  type="submit"
                  disabled={isButtonDisabled || !allFieldsFilled}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  로그인
                </Button>
              </Form>
              <Link to="/signup">
                <Account
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  계정이 없으신가요?
                </Account>
              </Link>
            </div>
          </div>
        </div>
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(6, 4, 52, 0.95)",
            zIndex: 999,
          }}
          initial={{ opacity: 0, visibility: "hidden" }}
          animate={{
            opacity: fadeOut ? 1 : 0,
            visibility: fadeOut ? "visible" : "hidden",
            transition: { duration: 0.8 },
          }}
          exit={{
            opacity: 0,
            visibility: "hidden",
            transition: { duration: 0.5 },
          }}
        >
          {/* 로그인 중에 보여줄 컨텐츠 (로딩 스피너 등) */}
          <h2 style={{ color: "#fff" }}>로그인 중...</h2>
        </motion.div>
      </ProgressBackground>
    </>
  );
};
export default LoginPage;
