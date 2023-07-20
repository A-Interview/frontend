FROM node:18

USER root 

# 작업 디렉토리 생성
WORKDIR /frontend

# 앱 종속성 설치
COPY . /frontend
RUN npm install

# 소스 코드 복사
COPY . ./

# React 개발 서버 실행 (포트 3000을 호스트의 3000에 바인딩)
EXPOSE 3000
CMD ["npm", "run", "build"]