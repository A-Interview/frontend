import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import {
  SaveSignUpstateToSessionStorage,
  SaveUserNameStateToSessionStorage,
} from "../state/Atom";
const NavBarBackGround = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  background: #040320;
  justify-content: space-between;
  position: absolute;
  top: 0;
  padding-right: 2em;
  padding-left: 2em;
`;
const NavBarTitle = styled(motion.div)`
  color: #fff;
  font-size: 1.3125rem;
  font-family: var(--font-e);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
  overflow: visible;
  cursor: pointer;
`;
const TitleInform = styled.div`
  display: flex;
  flex-direction: row;
  color: #fff;
  font-size: 1.125rem;
  font-family: var(--font-r);
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  gap: 2rem;
`;
const NavItem1 = styled(motion.div)`
  margin: auto;
  font-family: var(--font-r);
  color: #fff;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: none;
  cursor: pointer;
  overflow: visible;
  z-index: 1;
`;
const Username = styled.p`
  margin: auto;
  font-family: var(--font-r);
  color: #59d4a9;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: none;
  cursor: pointer;
  overflow: visible;
`;
const LoginButton = styled(motion.button)`
  width: 8.75rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.75rem;
  border: 1px solid #fff;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
  text-align: center;
  font-size: 1.125rem;
  font-family: var(--font-r);
  font-style: normal;
  font-weight: 400;
  line-height: 134.766%;
  margin: auto;
  background: transparent;
  cursor: pointer;
`;
const NavBar = (): JSX.Element => {
  const [username, setUserName] = useState<string>("");
  const [signupNow, setSignupNow] = useState("false");
  useEffect(() => {
    const user = sessionStorage.getItem("user_name_state");
    const signupState = sessionStorage.getItem("sign_up_state");

    if (user != null) {
      setUserName(user);
    }
    if (signupState != null) {
      setSignupNow(signupState);
    }
  }, []);

  const handleLogout = (): void => {
    try {
      const refreshToken: string | null = sessionStorage.getItem("refresh");
      if (refreshToken != null) {
        // 비동기 작업인 axios.post를 여기서 호출하지 않고,
        // 로그아웃 처리를 하기 위한 함수로 분리합니다.
        logoutAsync()
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutAsync = async (): Promise<void> => {
    await axios.post("/api/users/logout/", {
      refresh: sessionStorage.getItem("refresh_token"),
    });

    // 기타 로그아웃과 관련된 비동기 작업 수행
    SaveUserNameStateToSessionStorage("");
    SaveSignUpstateToSessionStorage("false");
    const signUpState = sessionStorage.getItem("sign_up_state");
    if (signUpState != null) {
      setSignupNow(signUpState);
    }
  };

  return (
    <NavBarBackGround>
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <NavBarTitle
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        >
          A-Interview
        </NavBarTitle>
      </Link>
      <TitleInform>
        <Link
          to="/Mypage"
          style={{
            display: "flex",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          <NavItem1
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          >
            마이페이지
          </NavItem1>
        </Link>
        <Username>
          {signupNow === "true" ? `${username} 님 환영합니다` : ""}
        </Username>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {signupNow === "true" ? (
            <LoginButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              onClick={handleLogout}
            >
              로그아웃
            </LoginButton>
          ) : (
            <Link
              to="/login"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LoginButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                로그인
              </LoginButton>
            </Link>
          )}
        </div>
      </TitleInform>
    </NavBarBackGround>
  );
};
export default NavBar;
