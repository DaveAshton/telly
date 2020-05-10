FROM arm32v6/node:12-alpine
RUN apt-get update && apt-get install -y \
  lirc \
  lirc-x

WORKDIR /telly
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
# RUN apk update || : && apk add lirc && apk add lirc-x
# RUN apk update || : && apk add python
CMD ["node", "/telly/src/index.js"]
