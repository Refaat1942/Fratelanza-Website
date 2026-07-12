#!/bin/bash
# Fratelanza Website — Safe Deployment Script
# Run on VPS after approval. Does NOT touch existing services.

set -euo pipefail

PROJECT_DIR="/opt/fratelanza-website"
REPO_URL="https://github.com/Refaat1942/Fratelanza-Website.git"
PORT=11000

echo "=== Fratelanza Website Deployment ==="
echo "This script deploys ONLY the Fratelanza website on port $PORT"
echo "It will NOT modify existing Docker containers, Nginx configs, or services."
echo ""

# Pre-flight checks
echo "[1/6] Pre-flight checks..."

if ss -tlnp | grep -q ":$PORT "; then
  echo "WARNING: Port $PORT is already in use. Checking if it's our container..."
  if ! docker ps --format '{{.Names}}' | grep -q "fratelanza-website"; then
    echo "ERROR: Port $PORT is occupied by another service. Aborting."
    exit 1
  fi
fi

# Clone or update
echo "[2/6] Setting up project directory..."
if [ -d "$PROJECT_DIR" ]; then
  cd "$PROJECT_DIR"
  git pull origin main
else
  git clone "$REPO_URL" "$PROJECT_DIR"
  cd "$PROJECT_DIR"
fi

# Build and deploy
echo "[3/6] Building Docker image..."
docker compose build --no-cache

echo "[4/6] Starting container..."
docker compose up -d

# Health check
echo "[5/6] Waiting for health check..."
for i in $(seq 1 30); do
  if curl -sf "http://localhost:$PORT/api/health" > /dev/null 2>&1; then
    echo "Health check passed!"
    break
  fi
  if [ "$i" -eq 30 ]; then
    echo "ERROR: Health check failed after 30 attempts."
    docker compose logs --tail=50
    exit 1
  fi
  sleep 2
done

echo "[6/6] Deployment complete!"
echo ""
echo "Website running at: http://localhost:$PORT"
echo "Health endpoint:    http://localhost:$PORT/api/health"
echo ""
echo "Next steps (manual, after your approval):"
echo "  1. Add Nginx config: deployment/nginx/fratelanza-website.conf"
echo "  2. Run certbot for SSL"
echo "  3. Point DNS to this server"
