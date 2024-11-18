FROM node:20.13.1
# set working directory
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN rm -rf node_modules
RUN npm install
COPY . . 
# 앱 실행
ENTRYPOINT ["npm", "run", "dev"]