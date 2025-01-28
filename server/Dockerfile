FROM node:20.11.0

# PNPM environment
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Setup PNPM
RUN corepack enable

# Copy package-related files
WORKDIR /app
COPY ./package.json ./
COPY ./server/package.json ./server/package.json
COPY ./pnpm-*.yaml ./
COPY ./scripts/ ./scripts

# Install sharp separately because it's an optional dependency
WORKDIR /app/server
RUN pnpm add sharp

# Install packages (with PNPM cache) (?)
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --no-optional --frozen-lockfile

# Copy build-related file
COPY ./server ./server

# Build server
WORKDIR /app/server
RUN pnpm run build 

# Define entrypoint
EXPOSE 8080
CMD ["node" , "dist/main.js"]