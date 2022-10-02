FROM node:lts

WORKDIR /app

COPY package.json .

COPY tsconfig.json ./

COPY . . 

EXPOSE 8080

CMD npm start