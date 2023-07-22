import React, { type FormEvent } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import { signupState, jwtState, usernameState } from "../state/Atom";
import axios from "axios";
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
const NavBarTitle = styled.div`
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
const NavItem1 = styled.div`
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
  // const [user, setUser] = useRecoilState(signupState);
  const [signupnow, setSignupState] = useRecoilState(signupState);
  const [jwt, setJwtState] = useRecoilState(jwtState);
  const username = useRecoilValue(usernameState);
  const setRecoilUser = useRecoilState(usernameState)[1]; // useSetRecoilState로 변경

  const handleLogout = async (): Promise<void> => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL_OUT, {
        refresh: jwt.refresh_token,
      });
      setRecoilUser(""); // 로그아웃 시 username 초기화
      setSignupState(false);
      console.log("로그아웃 성공", signupnow);
      setJwtState(response.data.refresh);
    } catch (error) {
      console.log("로그아웃 실패:", error);
    }
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await handleLogout();
    } catch (error) {
      console.log("로그아웃 실패:", error);
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
        <NavBarTitle>A-Interview</NavBarTitle>
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
          <NavItem1>마이페이지</NavItem1>
        </Link>
        <Username>{signupnow ? `${username} 님 환영합니다` : ""}</Username>
        <form
          onSubmit={onSubmit as (e: React.FormEvent<HTMLFormElement>) => void}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {signupnow ? (
            <LoginButton
              type="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              로그 아웃
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
        </form>
      </TitleInform>
    </NavBarBackGround>
  );
};
export default NavBar;
