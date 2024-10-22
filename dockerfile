# stage 1 - build the app
FROM node:20-alpine as builder
WORKDIR /usr/src/app
COPY ["package*.json", "."]
RUN npm install
COPY . .
RUN npm run build

# stage 2 - production environment
FROM node:20-alpine as production
WORKDIR /app
COPY ["package*.json", "."]
RUN npm install --only=production
COPY --from=builder /usr/src/app/prisma ./prisma
RUN npx prisma generate
COPY --from=builder /usr/src/app/build .
EXPOSE 5005
CMD ["node", "src/index.js"]
