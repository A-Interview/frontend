import React from "react";
import MainPage from "./pages/MainPage";
import GlobalStyle from "./style/GlobalStyle";
function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <MainPage />
    </>
  );
}

export default App;
