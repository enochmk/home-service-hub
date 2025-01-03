# stage 1 - build the app
FROM node:23-alpine AS builder
WORKDIR /usr/src/app
COPY ["package*.json", "."]
RUN npm install
COPY . .
RUN npm run build

# stage 2 - production environment
FROM node:23-alpine AS production
WORKDIR /app
RUN apk add --no-cache openssl
COPY ["package*.json", "."]
RUN npm install --only=production
COPY --from=builder /usr/src/app/build .
# COPY --from=builder /usr/src/app/prisma ./prisma
# RUN npx prisma generate
EXPOSE 4000
CMD ["node", "src/app.js"]
