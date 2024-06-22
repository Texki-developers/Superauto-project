FROM node:20

WORKDIR /apps

COPY package.json .
RUN npm install -g pnpm
RUN pnpm install

COPY . .

CMD [ "pnpm", "run", "dev" ]