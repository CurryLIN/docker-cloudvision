FROM node:6.12.3-wheezy

RUN mkdir /app/

WORKDIR /app/

COPY package.json /app/

COPY cloudVersion.js /app/

COPY .env /app/

RUN npm install

EXPOSE 8888

CMD ["npm", "start"]
