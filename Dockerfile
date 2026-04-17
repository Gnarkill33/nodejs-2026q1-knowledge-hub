# BUILD

FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# PRODUCTION

FROM node:24-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

RUN addgroup -g 1001 customuser && \
    adduser -D -u 1001 -G customuser customuser

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/prisma ./prisma
RUN npx prisma generate

COPY --from=builder --chown=customuser:customuser /app/dist ./dist
COPY --from=builder --chown=customuser:customuser /app/doc ./doc

USER customuser

EXPOSE 3000

CMD ["node", "dist/src/main.js"]