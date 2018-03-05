FROM node:8.9.4-alpine
EXPOSE 8181

WORKDIR /usr/src

COPY . .

ENTRYPOINT ["npm", "run", "server"]