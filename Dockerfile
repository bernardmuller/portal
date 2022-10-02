FROM node:lts

WORKDIR /app

COPY package.json .
COPY tsconfig.json ./

RUN npm install
COPY . . 

EXPOSE 8080

CMD npm start