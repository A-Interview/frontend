import styled from "styled-components";
import Swal from "sweetalert2";
import React, { type ChangeEvent, type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { SaveCurrentFormTrueToSessionStorage } from "../state/Atom";
import ResumeImage from "../assets/img/ResumeImage.png";

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

const ModalView = styled(motion.div).attrs((props) => ({
  role: "dialog",
}))`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;
`;

const Button = styled(motion.button)`
  width: 4rem;
  height: 2.5rem;
  flex-shrink: 0;
  border: #4d4d4d;
  border-radius: 0.5rem;
  background-color: #4d4d4d;
  color: white;
  font-family: var(--font-r);
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 800;
  line-height: 134.766%;
  cursor: pointer;
`;
const Button2 = styled(motion.button)`
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
  isModalOpen: boolean;
  setModalOpen: () => void;
  updateResume: (newResume: string) => void;
}
const Modal = ({
  isModalOpen,
  setModalOpen,
  updateResume,
}: Type): JSX.Element => {
  const [textValue, setTextValue] = useState("");

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setTextValue(e.target.value);
  };

  const handleButtonClick = (): void => {
    Swal.fire({
      title: "저장 완료",
      icon: "success",
      toast: true,
      position: "center",
      showConfirmButton: true,
      width: "auto",
      html: `
    <div style="display: flex; flex-direction: column; align-items: center;">
    `,
    })
      .then((result) => {
        if (result.isConfirmed) {
          setModalOpen(); // 모달 창 닫기
        }
      })
      .catch((error) => {
        console.error("오류가 발생했습니다:", error);
      });
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    updateResume(textValue);
    setModalOpen();
    SaveCurrentFormTrueToSessionStorage(true);
  };
  const closeModal = (): void => {
    // 모달창을 닫을 때 사용되는 함수
    setModalOpen();
  };

  return (
    <>
      <ModalContainer>
        {isModalOpen && (
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
                }}
                onSubmit={
                  onSubmit as (e: React.FormEvent<HTMLFormElement>) => void
                }
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
                <Textarea
                  value={textValue}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    handleTextChange(e);
                  }}
                  maxLength={800}
                  rows={25}
                  cols={130}
                  placeholder="내용을 입력하세요."
                />
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
                    취소
                  </Button>
                  <Button2
                    type="submit"
                    onClick={handleButtonClick}
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
export default Modal;
