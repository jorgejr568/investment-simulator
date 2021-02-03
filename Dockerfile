FROM node:current-alpine3.12 as build
WORKDIR /build

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /build/dist /usr/share/nginx/html

