#!/usr/bin/env bash
# Fix NET::ERR_CERT_COMMON_NAME_INVALID for fratelanza.com / www.fratelanza.com
set -euo pipefail

PROJECT_DIR="${PROJECT_DIR:-/opt/fratelanza-website}"
EMAIL="${CERTBOT_EMAIL:-info@fratelanza.com}"

echo "=== Fratelanza SSL Fix ==="

# 1. Install updated nginx config (both apex + www)
sudo cp "$PROJECT_DIR/deployment/nginx/fratelanza-website.conf" /etc/nginx/sites-available/fratelanza-corporate
sudo ln -sf /etc/nginx/sites-available/fratelanza-corporate /etc/nginx/sites-enabled/fratelanza-corporate

# 2. Disable old fratelanza site if it conflicts on same domains
if [ -L /etc/nginx/sites-enabled/fratelanza ]; then
  echo "Disabling old /etc/nginx/sites-enabled/fratelanza (conflicts with corporate site)..."
  sudo rm -f /etc/nginx/sites-enabled/fratelanza
fi

# 3. Request certificate for BOTH names (fixes common-name mismatch)
echo "Requesting SSL certificate for fratelanza.com + www.fratelanza.com ..."
sudo certbot certonly --nginx \
  -d fratelanza.com \
  -d www.fratelanza.com \
  --non-interactive --agree-tos -m "$EMAIL" \
  --expand || sudo certbot --nginx \
  -d fratelanza.com \
  -d www.fratelanza.com \
  --non-interactive --agree-tos -m "$EMAIL"

# 4. Test and reload
sudo nginx -t
sudo systemctl reload nginx

echo ""
echo "=== Done ==="
echo "  https://www.fratelanza.com"
echo "  https://fratelanza.com  (redirects to www)"
echo ""
echo "Verify: curl -I https://www.fratelanza.com"
