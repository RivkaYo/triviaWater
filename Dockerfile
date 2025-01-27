FROM node:22.5.0

WORKDIR /clients/main

COPY clients/main/package*.json ./
RUN npm install -g pnpm
RUN pnpm install

WORKDIR /server

COPY server/package*.json ./
RUN npm install -g pnpm
RUN pnpm install

WORKDIR /

COPY . .

CMD ["pnpm", "start"]
