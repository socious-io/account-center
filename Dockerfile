FROM node:22-slim

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

RUN npm run build
RUN npm install --global serve

EXPOSE 3000

CMD ["serve", "-s", "./dist"]