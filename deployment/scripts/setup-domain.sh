#!/usr/bin/env bash
# Connect www.fratelanza.com to the corporate website (port 11000).
# Safe: adds a NEW nginx site only — does not edit existing configs.
set -euo pipefail

DOMAIN="www.fratelanza.com"
CONF_NAME="fratelanza-corporate"
PROJECT_DIR="${PROJECT_DIR:-/opt/fratelanza-website}"
EMAIL="${CERTBOT_EMAIL:-info@fratelanza.com}"

echo "=== Fratelanza Domain Setup: $DOMAIN ==="

# 1. Verify project exists
if [ ! -f "$PROJECT_DIR/deployment/nginx/fratelanza-website.conf" ]; then
  echo "ERROR: Project not found at $PROJECT_DIR"
  echo "Run: cd /opt && git clone https://github.com/Refaat1942/Fratelanza-Website.git fratelanza-website"
  exit 1
fi

# 2. Verify container is running
echo "Checking container health..."
if ! curl -sf "http://127.0.0.1:11000/api/health" > /dev/null; then
  echo "ERROR: Website not responding on port 11000."
  echo "Run: cd $PROJECT_DIR && docker compose up -d --build"
  exit 1
fi
echo "Container OK"

# 3. Check DNS (optional warning)
RESOLVED=$(dig +short "$DOMAIN" 2>/dev/null | tail -1 || true)
if [ -z "$RESOLVED" ]; then
  echo "WARNING: DNS for $DOMAIN not resolved yet."
  echo "Add an A record: www -> your VPS IP (187.124.15.14) in Hostinger DNS."
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
    echo "Certbot failed. Run manually after DNS propagates:"
    echo "  sudo certbot --nginx -d $DOMAIN"
  }
else
  echo "Certbot not installed. Install SSL manually:"
  echo "  sudo apt install certbot python3-certbot-nginx -y"
  echo "  sudo certbot --nginx -d $DOMAIN"
fi

echo ""
echo "=== Done ==="
echo "  HTTP:  http://$DOMAIN"
echo "  HTTPS: https://$DOMAIN  (after certbot succeeds)"
echo ""
echo "NOTE: fratelanza.com (without www) still uses the OLD nginx site."
echo "To move apex domain here too, disable /etc/nginx/sites-enabled/fratelanza first."
