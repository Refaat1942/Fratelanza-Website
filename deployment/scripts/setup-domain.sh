#!/usr/bin/env bash
# Connect www.fratelanza.com to the corporate website (port 11000).
# Safe: adds a NEW nginx site only — does not edit existing configs.
set -euo pipefail

DOMAIN="www.fratelanza.com"
CONF_NAME="fratelanza-corporate"
PROJECT_DIR="${PROJECT_DIR:-/opt/fratelanza-website}"
EMAIL="${CERTBOT_EMAIL:-info@fratelanza.com}"
HEALTH_URL="http://127.0.0.1:11000/api/health"

echo "=== Fratelanza Domain Setup: $DOMAIN ==="

# 1. Verify project exists
if [ ! -f "$PROJECT_DIR/deployment/nginx/fratelanza-website.conf" ]; then
  echo "ERROR: Project not found at $PROJECT_DIR"
  exit 1
fi

# Helper: HTTP GET health check (curl or wget)
check_health() {
  if command -v curl &>/dev/null; then
    curl -sf "$HEALTH_URL" > /dev/null 2>&1
  elif command -v wget &>/dev/null; then
    wget -qO- "$HEALTH_URL" > /dev/null 2>&1
  else
    echo "ERROR: Install curl or wget: apt install curl -y"
    exit 1
  fi
}

show_diagnostics() {
  echo ""
  echo "=== Diagnostics ==="
  docker ps -a --filter name=fratelanza-website --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}' 2>/dev/null || true
  echo ""
  echo "--- Last 40 log lines ---"
  docker logs fratelanza-website --tail 40 2>&1 || true
  echo ""
  echo "--- Port 11000 ---"
  ss -tlnp | grep ':11000 ' || echo "Nothing listening on 11000"
  echo ""
}

# 2. Verify container is running (wait up to 45s — app needs time after start)
echo "Checking container health (waiting up to 45s)..."
HEALTH_OK=0
for i in $(seq 1 15); do
  if check_health; then
    HEALTH_OK=1
    break
  fi
  STATUS=$(docker inspect -f '{{.State.Status}}' fratelanza-website 2>/dev/null || echo "missing")
  if [ "$STATUS" = "restarting" ] || [ "$STATUS" = "exited" ]; then
    echo "Container status: $STATUS — checking logs..."
    show_diagnostics
    echo "ERROR: Container is not healthy. Fix the error above, then re-run this script."
    exit 1
  fi
  echo "  Attempt $i/15 — not ready yet, waiting 3s..."
  sleep 3
done

if [ "$HEALTH_OK" -eq 0 ]; then
  echo "ERROR: Website not responding on port 11000."
  show_diagnostics
  echo "Try manually:"
  echo "  cd $PROJECT_DIR && docker compose up -d --build"
  echo "  docker logs fratelanza-website --tail 50"
  echo "  curl $HEALTH_URL"
  exit 1
fi
echo "Container OK"

# 3. Check DNS (optional warning)
RESOLVED=$(dig +short "$DOMAIN" 2>/dev/null | tail -1 || true)
if [ -z "$RESOLVED" ]; then
  echo "WARNING: DNS for $DOMAIN not resolved yet."
  echo "Add A record: www -> 187.124.15.14 in Cloudflare (DNS only)."
  echo "Continue anyway? (y/n)"
  read -r ans
  [ "$ans" = "y" ] || exit 1
else
  echo "DNS resolves to: $RESOLVED"
fi

# 4. Install nginx config (new file only)
echo "Installing nginx config..."
sudo cp "$PROJECT_DIR/deployment/nginx/fratelanza-website.conf" "/etc/nginx/sites-available/$CONF_NAME"
sudo ln -sf "/etc/nginx/sites-available/$CONF_NAME" "/etc/nginx/sites-enabled/$CONF_NAME"

# 5. Test and reload nginx
echo "Testing nginx..."
sudo nginx -t
sudo systemctl reload nginx
echo "Nginx reloaded — http://$DOMAIN should work (no SSL yet)"

# 6. SSL with certbot
if command -v certbot &>/dev/null; then
  echo "Requesting SSL certificate..."
  sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect || {
    echo "Certbot failed. Run manually:"
    echo "  sudo certbot --nginx -d $DOMAIN"
  }
else
  echo "Install certbot: sudo apt install certbot python3-certbot-nginx -y"
  echo "Then: sudo certbot --nginx -d $DOMAIN"
fi

echo ""
echo "=== Done ==="
echo "  https://$DOMAIN"
