FROM node:20

WORKDIR /apps

COPY package.json .
RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]