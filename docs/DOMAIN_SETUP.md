# Connect www.fratelanza.com

**VPS IP:** `187.124.15.14`  
**Website container:** port `11000` (isolated — does not touch other services)

---

## Step 1 — DNS (Hostinger)

Log in to [Hostinger](https://hpanel.hostinger.com) → **Domains** → **fratelanza.com** → **DNS / Nameservers**

Add this record:

| Type | Name | Value           | TTL  |
|------|------|-----------------|------|
| A    | www  | 187.124.15.14   | 3600 |

Wait 5–30 minutes for DNS to propagate. Verify:

```bash
dig +short www.fratelanza.com
# Should return: 187.124.15.14
```

---

## Step 2 — Deploy latest code on VPS

SSH into your VPS:

```bash
ssh root@187.124.15.14
# or: ssh root@srv1443693.hstgr.cloud
```

```bash
cd /opt/fratelanza-website
git pull
docker compose up -d --build
curl http://localhost:11000/api/health
# {"status":"healthy",...}
```

---

## Step 3 — Connect nginx + SSL (one command)

```bash
cd /opt/fratelanza-website
chmod +x deployment/scripts/setup-domain.sh
./deployment/scripts/setup-domain.sh
```

This script:
- Adds a **new** nginx file `fratelanza-corporate` (does not edit existing sites)
- Proxies `www.fratelanza.com` → `http://127.0.0.1:11000`
- Requests a free Let's Encrypt SSL certificate

---

## Step 3 (manual alternative)

```bash
sudo cp /opt/fratelanza-website/deployment/nginx/fratelanza-website.conf \
        /etc/nginx/sites-available/fratelanza-corporate
sudo ln -sf /etc/nginx/sites-available/fratelanza-corporate \
            /etc/nginx/sites-enabled/fratelanza-corporate
sudo nginx -t && sudo systemctl reload nginx

# Test HTTP first
curl -I http://www.fratelanza.com

# Then SSL
sudo certbot --nginx -d www.fratelanza.com
```

---

## Important: fratelanza.com (without www)

Your VPS already has an nginx site named `fratelanza` serving the **apex** domain `fratelanza.com` (old app).

| URL | What happens now |
|-----|------------------|
| `www.fratelanza.com` | New corporate website (after setup) |
| `fratelanza.com` | Still points to the **old** site until you change it |

To also serve the corporate site on `fratelanza.com`:

1. Backup old config: `sudo cp /etc/nginx/sites-available/fratelanza /etc/nginx/sites-available/fratelanza.bak`
2. Disable old site: `sudo rm /etc/nginx/sites-enabled/fratelanza`
3. Uncomment the apex redirect block in `fratelanza-website.conf`
4. Re-run certbot: `sudo certbot --nginx -d www.fratelanza.com -d fratelanza.com`
5. `sudo nginx -t && sudo systemctl reload nginx`

Only do this when you are ready to replace the old homepage.

---

## Verify

```bash
curl -I https://www.fratelanza.com
curl https://www.fratelanza.com/api/health
```

Open in browser: **https://www.fratelanza.com**

---

## Rollback (instant)

```bash
sudo rm /etc/nginx/sites-enabled/fratelanza-corporate
sudo nginx -t && sudo systemctl reload nginx
# Site still works on http://187.124.15.14:11000
```
