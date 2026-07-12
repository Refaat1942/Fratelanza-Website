#!/usr/bin/env bash
# Set or reset the admin panel password on VPS
set -euo pipefail

PROJECT_DIR="${PROJECT_DIR:-/opt/fratelanza-website}"
cd "$PROJECT_DIR"

if [ -n "${1:-}" ]; then
  PASSWORD="$1"
else
  echo -n "Enter new admin password: "
  read -rs PASSWORD
  echo
fi

if [ -z "$PASSWORD" ]; then
  echo "ERROR: Password cannot be empty"
  exit 1
fi

printf 'ADMIN_PASSWORD=%s\n' "$PASSWORD" > .env
chmod 600 .env

echo "Recreating container with new password..."
docker compose down
docker compose up -d --build --force-recreate

sleep 5
if curl -sf http://127.0.0.1:11000/api/health > /dev/null; then
  echo ""
  echo "Done! Login at: https://www.fratelanza.com/admin"
  echo "Password set successfully."
else
  echo "WARNING: Container may still be starting. Check: docker logs fratelanza-website"
fi
