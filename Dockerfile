FROM node:12.13.1
WORKDIR /usr/src/app

COPY . .
RUN npm i

ENV NODE_ENV=prod
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
