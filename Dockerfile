FROM arm32v6/node:12-alpine
RUN apt-get update && apt-get add -y \
  lirc \
  lirc-x

WORKDIR /telly

COPY lirc/config.txt /boot/
COPY lirc/hardware.conf /etc/lirc/
COPY lirc/lircd.conf /etc/lirc/
COPY lirc/modules /etc/

RUN sudo /etc/init.d/lirc start

COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
# RUN apk update || : && apk add lirc && apk add lirc-x
# RUN apk update || : && apk add python
CMD ["node", "/telly/src/index.js"]
