import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
const NavItem1 = styled.a`
  margin: auto;
  font-family: var(--font-r);
  color: #fff;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: none;
  cursor: pointer;
`;
const NavItem2 = styled.a`
  margin: auto;
  font-family: var(--font-r);
  color: #fff;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: none;
  cursor: pointer;
`;
const NavItem3 = styled.a`
  margin: auto;
  font-family: var(--font-r);
  color: #fff;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: none;
  cursor: pointer;
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
        <NavItem1 href="MyPage">마이페이지</NavItem1>
        <NavItem2 href="/">링크 1</NavItem2>
        <NavItem3 href="/">링크 2</NavItem3>
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
      </TitleInform>
    </NavBarBackGround>
  );
};

export default NavBar;
