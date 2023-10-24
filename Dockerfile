FROM node:18-alpine

RUN apk add --no-cache \
  chromium

RUN apk add --update python3 make g++\
  && rm -rf /var/cache/apk/*

RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Puppeteer v13.5.0 works with Chromium 100.
RUN yarn add puppeteer@13.5.0

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
  && mkdir -p /home/pptruser/Downloads /app \
  && chown -R pptruser:pptruser /home/pptruser \
  && chown -R pptruser:pptruser /app


RUN chown node:node /app
WORKDIR /app
USER node

COPY  --chown=node:node ./package*.json ./
COPY  --chown=node:node ./yarn.lock ./

RUN npm i ts-node typescript
RUN yarn install --ignore-optional


COPY --chown=node:node . .

CMD ["yarn", "dev"]
