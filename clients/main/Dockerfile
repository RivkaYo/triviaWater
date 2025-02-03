FROM node:20.11.0 AS builder

# Setup PNPM
RUN corepack enable
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package.json ./
COPY ./pnpm-*.yaml ./
COPY ./clients/main/package.json ./clients/main/package.json
COPY ./scripts/ ./scripts

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install  --frozen-lockfile

COPY ./clients/main ./clients/main

# Build React triviaWater
WORKDIR /app/clients/main

RUN pnpm build

FROM nginx:alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx /etc/nginx

# Copy build files from the 'builder' stage to Nginx server directory
COPY --from=builder /app/clients/main/dist /usr/share/nginx/html

# Copy nginx configuration file
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
#

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
