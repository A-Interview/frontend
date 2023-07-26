import styled from "styled-components";
import Swal from "sweetalert2";
import React, { type ChangeEvent, type FormEvent, useState } from "react";
import customCursorImage from "../assets/img/Cursor.png";

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
  /* background-color: rgba(0, 0, 0, 0.4); */
  border-radius: 10px;
  height: 100vh;
  width: 100vw;
  cursor: url(${customCursorImage}), auto;
`;

// const Box = styled.div`
//   width: 4.5rem;
//   height: 3.4375rem;
//   flex-shrink: 0;
//   border-radius: 2.75rem;
//   line-height: 134.766%;
//   margin-top: 0.5rem;
//   margin-bottom: 0.5rem;
//   margin-left: 60rem;
//   cursor: pointer;
// `;

const ModalView = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  width: 70rem;
  height: 37rem;
  background-color: #fbfbfb;
  box-shadow: 4px 4px 10px 0px rgba(89, 212, 169, 0.5);
`;

const Button = styled.button`
  width: 8rem;
  height: 3.4375rem;
  flex-shrink: 0;
  border: #2185d0;
  border-radius: 0.5rem;
  background-color: #2185d0;
  color: white;
  font-family: var(--font-r);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 800;
  line-height: 134.766%;
  margin-top: 0.75em;
  cursor: pointer;
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
      title: "제출 완료",
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
  };

  return (
    <>
      <ModalContainer>
        {isModalOpen && (
          <ModalBackdrop onClick={setModalOpen}>
            <ModalView
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
              }}
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
                    fontSize: "1.7rem",
                    fontWeight: "600",
                    margin: "1.5rem 0 1.3rem 1.3rem",
                  }}
                >
                  자기소개를 입력하세요!
                </div>
                <textarea
                  value={textValue}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    handleTextChange(e);
                  }}
                  rows={25}
                  cols={130}
                  placeholder="내용을 입력하세요."
                  style={{
                    width: "1119px",
                    height: "420px",
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
                  <Button type="submit" onClick={handleButtonClick}>
                    제출하기
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
export default Modal;
