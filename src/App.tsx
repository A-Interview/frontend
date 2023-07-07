import React from "react";
import MainPage from "./pages/MainPage";

import StandBy from "./pages/StandBy";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import GlobalStyle from "./style/GlobalStyle";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <GlobalStyle></GlobalStyle>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/standby" element={<StandBy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
