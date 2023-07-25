import React from "react";
import styled from "styled-components";
import customCursorImage from "../assets/img/Cursor.png";

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
  cursor: url(${customCursorImage}), auto;
`;
const Box = styled.div`
  width: 4.5rem;
  height: 3.4375rem;
  flex-shrink: 0;
  border-radius: 2.75rem;
  line-height: 134.766%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 60rem;
  cursor: pointer;
`;
const FileUploadModal = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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
  return (
    <>
      <ModalContainer>
        {isModalResultOpen && (
          <ModalBackdrop onClick={setModalResultOpen}>
            <ModalView
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
              }}
            >
              <FileUploadModal>
                <Box onClick={setModalResultOpen}></Box>
                <textarea
                  value={resume}
                  rows={25}
                  cols={130}
                  style={{
                    width: "1119px",
                    height: "488px",
                    border: "1px solid rgb(232 232 232)",
                    borderRadius: "0 0 40px 40px",
                    backgroundColor: "rgb(232 232 232)",
                    fontSize: "20px",
                    resize: "vertical",
                    padding: "20px",
                    outline: "none",
                  }}
                />
              </FileUploadModal>
            </ModalView>
          </ModalBackdrop>
        )}
      </ModalContainer>
    </>
  );
};

export default ModalResult;
