import React from "react";
import MainPage from "./pages/MainPage";

import StandBy from "./pages/StandBy";
import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./style/GlobalStyle";

import WatingPage from "./pages/WatingPage";
import InterviewResultPage from "./pages/InterviewResultPage";
import InterviewProgressPage from "./pages/InterviewProgressPage";
import LoginPage from "./pages/LoginPage";
import LoginBox from "./components/LoginBox";

function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/standby" element={<StandBy />} />
        <Route path="/wating-room" element={<WatingPage />} />
        <Route path="/interview-result" element={<InterviewResultPage />} />
        <Route path="/interview-progress" element={<InterviewProgressPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loginbox" element={<LoginBox />} />
      </Routes>
    </>
  );
}

export default App;
