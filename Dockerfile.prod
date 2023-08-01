FROM node:13.12.0-alpine as builder
WORKDIR /frontend
COPY ./package.json .
RUN npm i
RUN npm cache clear --force
COPY ./ ./
RUN npm run build

FROM nginx
EXPOSE 80
EXPOSE 443

RUN rm /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /frontend/build /var/www/frontend