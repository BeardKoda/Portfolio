FROM node:22-alpine3.21 AS base
WORKDIR /app

# Install dependencies only when needed
FROM base AS dependencies
RUN apk update && apk add --no-cache --virtual .build-deps py-setuptools alpine-sdk python3 g++ make libtool autoconf automake
COPY package.json ./
RUN npm install --frozen-lockfile
RUN apk del .build-deps py-setuptools alpine-sdk python3 g++ make libtool autoconf automake

# Rebuild the source code only when needed
FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
RUN apk add --no-cache --upgrade bash
RUN apk update && apk add curl

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Execute script
# RUN ["chmod", "+x", "./entrypoint.sh"]
# ENTRYPOINT ["./entrypoint.sh"]
ENV NEXT_TELEMETRY_DISABLED=1

ARG PORT
ENV PORT=${PORT:-3000}
EXPOSE $PORT
CMD ["sh", "-c", "npm run start"]