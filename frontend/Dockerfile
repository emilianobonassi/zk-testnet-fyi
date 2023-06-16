FROM node:18-alpine3.18 AS dependencies

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --production

FROM node:18-alpine3.18 AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ARG API_URL
ENV NEXT_PUBLIC_API_URL=$API_URL

ENV NEXT_TELEMETRY_DISABLED 1
ARG NODE_ENV
ENV NODE_ENV="${NODE_ENV}"

RUN yarn build

FROM node:18-alpine3.18 AS runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1
COPY --from=builder /app/.next/standalone ./standalone
COPY --from=builder /app/public /app/standalone/public
COPY --from=builder /app/.next/static /app/standalone/.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "./standalone/server.js"]