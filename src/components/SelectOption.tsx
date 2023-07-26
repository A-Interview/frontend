import React, { useState } from "react";
import styled from "styled-components";
import {
  SaveDeepNumToSessionStorage,
  SaveDefaultNumToSessionStorage,
  SavePersonalNumToSessionStorage,
  SaveSituationNumToSessionStorage,
} from "../state/Atom";

const Label = styled.div`
  color: #fff;
  text-align: center;
  font-family: var(--font-r);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 134.766%; /* 1.68456rem */
`;
const NumCount = styled.ul<{ show: boolean }>`
  overflow-y: scroll;
  border: none;
  max-height: ${(props) => (props.show ? "9rem" : "0")};
  z-index: 2;
  list-style: none;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #ccc;
  }
`;

const SelectBox = styled.div`
  top: 30%;
  transform: translate(0, -0.8rem);
  position: relative;
  width: 100%;
  padding: 8px;
  border-radius: 12px;
  background-color: transparent;
  align-self: center;
  cursor: pointer;
  z-index: 2;
`;

const NumLi = styled.li`
  transition: background-color 0.2s ease-in;
  color: #fefefe;
  &:hover {
    background-color: #595959;
  }
  z-index: 2;
  font-family: var(--font-b);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
`;

const SelectIcon = styled.div`
  position: absolute;
  width: 1.3125rem;
  height: 0.625rem;
  z-index: 2;
  right: 0;
  top: 0.5rem;
`;

const SelectName = styled.div`
  color: #fff;
  text-align: center;
  font-family: var(--font-b);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 134.766%; /* 1.68456rem */
`;
interface Props {
  currentValue: number;
  setCurrentValue: any;
  name: string;
}

const SelectOption = ({
  currentValue,
  setCurrentValue,
  name,
}: Props): JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);
  const handleOnChangeSelectValue = (e: any): void => {
    const { value } = e.target;
    if (name === "기본면접") {
      SaveDefaultNumToSessionStorage(value);
    } else if (name === "상황면접") {
      SaveSituationNumToSessionStorage(value);
    } else if (name === "심층면접") {
      SaveDeepNumToSessionStorage(value);
    } else if (name === "성향면접") {
      SavePersonalNumToSessionStorage(value);
    }
    setCurrentValue(value);
  };

  return (
    <>
      <SelectName>{name}</SelectName>
      <SelectBox
        onClick={() => {
          setShowOptions((prev) => !prev);
        }}
      >
        <Label>{currentValue}개</Label>
        <NumCount show={showOptions}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) => (
            <NumLi
              key={index}
              value={value}
              onClick={handleOnChangeSelectValue}
            >
              {value}개
            </NumLi>
          ))}
        </NumCount>
        <SelectIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="8"
            viewBox="0 0 19 8"
            fill="none"
          >
            <path d="M9.5 8L18.5933 0.5H0.406734L9.5 8Z" fill="white" />
          </svg>
        </SelectIcon>
      </SelectBox>
    </>
  );
};

export default SelectOption;
