FROM node:13.12.0-alpine

# set working directory
# 작업을 수행할 디렉토리를 지정
WORKDIR /frontend

ENV CHOKIDAR_USEPOLLING=true

COPY package*.json .
# 현재 경로에 있는 것을 frontend로 복사


RUN npm cache clean --force

RUN npm install

COPY . ./

# 배포 시에는 build 파일이 쓰이지 않으므로 상관 없음
RUN npm run build