import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ResumeImage from "../assets/img/ResumeImage.png";

const ModalView = styled(motion.div).attrs((props) => ({
  role: "dialog",
}))`
  display: flex;
  align-items: center;
  flex-direction: column;
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
  width: 4rem;
  height: 2.5rem;
  flex-shrink: 0;
  border: #717fff;
  border-radius: 0.5rem;
  background-color: #717fff;
  color: white;
  font-family: var(--font-r);
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 800;
  line-height: 134.766%;
  margin-left: 0.55rem;
  cursor: pointer;
`;
const ResumeImage1 = styled(motion.img)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 80vw;
  max-height: 80vh;
  width: auto;
  height: auto;
`;
const Textarea = styled.textarea`
  width: 720px;
  height: 357px;
  border: none;
  background-color: rgb(77 77 77 / 0.08%);
  font-size: 20px;
  resize: vertical;
  padding: 10px 20px 10px 10px;
  outline: none;
  color: white;

  /* 스크롤바 스타일 추가 */
  scrollbar-width: thin;
  scrollbar-color: #dedede #303150;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #dedede;
  }
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
            <ResumeImage1 src={ResumeImage}></ResumeImage1>
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
                  zIndex: "1000",
                }}
              >
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "500",
                    margin: "1rem 0rem 0.5rem",
                    color: "white",
                  }}
                >
                  자기소개를 입력하세요
                </div>
                <Textarea value={resume} rows={25} cols={130} />
                <div
                  style={{
                    textAlign: "right",
                    marginTop: "0.9rem",
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
                    확인
                  </Button>
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
