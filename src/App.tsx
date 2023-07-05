import React from "react";
import MainPage from "./pages/MainPage";
import GlobalStyle from "./style/GlobalStyle";
import { Route, Routes } from "react-router-dom";
import WatingPage from "./pages/WatingPage";

function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/wating-room" element={<WatingPage />} />
      </Routes>
    </>
  );
}

export default App;
