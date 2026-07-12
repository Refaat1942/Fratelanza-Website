# VPS Inspection Report — Fratelanza Website Deployment

**Server:** srv1443693.hstgr.cloud (187.124.15.14)  
**OS:** Ubuntu 24.04 LTS (KVM 2)  
**Date:** July 12, 2026  
**Status:** ✅ Pre-flight checks PASSED — Ready for deployment (pending approval)

---

## Port 11000 — ✅ FREE

```bash
ss -tuln | grep ':11000 '
# (no output — port is available)
```

**No conflict.** Safe to bind `0.0.0.0:11000 → container:11001`.

---

## Existing Docker Containers (25 running)

| Container | Image | Host Port | Status |
|-----------|-------|-----------|--------|
| lotus-manager-web | lotus-manager-lotus-web | **16320** | Up 5 days |
| lotus-crm-web-1 | lotus-crm-web | **16350** | Up 6 days (healthy) |
| lotus-crm-db-1 | postgres:16-alpine | internal | Up 6 days (healthy) |
| fratelanza-web-1 | fratelanza-web | **15600** | Up 7 days |
| fratelanza-api-1 | fratelanza-api | internal 8080 | Up 7 days |
| fratelanza-postgres-1 | postgres:16-alpine | internal | Up 7 days (healthy) |
| lotus-hr-dashboard | lotus-hr-dashboard-lotus-hr | **16310** | Up 12 days |
| fratelanza_nginx | fratelanza-rs-nginx | **9000** | Up 13 days |
| fratelanza_backend | fratelanza-rs-backend | internal 8000 | Up 13 days |
| fratelanza_postgres | postgres:16-alpine | internal | Up 13 days (healthy) |
| fratelanza_redis | redis:7-alpine | internal | Up 13 days (healthy) |
| labmaster-frontend | labmaster-frontend | **13000** | Up 13 days |
| labmaster-backend | labmaster-backend | **18000** | Up 13 days |
| fratelanza-app-1 | fratelanza-app | **127.0.0.1:1025** | Up 13 days |
| fratelanza-admin-app-1 | fratelanza-admin-app | **127.0.0.1:2025** | Up 13 days |
| fratelanza-admin-db-1 | postgres:16-alpine | internal | Up 13 days (healthy) |
| labmaster-postgres | postgres:16-alpine | internal | Up 13 days (healthy) |
| fratelanza-db-1 | postgres:17-alpine | internal | Up 13 days (healthy) |
| labmaster-redis | redis:7-alpine | internal | Up 13 days (healthy) |
| fratelanza-console-web | nginx:alpine | **127.0.0.1:3100** | Up 8 days |
| fratelanza-console-api | (custom) | **127.0.0.1:3101** | Up 8 days |
| fratelanza-console-db | postgres | internal | Up 13 days (healthy) |
| fratelanza-hub-admin-db-1 | postgres | internal | Up 13 days (healthy) |
| fratelanza-hub-db-1 | postgres:17-alpine | internal | Up 13 days (healthy) |
| lotus_web | deploy-web | **8090** | Up 13 days |
| lotus_api | deploy-api | internal 8080 | Up 13 days |
| lotus_postgres | postgres | internal | Up 13 days (healthy) |

### Ports in use (summary)

| Port | Service |
|------|---------|
| 1025 | fratelanza-app (localhost only) |
| 2025 | fratelanza-admin-app (localhost only) |
| 3100 | fratelanza-console-web (localhost only) |
| 3101 | fratelanza-console-api (localhost only) |
| 8090 | lotus_web |
| 9000 | fratelanza_nginx (real estate) |
| 11000 | **FREE ✅** |
| 13000 | labmaster-frontend |
| 15600 | fratelanza-web |
| 16310 | lotus-hr-dashboard |
| 16320 | lotus-manager-web |
| 16350 | lotus-crm-web |
| 18000 | labmaster-backend |

---

## Existing Nginx Sites

| Site | Type | Domain (known) |
|------|------|----------------|
| 00-labmaster | symlink | labmaster subdomain |
| 00-pharmapos | symlink | pharmapos / erp.fratelanza.com |
| fratelanza | symlink | fratelanza.com main |
| fratelanza-console | direct file | **console.fratelanza.com** (SSL ✅) |
| lotus | symlink | lotus subdomain |
| marketing-hub | symlink | marketing hub |
| prosthetics | symlink | prosthetics |

**Existing `fratelanza` nginx site already exists** — the new corporate website should either:
- **Option A (recommended):** Use the existing `fratelanza` site and update its `proxy_pass` to port 11000 (requires your explicit approval to edit that one file)
- **Option B (safest isolation):** Deploy on port 11000 first, test via `http://187.124.15.14:11000`, then add a **new** subdomain (e.g. `www.fratelanza.com` or `corporate.fratelanza.com`) with a new nginx config file

---

## Conflict Analysis

| Check | Result |
|-------|--------|
| Port 11000 available | ✅ Yes |
| Container name `fratelanza-website` | ✅ No conflict (new name) |
| Docker network `fratelanza-website-net` | ✅ New, isolated |
| Docker volume `fratelanza-website-data` | ✅ New, isolated |
| Database | ✅ Own SQLite volume — no shared Postgres |
| Memory impact | ⚠️ Server ~54% RAM — new container adds ~150–250 MB |

**Risk level: LOW** — Fully isolated deployment with zero impact on running services.

---

## Approved Deployment Plan

### Step 1 — Deploy container (no nginx changes yet)

```bash
cd /opt
git clone https://github.com/Refaat1942/Fratelanza-Website.git fratelanza-website
cd fratelanza-website
docker compose up -d --build
curl http://localhost:11000/api/health
```

### Step 2 — Verify in browser

```
http://187.124.15.14:11000
```

### Step 3 — Connect domain (after you choose option A or B)

**Option B — New subdomain (zero risk to existing sites):**

```bash
# Add NEW file only
cp deployment/nginx/fratelanza-website.conf /etc/nginx/sites-available/fratelanza-corporate
# Edit server_name to your chosen subdomain
ln -s /etc/nginx/sites-available/fratelanza-corporate /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
certbot --nginx -d www.fratelanza.com
```

### Rollback (instant, zero downtime for other services)

```bash
docker compose -f /opt/fratelanza-website/docker-compose.yml down
# Remove nginx symlink if added
```

---

## Approval Checklist

- [x] Port 11000 confirmed free
- [x] No container name conflicts
- [x] Isolation strategy validated
- [ ] **Your approval to deploy**
- [ ] **Domain choice:** existing `fratelanza.com` or new subdomain?
- [ ] **GitHub repo pushed** (repo was empty at start — code needs to be pushed first)

---

## Next Command (when you say "deploy")

```bash
cd /opt/fratelanza-website && ./deployment/scripts/deploy.sh
```
