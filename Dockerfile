
FROM arm32v7/node:12-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
# RUN apk update || : && apk add python
CMD ["node", "/app/src/index.js"]
