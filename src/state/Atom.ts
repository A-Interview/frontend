import { atom } from "recoil";

// 회원가입 상태 확인
export const signupState = atom({
  key: "user",
  default: false,
});

// jwt 상태 확인
export const jwtState = atom({
  key: "jwtState",
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
