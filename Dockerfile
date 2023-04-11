ARG BUILD_ENV="build:stage"

FROM node:16
ARG BUILD_ENV
WORKDIR /app/camino-block-explorer

COPY ./ /app/camino-block-explorer/
RUN yarn install
RUN yarn $BUILD_ENV
