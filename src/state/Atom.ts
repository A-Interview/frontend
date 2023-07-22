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

export const formId = atom({
  key: "formId",
  default: {
    id: 0,
  },
});
