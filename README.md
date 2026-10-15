# VUKY — Multi-tenant Business OS launch foundation

This is a fresh VUKY monorepo scaffold based on the previously discussed product direction: Africa-first multi-tenant business OS with e-commerce/storefront, AI capabilities, full business tools, central platform-owner control, subscriptions, configurable commission, and platform/tenant gateway configuration.

## Stack
Next.js 15 App Router, TypeScript, Prisma, PostgreSQL, Docker Compose, deployable on a VPS/Dokploy.

## Included in this ZIP
- Public VUKY home and pricing pages
- Three plans: Store ₦5,000/month; Intelligence ₦10,000/month; Business OS ₦25,000/month
- Billing discounts: quarterly 5%, biannual 6%, annual 8%
- Prisma data model for separate platform users and tenant users, tenants, plans, subscriptions, gateways, notifications, and audit logs
- Super Admin overview scaffold
- Gateway schema for platform-owner and tenant Stripe/Paystack/custom credentials
- AES-256-GCM secret-encryption helper
- Subscription reminder job: 7 days, 3 days, and expiry; expired tenants become suspended
- Docker and Dokploy Compose files, health endpoint, seed script

## Deploy locally/VPS
1. Copy `.env.example` to `.env`.
2. Set `POSTGRES_PASSWORD` for Compose and update `DATABASE_URL` to match it (host `db`, database/user `vuky`).
3. Generate secrets:
   - `openssl rand -hex 32` for `APP_SECRET`
   - `openssl rand -hex 32` for `GATEWAY_ENCRYPTION_KEY`
   - Set a unique `PLATFORM_OWNER_PASSWORD`.
4. Run `docker compose up -d --build`.
5. Seed initial plans and the platform owner:
   `docker compose exec app npx prisma db seed`
   If Prisma seed command isn't configured in your environment, run `docker compose exec app npx tsx prisma/seed.ts`.
6. Open port 3000 or route your domain to the app on port 3000.
7. Health check: `/api/health`.

## GitHub
```bash
git init
git add .
git commit -m "Initial VUKY platform foundation"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```
Never commit `.env`. In Dokploy, connect the repository and choose `docker-compose.dokploy.yml`; set environment variables in Dokploy.

## Important
This is a foundation to start correcting and extending, not a completed production SaaS. The admin page is an overview scaffold; full secure login and mutation flows, tenant provisioning/workspaces, checkout, recurring payments, signed webhooks, gateway adapters, SMTP, notification UI, e-commerce order flows, AI integrations, and role/permission enforcement still need implementation and testing. Do not take real payments or expose admin routes publicly until those items are finished.
