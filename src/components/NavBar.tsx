import React, { type FormEvent, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { signupState, jwtState } from "../state/Atom";
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
  // 로그아웃 처리
  const [signupnow, setSignupState] = useRecoilState(signupState);
  const [jwt, setJwtState] = useRecoilState(jwtState);
  const [username, setUsername] = useState<string>("");

  const handleLogout = async (): Promise<void> => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL_OUT, {
        refresh: jwt.refresh_token,
      });

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

  // 회원 가입 성공 후 사용자 이름 가져오는 함수
  const getUsernameFromServer = async (): Promise<string> => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/users/register/"
      );
      return response.data.username; // 가정: 서버에서 받아온 사용자 이름을 반환
    } catch (error) {
      console.log("사용자 이름 가져오기 실패:", error);
      return ""; // 실패 시 빈 문자열 반환
    }
  };

  useEffect(() => {
    // Navbar가 마운트될 때 사용자 이름 가져오기
    if (signupnow) {
      getUsernameFromServer()
        .then((name) => {
          setUsername(name);
        })
        .catch((error) => {
          console.log("사용자 이름 가져오기 실패:", error);
        });
    }
  }, [signupnow]);

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
        {signupnow && <Username>{username}님, 환영합니다</Username>}
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
