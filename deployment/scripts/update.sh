#!/bin/bash
# Fratelanza Website — Update Script (zero-downtime rolling update)

set -euo pipefail

PROJECT_DIR="/opt/fratelanza-website"
cd "$PROJECT_DIR"

echo "=== Updating Fratelanza Website ==="

# Backup database before update
BACKUP_DIR="/opt/fratelanza-website-backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
docker compose exec -T fratelanza-website sh -c 'cp /app/data/fratelanza.db /app/data/fratelanza.db.bak' 2>/dev/null || true
docker cp fratelanza-website:/app/data/fratelanza.db "$BACKUP_DIR/" 2>/dev/null || echo "No database to backup yet."

git pull origin main
docker compose build
docker compose up -d --no-deps fratelanza-website

for i in $(seq 1 20); do
  if curl -sf http://localhost:11000/api/health > /dev/null 2>&1; then
    echo "Update successful!"
    exit 0
  fi
  sleep 2
done

echo "Update may have failed. Check logs: docker compose logs --tail=50"
exit 1
