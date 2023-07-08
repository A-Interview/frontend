import React from "react";
import { styled } from "styled-components";
import { ReactComponent as Blurry } from "../assets/img/Blurry.svg";
import StandByArch from "../assets/img/StandByArch.png";

const BackWard = styled.div`
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
`;
const StandByBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: #060434;
  position: relative;
`;

const StandByInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StandByBlurry = styled.svg`
  fill: radial-gradient(
    50% 50% at 50% 50%,
    rgba(170, 211, 198, 0.69) 0%,
    rgba(116, 159, 177, 0) 100%
  );
  opacity: 1;
  width: 80rem;
  height: 40rem;
  transform: rotate(0deg);
  display: flex;
  position: absolute;
`;

const StandByArchImg = styled.img`
  width: 100%;
  height: 40.75rem;
  position: absolute;
  top: 10rem;
  align-items: center;
`;

const StandByText = styled.p`
  width: 58%;
  color: #fff;
  text-align: center;
  font-family: var(--font-r);
  font-size: 2.7rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: fixed;

  top: 48%;
  left: 21%;
  right: 10%;
  bottom: 2rem;
  @media only screen and (max-width: 1300px) {
    font-size: 2rem;
  }
`;

const StandByButton = styled.button`
  width: 21.5625rem;
  height: 5.75rem;
  flex-shrink: 0;
  border-radius: 5rem;
  box-shadow: 0px 4px 10px 0px rgba(89, 212, 169, 0.5);

  color: #fff;
  text-align: center;
  font-family: var(--font-r);
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 800;
  line-height: 134.766%;
  position: absolute;
  bottom: 20%;
  margin-left: auto;
  margin-right: auto;
  background: transparent;

  
}
`;

const StandBy = (): JSX.Element => {
  return (
    <div>
      <StandByBackground>
        <BackWard>
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
        <StandByInfo>
          <div style={{ position: "relative" }}>
            <StandByBlurry />
            {
              <div style={{ position: "absolute", top: "5%", left: "5%" }}>
                <Blurry />
              </div>
            }
          </div>

          <StandByArchImg src={StandByArch} />
          <StandByText>
            <span style={{ color: "#86e7b8" }}>면접</span>은 주변 소음이 없는
            곳에서 진행해야 합니다. 긴장을 풀어주시고, 준비되면 시작하세요.
          </StandByText>
        </StandByInfo>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <StandByButton>면접 시작</StandByButton>
        </div>
      </StandByBackground>
    </div>
  );
};

export default StandBy;
