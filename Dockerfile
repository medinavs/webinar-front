FROM node:23-alpine3.22 AS builder

ENV PORT=8000
ENV NODE_OPTIONS=--max_old_space_size=4096

WORKDIR /app

COPY . /app

CMD ["/bin/sh", "-c", "npm start"]