FROM node:22.5.0

WORKDIR /triviaWater
COPY package*.json ./
COPY . .

RUN npm install -g pnpm
RUN pnpm install

WORKDIR /clients/main
COPY clients/main/package*.json ./

WORKDIR /server
COPY server/package*.json ./

WORKDIR /triviaWater

CMD ["pnpm", "turbo", "dev"]
