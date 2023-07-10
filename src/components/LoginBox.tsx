import React from "react";
import styled from "styled-components";
import LoginBoxImage from "../assets/img/LoginBoxImage.png";
const LoginBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: #060434;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LoginBoxImg = styled.div`
  width: 29.5rem;
  height: 35.25rem;
  flex-shrink: 0;
  background: url(${LoginBoxImage});
  //padding: 2rem;
  gap: 1rem;
`;
const LoginTitle = styled.p`
  display: flex;
  text-align: center;
  //width: 7.5625rem;
  height: 2.1875rem;
  //flex-direction: column;
  flex-shrink: 0;
  color: #fff;
  font-family: NanumSquare Neo OTF;
  font-size: 1.5625rem;
  font-style: normal;
  font-weight: 900;
  line-height: 140.625%;
  margin-top: 4rem;
  margin-bottom: 1rem;
  //margin-left: 11rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  width: 30rem;
`;
const Input1 = styled.div`
  width: 22.74931rem;
  height: 4.55425rem;
  flex-shrink: 0;
  border-radius: 1.625rem;
  border: 1px solid #000;
  background: #fff;
  //margin-left: 3.5rem;
  //margin-top: 10rem;
  color: rgba(0, 0, 0, 0.5);
  font-family: Roboto;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 350%;
  padding-left: 20px;
`;
const Input2 = styled.div`
  width: 22.74931rem;
  height: 4.55425rem;
  flex-shrink: 0;
  border-radius: 1.625rem;
  border: 1px solid #000;
  background: #fff;
  //margin-left: 3.5rem;
  //margin-top: 1rem;
  color: rgba(0, 0, 0, 0.5);
  font-family: Roboto;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 350%;
  padding-left: 20px;
`;
const Button = styled.button`
  width: 22.75rem;
  height: 3.4375rem;
  flex-shrink: 0;
  border-radius: 1.1875rem;
  background: #464759;
  box-shadow: 0px 4px 10px 0px rgba(89, 212, 169, 0.5);
  border-radius: 2.75rem;
  color: #59d4a9;
  font-family: NanumSquare Neo OTF;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 800;
  line-height: 134.766%;
  margin-top: 1rem;
`;
const Account = styled.div`
  text-align: center;
  font-family: NanumSquare Neo OTF;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  color: white;
  line-height: normal;
  text-decoration-line: underline;
  //display: flex;
  width: 26.25rem;
  height: 4.25rem;
  //flex-direction: column;
  //justify-content: center;
  flex-shrink: 0;
  //margin-left: 1.5rem;
`;
const LoginPage = (): JSX.Element => {
  return (
    <div>
      <LoginBackground>
        <div
          style={{
            display: "flex",
            position: "relative",
          }}
        >
          <LoginBoxImg>
            <div
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2rem",
              }}
            >
              <LoginTitle>로그인</LoginTitle>
              <Form>
                <Input1>이메일 입력</Input1>
                <Input2>비밀번호 입력</Input2>
              </Form>
              <Button
                type="submit"
                // onClick={handleSubmit}
              >
                로그인
              </Button>
              <Account>계정이 없으신가요?</Account>
            </div>
          </LoginBoxImg>
        </div>
      </LoginBackground>
    </div>
  );
};
export default LoginPage;
