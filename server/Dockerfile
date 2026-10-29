FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
RUN mkdir -p uploads && chown -R node:node /app

EXPOSE 5000

ENV NODE_ENV=production

USER node

CMD ["npm", "start"]
