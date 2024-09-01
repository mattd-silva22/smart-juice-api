FROM node:20.11.0-bullseye

VOLUME /var/www/api
COPY ./ /var/www/api/
WORKDIR /var/www/api
EXPOSE 3000
CMD npm i && npx prisma generate && npm run seed-db && npm run build  && npm start:prod 