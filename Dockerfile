FROM node:20.11.0-bullseye

WORKDIR /api

COPY package*.json ./

COPY . .

EXPOSE 3000
CMD npm i && npx prisma db push && npx prisma generate && npm run seed-db && npm run build  && npm run start:prod 