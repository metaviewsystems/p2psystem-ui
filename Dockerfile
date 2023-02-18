FROM node:18 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN node_modules/.bin/ng build --configuration production


FROM nginx:1.23-alpine as final
COPY --from=builder /app/dist/p2psystem-ui/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]