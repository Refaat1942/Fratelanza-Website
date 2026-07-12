#!/bin/bash
# Fratelanza Website — Database Backup Script
# Add to crontab: 0 2 * * * /opt/fratelanza-website/deployment/scripts/backup.sh

set -euo pipefail

BACKUP_ROOT="/opt/fratelanza-website-backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="$BACKUP_ROOT/$TIMESTAMP"

mkdir -p "$BACKUP_DIR"

docker cp fratelanza-website:/app/data/fratelanza.db "$BACKUP_DIR/fratelanza.db" 2>/dev/null || {
  echo "No database found to backup."
  exit 0
}

# Keep only last 30 backups
ls -td "$BACKUP_ROOT"/*/ 2>/dev/null | tail -n +31 | xargs rm -rf 2>/dev/null || true

echo "Backup saved to $BACKUP_DIR/fratelanza.db"
