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
COPY backend/package*.json ./
RUN npm ci
COPY backend/ ./
RUN npm run build

# Production stage
FROM node:22-alpine AS production
WORKDIR /app

RUN apk add --no-cache tini

COPY backend/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

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
