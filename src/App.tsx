import React from "react";
// import { useRecoilValue } from "recoil";
// import { useAtom } from "./state/Atom";
import MainPage from "./pages/MainPage";

import StandBy from "./pages/StandBy";
import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./style/GlobalStyle";

import WatingPage from "./pages/WatingPage";
import InterviewResultPage from "./pages/InterviewResultPage";
import MyPage from "./pages/MyPage";
import InterviewProgressPage from "./pages/InterviewProgressPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { RecoilRoot } from "recoil";
import Modal from "./components/Modal";

function App(): JSX.Element {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/standby" element={<StandBy />} />
          <Route path="/wating-room" element={<WatingPage />} />
          <Route path="/interview-result" element={<InterviewResultPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route
            path="/interview-progress"
            element={<InterviewProgressPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/modal" element={<Modal />} />
        </Routes>
      </RecoilRoot>
    </>
  );
}

export default App;
