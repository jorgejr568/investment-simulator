FROM node:lts-alpine AS build
WORKDIR /build

RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:stable-alpine
COPY --from=build /build/dist /usr/share/nginx/html
EXPOSE 80
