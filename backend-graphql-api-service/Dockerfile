FROM node:14 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install 
COPY . .
RUN npm run build
RUN rm -rf ./node_modules
RUN npm install --only=production

# Second Stage : Setup command to run your app using lightweight node image
FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app ./
COPY ormconfig.docker.json ./ormconfig.json

EXPOSE 8000
CMD ["npm", "run", "start:prod"]
