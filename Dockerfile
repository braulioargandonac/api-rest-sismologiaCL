FROM node:12
WORKDIR /my_app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm","start"]