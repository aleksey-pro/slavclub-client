FROM node:12-alpine as builder

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm i

RUN npm run build:prod

#///////////////////////////////////////////
FROM nginx:1.15-alpine

RUN mkdir /app
WORKDIR /app

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist .

EXPOSE 80
