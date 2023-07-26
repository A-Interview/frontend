import React from "react";
import styled from "styled-components";
import { SaveCurrentFormIdToSessionStorage } from "../state/Atom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const FormContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const FormName = styled.div`
  color: #fff;
  text-align: center;
  font-family: var(--font-b);
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 700;
  line-height: 134.766%;
`;

const FormDate = styled.div`
  color: #dcdcdc;
  text-align: center;
  font-family: var(--font-r);
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: 134.766%;
`;

const ApplyFormWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

interface Props {
  jobName: string;
  createdAt: string;
  id: number;
}
const ApplyForm = ({ jobName, createdAt, id }: Props): JSX.Element => {
  const navigate = useNavigate();

  // Form을 선택할 때, 새로운 Form 생성 유도하는 함수.
  const selectForm = (id: number): void => {
    axios
      .get(`api/forms/user/${id}`)
      .then((res) => {
        const copyData = res.data[0];
        copyDataToForm(copyData);
      })
      .catch((error) => {
        console.log(error);
      });

    navigate("/standby");
  };

  // 데이터를 카피하고 새로운 POST를 하는 함수
  const copyDataToForm = (copyData: any): void => {
    const accessToken: string | null = sessionStorage.getItem("access_token");
    if (accessToken != null) {
      axios
        .post(
          process.env.REACT_APP_API_URL_FORM,
          {
            sector_name: copyData.sector_name,
            job_name: copyData.job_name,
            career: copyData.career,
            resume: copyData.resume,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          checkFormNumber();
          SaveCurrentFormIdToSessionStorage(res.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // 현재 Form의 갯수가 4개를 넘어가는 지 체크하는 함수
  const checkFormNumber = (): void => {
    const accessToken: string | null = sessionStorage.getItem("access_token");
    if (accessToken != null) {
      axios
        .get("/api/forms", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data.length);
          if (res.data.length >= 5) {
            const firstDataId = res.data[0].id;
            console.log(firstDataId);
            deleteFirst(firstDataId);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // 만약에 4개를 넘어간다면, 제일 오래된 Form을 삭제
  const deleteFirst = (firstData: number): void => {
    axios
      .delete(`/api/forms/user/${firstData.toString()}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ApplyFormWrapper
      onClick={(e: any) => {
        selectForm(id);
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="219"
        height="159"
        viewBox="0 0 219 159"
        fill="none"
      >
        <path
          d="M18.25 28.7576C8.17053 28.7576 0 35.2281 0 43.1364V143.788C0 151.696 8.1708 158.167 18.25 158.167H200.75C210.833 158.167 219 151.696 219 143.788V43.1364C219 35.2281 210.833 28.7576 200.75 28.7576H18.25Z"
          fill="#2980B9"
        />
        <path
          d="M27.3752 0C17.2958 0 9.12524 6.47045 9.12524 14.3788V115.03C9.12524 122.939 17.2958 129.409 27.3752 129.409H127.75H173.375H191.625C201.708 129.409 209.875 122.939 209.875 115.03V50.3258V28.7576C209.875 20.8492 201.708 14.3788 191.625 14.3788H173.375H127.75H118.625L91.2503 0H27.3752Z"
          fill="#2980B9"
        />
        <path
          d="M209.875 93.4622V35.947C209.875 28.0387 201.708 21.5682 191.625 21.5682H91.2503H45.6252H27.3752C17.2958 21.5682 9.12524 28.0387 9.12524 35.947V93.4622H209.875Z"
          fill="#E4E4E4"
        />
        <path
          d="M18.25 28.7576C8.17053 28.7576 0 35.2281 0 43.1364V86.2728V93.4622V136.599C0 144.507 8.1708 150.977 18.25 150.977H200.75C210.833 150.977 219 144.507 219 136.599V93.4622V86.2728V43.1364C219 35.2281 210.833 28.7576 200.75 28.7576H18.25Z"
          fill="#005F9E"
        />
      </svg>

      <FormContainer>
        <FormName>{jobName}</FormName>
        <FormDate>{createdAt.split("T")[0]}</FormDate>
      </FormContainer>
    </ApplyFormWrapper>
  );
};

export default ApplyForm;
