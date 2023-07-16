import { atom } from "recoil";

export interface User {
  email: string;
  password: string;
  password2: string;
}

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});
