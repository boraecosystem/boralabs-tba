# build stage
FROM node:18-alpine as build-stage
WORKDIR /var/www/html
RUN apk add --update --no-cache build-base python3 git
RUN npm install -g yarn --force
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# deploy stage
FROM nginx:stable-alpine as deploy-stage
WORKDIR /usr/share/nginx/html
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
COPY --from=build-stage /var/www/html/dist /usr/share/nginx/html
COPY --from=build-stage /var/www/html/storage/build/config/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
CMD [ "nginx", "-g", "daemon off;" ]
