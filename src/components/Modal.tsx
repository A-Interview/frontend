import React, { useState } from "react";
import styled from "styled-components";
import FileAddImage from "../assets/img/FileAddImage.png";

import { useDropzone } from "react-dropzone";

const Text = styled.text`
  color: #f4f6f6;
  text-align: left;
  font-family: var(--font-l);
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: 127.075%;
  margin: auto;
  cursor: pointer;
`;

const ModalContainer = styled.div`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalBtn = styled.button`
  border-radius: 0.9375rem;
  border: 1px solid #76878d;
  background: rgba(0, 0, 0, 0.14);
  width: 45%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ExitBtn = styled(ModalBtn)`
  background-color: #4000c7;
  border-radius: 10px;
  text-decoration: none;
  margin: 10px;
  padding: 5px 10px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.
  role: "dialog",
}))`
  // Modal창 CSS를 구현합니다.
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 500px;
  height: 200px;
  background-color: #ffffff;
`;

const SelfIntroContainer = styled.div`
  display: flex;
  width: 100%;
  height: 2.5rem;
  justify-content: space-between;
  margin-top: 1rem;
`;
const FileAddImg = styled.img`
  margin-left: 1rem;
  cursor: pointer;
`;

const FileAddButton = styled.div`
  border-radius: 0.9375rem;
  border: 1px solid #76878d;
  background: rgba(0, 0, 0, 0.14);
  width: 45%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const FileUploadModal = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  > div.desc {
    margin: 50px;
    font-size: 20px;
    color: purple;
  }
`;

const Modal = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const openModalHandler = (): void => {
    // isOpen의 상태를 변경하는 메소드를 구현
    // !false -> !true -> !false
    setIsOpen(!isOpen);
  };

  const handleDrop = (acceptedFiles: File[]): void => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: false, // 단일 파일 업로드를 위해 multiple을 false로 설정
  });
  return (
    <>
      <ModalContainer>
        <SelfIntroContainer>
          <ModalBtn
            onClick={openModalHandler}
            // 클릭하면 Modal이 열린 상태(isOpen)를 boolean 타입으로 변경하는 메소드가 실행되어야 합니다.
          >
            <FileAddImg src={FileAddImage} />
            <Text>파일 첨부하기</Text>
          </ModalBtn>
          <FileAddButton style={{ justifyContent: "center" }}>
            <Text>파일 경로 정보</Text>
          </FileAddButton>
        </SelfIntroContainer>
        {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때만 모달창과 배경이 뜰 수 있게 구현 */}
        {isOpen ? (
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
              }}
            >
              <FileUploadModal>
                <ExitBtn onClick={openModalHandler}>x</ExitBtn>
                <div className="desc">파일을 업로드해주세요!</div>
                <div
                  {...getRootProps()}
                  className={`dropzone ${
                    typeof isDragActive === "boolean" && isDragActive
                      ? "active"
                      : ""
                  }`}
                >
                  <input {...getInputProps()} />
                  {typeof isDragActive === "boolean" && isDragActive ? (
                    <p>파일을 여기에 드롭하세요.</p>
                  ) : (
                    <p>
                      파일을 드래그 앤 드롭하거나 클릭하여 파일을 선택하세요.
                    </p>
                  )}
                </div>
                {uploadedFile != null && (
                  <p>업로드된 파일: {uploadedFile.name}</p>
                )}
              </FileUploadModal>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
};

export default Modal;
