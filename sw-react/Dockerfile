FROM node:20.13.1
# set working directory
WORKDIR /app
COPY . . 
COPY package.json .
COPY package-lock.json .
RUN rm -rf node_modules
RUN npm install

# 앱 실행
ENTRYPOINT ["npm", "run", "dev"]