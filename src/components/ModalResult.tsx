import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ModalView = styled(motion.div).attrs((props) => ({
  role: "dialog",
}))`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  width: 70rem;
  height: 41rem;
  background-color: #fbfbfb;
  box-shadow: 4px 4px 10px 0px rgba(89, 212, 169, 0.5);
`;
const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const ModalBackdrop = styled.div`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(70, 70, 70, 0.17);
  border-radius: 10px;
  height: 100vh;
  width: 100vw;
`;

const Button = styled(motion.button)`
  width: 6rem;
  height: 3rem;
  flex-shrink: 0;
  border: #7c7c7c;
  border-radius: 0.5rem;
  background-color: #7c7c7c;
  color: white;
  font-family: var(--font-r);
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 134.766%;
  margin: 0.75em 0.3rem 0 0;
  cursor: pointer;
`;
const Button2 = styled(motion.button)`
  width: 6rem;
  height: 3rem;
  flex-shrink: 0;
  border: #2185d0;
  border-radius: 0.5rem;
  background-color: #2185d0;
  color: white;
  font-family: var(--font-r);
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 800;
  line-height: 134.766%;
  margin-top: 0.75em;
  cursor: pointer;
`;
interface Type {
  isModalResultOpen: boolean;
  setModalResultOpen: () => void;
  resume: string;
}
const ModalResult = ({
  isModalResultOpen,
  setModalResultOpen,
  resume,
}: Type): JSX.Element => {
  const closeModal = (): void => {
    // 모달창을 닫을 때 사용되는 함수
    setModalResultOpen();
  };
  return (
    <>
      <ModalContainer>
        {isModalResultOpen && (
          <ModalBackdrop
            onClick={() => {
              closeModal();
            }}
          >
            <ModalView
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
              }}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.4 }}
            >
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1.7rem",
                    fontWeight: "600",
                    margin: "1.5rem 0 1.3rem 1.3rem",
                  }}
                >
                  자기소개를 입력하세요
                </div>
                <textarea
                  value={resume}
                  rows={25}
                  cols={130}
                  style={{
                    width: "1119px",
                    height: "488px",
                    border: "1px solid #c7c7c7",
                    backgroundColor: "#fff",
                    fontSize: "20px",
                    resize: "vertical",
                    padding: "20px",
                    outline: "none",
                  }}
                />
                <div
                  style={{
                    textAlign: "right",
                    paddingRight: "1.5rem",
                  }}
                >
                  <Button
                    type="submit"
                    onClick={() => {
                      closeModal();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    취소
                  </Button>
                  <Button2
                    type="submit"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    제출하기
                  </Button2>
                </div>
              </form>
            </ModalView>
          </ModalBackdrop>
        )}
      </ModalContainer>
    </>
  );
};

export default ModalResult;
