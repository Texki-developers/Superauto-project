FROM node:20

WORKDIR /apps

COPY package.json .
# RUN npm install -g pnpm
RUN npm install --force

COPY . .

CMD ["npm", "run", "dev"]