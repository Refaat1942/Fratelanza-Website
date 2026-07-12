# Build stage - Frontend
FROM node:22-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Build stage - Backend
FROM node:22-alpine AS backend-build
WORKDIR /app/backend
RUN apk add --no-cache python3 make g++
COPY backend/package.json ./
RUN npm install
COPY backend/ ./
RUN npm run build

# Production stage
FROM node:22-alpine AS production
WORKDIR /app

RUN apk add --no-cache tini
RUN apk add --no-cache --virtual .build-deps python3 make g++

COPY backend/package.json ./
RUN npm install --omit=dev && npm cache clean --force
RUN apk del .build-deps

COPY --from=backend-build /app/backend/dist ./dist
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

RUN mkdir -p /app/data/uploads

ENV NODE_ENV=production
ENV PORT=11001
ENV DATA_DIR=/app/data
ENV UPLOAD_DIR=/app/data/uploads

EXPOSE 11001

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:11001/api/health || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/index.js"]
