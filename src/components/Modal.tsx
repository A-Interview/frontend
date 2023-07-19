import styled from "styled-components";

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
  width: 5.5rem;
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
  margin-top: 1rem;
  margin-left: 75rem;
  cursor: pointer;
`;

const ModalView = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 83rem;
  height: 35rem;
  background-color: #ffffff;
`;

const FileUploadModal = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  >
`;

const Button = styled.button`
  width: 22.75rem;
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
                    cols={150}
                  />
                </div>
                <Button>제출하기</Button>
              </FileUploadModal>
            </ModalView>
          </ModalBackdrop>
        )}
      </ModalContainer>
    </>
  );
};
export default Modal;
