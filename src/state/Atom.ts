import { atom } from "recoil";

// 회원가입 상태 확인
export const signupState = atom({
  key: "user",
  default: false,
});

// jwt 상태 확인
export const jwtState = atom({
  key: "access_token",
  default: {
    access_token: "",
    refresh_token: "",
  },
});

// 사용자 이름 상태 확인
export const usernameState = atom({
  key: "usernameState",
  default: "",
});

export const formId = atom({
  key: "formId",
  default: {
    id: 0,
    sectorname: "",
    jobname: "",
    career: "",
    resume: "",
  },
});
