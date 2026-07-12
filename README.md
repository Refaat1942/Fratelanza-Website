# Fratelanza — Official Corporate Website

Premium enterprise website for Fratelanza technology company.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, TailwindCSS 4, Framer Motion, React Router, React Hook Form, Zod
- **Backend:** Express 5, SQLite (better-sqlite3), Multer
- **Deployment:** Docker, Nginx, isolated on port 11000

## Pages

Home, About, Products (11), Industries, Services, Integrations, Why Fratelanza, Delivery Process, Pricing, Success Stories, Careers, Freelancer Portal, Request Demo, Contact, FAQ, Blog

## Local Development

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend (separate terminal)
cd backend
npm install
npm run dev
```

Frontend: http://localhost:5173  
API: http://localhost:11001/api/health

> **Windows note:** The backend uses `better-sqlite3`, which requires native build tools on Windows. Local API dev on Windows may fail at `npm install`. The frontend runs fine on its own (forms will fail without the API). For full local testing, use Docker, or run the backend on the VPS/Linux where it builds without issues.

## Production Deployment

See `docs/VPS_INSPECTION_REPORT.md` for the full deployment strategy.

```bash
# On VPS (after approval)
chmod +x deployment/scripts/*.sh
./deployment/scripts/deploy.sh
```

## Docker

```bash
docker compose up -d --build
curl http://localhost:11000/api/health
```

## Repository

https://github.com/Refaat1942/Fratelanza-Website.git

## License

Proprietary — Fratelanza © 2026
