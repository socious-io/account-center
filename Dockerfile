FROM node:22-slim

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build
RUN npm install --global serve

EXPOSE 3000

CMD ["serve", "./dist"]