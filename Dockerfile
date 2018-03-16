FROM node:alpine
RUN mkdir -p /app/build

ADD server.js package.json /app/
ADD build /app/build
WORKDIR /app
RUN npm install --production --registry=https://registry.npm.taobao.org

CMD [ "node", "server.js" ]

# FROM nginx:alpine

# WORKDIR /usr/share/nginx/html

# ADD ./build .
# COPY nginx.conf /etc/nginx/conf.d/default.conf