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
`;
const NavItem2 = styled.a`
  margin: auto;
`;
const NavItem3 = styled.a`
  margin: auto;
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
  font-family: NanumSquare Neo OTF;
  font-style: normal;
  font-weight: 400;
  line-height: 134.766%;
  margin: auto;
`;
/*
const StartButton = styled.button`
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
  font-family: font(--font-b);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 2rem;
  margin-bottom: 10em;
`; */
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
