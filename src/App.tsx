import React from "react";
import MainPage from "./pages/MainPage";

import StandBy from "./pages/StandBy";
import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./style/GlobalStyle";

import WatingPage from "./pages/WatingPage";
import InterviewResultPage from "./pages/InterviewResultPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/standby" element={<StandBy />} />
        <Route path="/wating-room" element={<WatingPage />} />
        <Route path="/interview-result" element={<InterviewResultPage />} />
        <Route path="/login" element={<LoginPage></LoginPage>} />
        <Route path="/signup" element={<SignupPage></SignupPage>} />
      </Routes>
    </>
  );
}

export default App;
