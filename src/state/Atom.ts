import { atom } from "recoil";

export const defaultQeustionNum = atom({
  key: "defaultQuestionNum",
  default: 3,
});

export const situationQuestionNum = atom({
  key: "situationQuestionNum",
  default: 3,
});

export const deepQuestionNum = atom({
  key: "deepQuestionNum",
  default: 3,
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

export const maxId = atom<number>({
  key: "maxId",
  default: 0,
});
export const personalityQuestionNum = atom({
  key: "personalityQuestionNum",
  default: 3,
});

// 세션 스토리지에 Access토큰 상태 저장
export const SaveAccessTokenToSessionStorage = (token: string): void => {
  sessionStorage.setItem("access_token", token);
};

// 세션 스토리지에 refresh 토큰 상태 저장
export const SaveRefreshTokenToSessionStorage = (token: string): void => {
  sessionStorage.setItem("refresh", token);
};

// 세션 스토리지에 signup state를 저장
export const SaveSignUpstateToSessionStorage = (state: string): void => {
  sessionStorage.setItem("sign_up_state", state);
};

// 세션 스토리지에 username을 저장
export const SaveUserNameStateToSessionStorage = (username: string): void => {
  sessionStorage.setItem("user_name_state", username);
};

export const SaveCurrentFormIdToSessionStorage = (id: string): void => {
  sessionStorage.setItem("form_id", id);
};
