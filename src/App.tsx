import React from "react";
import MainPage from "./pages/MainPage";

import StandBy from "./pages/StandBy";
import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./style/GlobalStyle";

import WatingPage from "./pages/WatingPage";
import InterviewResultPage from "./pages/InterviewResultPage";
import MyPage from "./pages/MyPage";
import InterviewProgressPage from "./pages/InterviewProgressPage";

function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/standby" element={<StandBy />} />
        <Route path="/wating-room" element={<WatingPage />} />
        <Route path="/interview-result" element={<InterviewResultPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/interview-progress" element={<InterviewProgressPage />} />
      </Routes>
    </>
  );
}

export default App;
