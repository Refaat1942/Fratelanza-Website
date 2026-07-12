#!/bin/bash
# Fratelanza Website — Rollback Script

set -euo pipefail

PROJECT_DIR="/opt/fratelanza-website"
cd "$PROJECT_DIR"

if [ -z "${1:-}" ]; then
  echo "Usage: ./rollback.sh <git-commit-hash>"
  echo "Recent commits:"
  git log --oneline -10
  exit 1
fi

COMMIT="$1"
echo "=== Rolling back to $COMMIT ==="

git checkout "$COMMIT"
docker compose build
docker compose up -d --no-deps fratelanza-website

# Restore latest backup if available
LATEST_BACKUP=$(ls -td /opt/fratelanza-website-backups/*/ 2>/dev/null | head -1)
if [ -n "$LATEST_BACKUP" ] && [ -f "$LATEST_BACKUP/fratelanza.db" ]; then
  echo "Restoring database from $LATEST_BACKUP"
  docker cp "$LATEST_BACKUP/fratelanza.db" fratelanza-website:/app/data/fratelanza.db
  docker compose restart fratelanza-website
fi

curl -sf http://localhost:11000/api/health && echo "Rollback complete."
