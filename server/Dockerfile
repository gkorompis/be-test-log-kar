# Dockerfile.dev
FROM node:22

WORKDIR /app

# install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# copy src + tsconfig
COPY tsconfig.json ./
COPY src ./src

# compile typescript to dist
RUN npx tsc

# expose port
EXPOSE 5001

# run compiled JS
CMD ["node", "dist/index.js"]
