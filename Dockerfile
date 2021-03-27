FROM node:12.18
RUN mkdir -p /egg
WORKDIR /egg
COPY package.json /egg/
# RUN yarn config set register 'https://register.npm.taobao.org'
# RUN yarn --production
COPY ./ /egg/
EXPOSE 7001
CMD yarn prod