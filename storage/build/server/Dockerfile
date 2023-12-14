FROM node:18-alpine
WORKDIR /var/www/html
RUN apk add --update --no-cache build-base python3 git
RUN npm install -g yarn --force
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
COPY ./storage/build/server/server.ts ./src/server.ts
RUN yarn add -D pm2
RUN yarn pm2 install typescript
CMD ["yarn", "pm2", "start", "src/server.ts", "--no-daemon", "--watch"]
