import React from "react";
import styled from "styled-components";

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

const NavBarTitle = styled.h1`
  color: #fff;
  font-size: 1.3125rem;
  font-family: NanumSquare Neo OTF;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
  overflow: visible;
`;

const TitleInform = styled.div`
  display: flex;
  flex-direction: row;
  color: #fff;
  font-size: 1.125rem;
  font-family: NanumSquare Neo OTF;
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
`;

const LoginButton = styled.button`
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
`;

const NavBar = (): JSX.Element => {
  return (
    <NavBarBackGround>
      <NavBarTitle>A-Interview</NavBarTitle>
      <TitleInform>
        <NavItem1 href="MyPage">마이페이지</NavItem1>
        <NavItem2 href="Link1">링크 1</NavItem2>
        <NavItem3 href="Link2">링크 2</NavItem3>
        <LoginButton>로그인</LoginButton>
      </TitleInform>
    </NavBarBackGround>
  );
};

export default NavBar;
