FROM node:22-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app
COPY --from=builder /app/dist /app/dist
RUN npm install --global serve
EXPOSE 3000
CMD ["serve", "-s", "./dist"]