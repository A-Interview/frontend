declare module "*.png";
declare module "*.svg";
declare module "*.gif";
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    REACT_APP_API_URL_REG: string;
    REACT_APP_API_URL_OUT: string;
    // 다른 환경 변수들도 필요한 경우 여기에 추가합니다.
  }
}
