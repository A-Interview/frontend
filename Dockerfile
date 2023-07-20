# 빌드 단계
FROM node:14 as build
WORKDIR /app

# 소스 코드 복사
COPY . .

# 의존성 설치 및 애플리케이션 빌드
RUN npm install
RUN npm run build

# 실행 단계
FROM node:14-alpine
WORKDIR /app

# 빌드된 앱 파일 복사
COPY --from=build /app/build /app

# 필요한 종속성 설치
RUN npm install -g serve

# 앱 실행
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]