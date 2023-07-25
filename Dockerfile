FROM node:18.14.2-alpine3.17 AS builder

RUN apk add --no-cache libc6-compat

RUN corepack enable && corepack prepare pnpm@8.6.9 --activate

RUN mkdir /app
WORKDIR /app
COPY . .

RUN pnpm install -s
RUN pnpm run build
RUN pnpm prune --prod --no-optional

FROM node:18.14.2-alpine3.17 AS runner

RUN mkdir /app
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/asrserver.proto ./asrserver.proto

EXPOSE 9000
ENV PORT 9000
CMD ["node", "dist/server/start.js"]