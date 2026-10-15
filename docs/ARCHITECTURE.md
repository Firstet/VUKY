# VUKY architecture notes

## Platform and tenant boundaries
- `PlatformUser` is the platform-owner/support identity and is not a tenant account.
- `TenantUser` is scoped by `tenantId`; unique email constraint is per tenant.
- `Tenant` stores platform oversight status, plan association, and optional commission override.
- `Subscription` is separate from tenant status. Expiry worker marks subscription EXPIRED and tenant SUSPENDED.
- `Plan` and `BillingPeriod` are centralized pricing records.

## Pricing defaults
Store ₦5,000/month; Intelligence ₦10,000/month; Business OS ₦25,000/month. Billing discounts: monthly 0%, quarterly 5%, biannual 6%, annual 8%. Default commission percentages are illustrative starting values (5%, 3%, 1.5%) and must be reviewed by the platform owner.

## Payment gateways
GatewayConfig supports PLATFORM or TENANT scope, Stripe, Paystack, or CUSTOM. Secrets are intended to be encrypted using AES-256-GCM. Actual checkout adapters, signature-verified webhooks, refunds, recurring billing, reconciliation, and provider-specific validation are not yet implemented. Do not store card numbers or CVV.

## Expiry reminders
The scheduled worker creates idempotent in-app notifications at 7 days, 3 days, and expiry. Email transport and notification UI need integration before production. Schedule with cron/Dokploy once per day or every 15 minutes.

## Security work required
Add authentication/session issuance for platform and tenant users, role/permission checks, CSRF protection, rate limiting, audit log writes, tenant context resolution, tenant-scoped queries, secure password reset/MFA, webhook verification, backups, monitoring, and security tests. The admin page is intentionally an overview scaffold and must not be exposed publicly until access control is completed.
