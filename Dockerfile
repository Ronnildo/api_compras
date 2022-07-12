FROM node:16

WORKDIR /usr

COPY package*.json ./
RUN yarn

COPY . .

EXPOSE 3333

CMD ["yarn", "start"]
