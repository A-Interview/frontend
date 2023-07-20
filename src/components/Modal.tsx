import styled from "styled-components";
import Swal from "sweetalert2";

import React, { type ChangeEvent, useState } from "react";

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
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  height: 100vh;
  width: 100vw;
`;

const ExitBtn = styled.button`
  width: 4.5rem;
  height: 3.4375rem;
  flex-shrink: 0;
  border-radius: 1.1875rem;
  background: #464759;
  box-shadow: 0px 4px 10px 0px rgba(89, 212, 169, 0.5);
  border-radius: 2.75rem;
  color: #59d4a9;
  font-family: var(--font-r);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 800;
  line-height: 134.766%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 60rem;
  cursor: pointer;
`;

const ModalView = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 40px;
  width: 70rem;
  height: 35rem;
  background-color: #a9a9a9;
  box-shadow: 4px 4px 10px 0px rgba(89, 212, 169, 0.5);
`;

const FileUploadModal = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  width: 8rem;
  height: 3.4375rem;
  flex-shrink: 0;
  border-radius: 1.1875rem;
  background: #464759;
  box-shadow: 0px 4px 10px 0px rgba(89, 212, 169, 0.5);
  border-radius: 2.75rem;
  color: #59d4a9;
  font-family: var(--font-r);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 800;
  line-height: 134.766%;
  margin-top: 0.5rem;
  cursor: pointer;
`;
interface Type {
  isModalOpen: boolean;
  setModalOpen: () => void;
}
const Modal = ({ isModalOpen, setModalOpen }: Type): JSX.Element => {
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
      // timer: 1000,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "제출",
      cancelButtonText: "취소",
      showCancelButton: true,
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

  return (
    <>
      <ModalContainer>
        {isModalOpen && (
          <ModalBackdrop
            onClick={setModalOpen}
            style={{
              position: "absolute",
            }}
          >
            <ModalView
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
              }}
            >
              <FileUploadModal>
                <ExitBtn onClick={setModalOpen}>닫기</ExitBtn>
                <div>
                  <textarea
                    value={textValue}
                    onChange={handleTextChange}
                    rows={25}
                    cols={130}
                    style={{
                      width: "1119px",
                      height: "487px",
                      border: "1px solid #ccc",
                      borderRadius: "0 0 40px 40px",
                      backgroundColor: "#ccc",
                      fontSize: "15px",
                      resize: "vertical",
                      padding: "10px",
                      outline: "none",
                    }}
                  />
                </div>
                <Button onClick={handleButtonClick}>제출</Button>
              </FileUploadModal>
            </ModalView>
          </ModalBackdrop>
        )}
      </ModalContainer>
    </>
  );
};
export default Modal;
