# Company Platform V2

A new full stack company and learning platform. This repository includes a responsive public site, education and technology catalogs, learner authentication, internship applications, free course enrollment, certificate verification, enquiry management, and role-protected admin views. It intentionally includes no invented company facts, testimonials, sample programs, or customer records.

See docs/architecture.md for the full sitemap, journeys, data model, security boundaries, APIs, design system, and deployment sequence.

## Stack

- Next.js App Router, React and TypeScript
- PostgreSQL with Prisma ORM 7 and the PostgreSQL driver adapter
- Zod validation, bcrypt password hashing, database-backed opaque sessions
- Tailwind CSS 4 processing and custom responsive CSS
- Node hosting such as Vercel with managed PostgreSQL

## Run locally

1. Install Node.js 20.9 or later (Node 22 LTS recommended).
2. Copy .env.example to .env and set DATABASE_URL and DIRECT_URL to a PostgreSQL database.
3. Run npm install.
4. Run npm run db:generate and npm run db:migrate.
5. Run npm run dev and open http://localhost:3000.

The first admin account must be promoted by an operator with direct database access. Public registration only creates student accounts; never add a public admin registration path. After creating your account, promote it with: UPDATE "User" SET role='ADMIN' WHERE email='you@example.com';

## Configuration

See .env.example for database, brand, contact and provider settings. Replace company name, description, logo, social links, canonical URL and contact information before launch. Legal pages are starter language that calls out owner-specific clauses; have the responsible operator complete and review them. Do not use sample-looking credentials in production.

## Product areas

- Public: home, company information, services, technology, learning catalog including certifications, article index/detail, contact, project, institutional and corporate training enquiries, FAQ, search, certificate verification.
- Accounts: student registration/login/logout, dashboard for enrollments and issued certificates.
- Learning: internship application intake, free course/certification enrollment, program/module/lesson/progress schema.
- Operations: role-checked admin dashboard, program catalog read/create API, enquiries inbox with lead status updates, account listing, and audit records.
- Data: users/sessions/profiles; programs and modules/lessons/progress; applications; workshop/webinar registrations; certificates and verification events; services/technologies/articles/FAQs/testimonials/announcements; inquiries, payments, files, notifications, and admin audit logs.

## API overview

- POST /api/auth/register, /api/auth/login, /api/auth/logout
- POST /api/inquiries/{contact|project|institutions|corporate|courses}
- POST /api/programs/:slug/apply (published internship)
- POST /api/programs/:slug/enroll (free published course/certification; paid checkout remains disabled)
- GET /api/certificates/verify/:certificateId
- GET /api/search?q=...
- GET and POST /api/admin/programs (admin)
- GET /api/admin/inquiries and PATCH /api/admin/inquiries/:id (admin)

## Before serving real users or taking money

Configure managed PostgreSQL, storage for private application documents, email delivery and verification/password recovery, rate limiting and bot controls, payment provider with signed webhooks, backups and monitoring, and reviewed legal text. The schema reserves payment/file entities, but payment checkout, uploads, password recovery, and outbound email are not represented as complete. Add an external rate limiter before exposing authentication and public forms at scale.

## Repository structure

- src/app: routes, pages, APIs, metadata endpoints
- src/components: shared site, forms, cards, policy rendering
- src/lib: auth, brand, data access, validation, Prisma connection
- prisma/schema.prisma: relational model
- docs/architecture.md: product and technical architecture

## License

Private starter; add a license that reflects the owner's intended use before making the repository public.

## ELARIN TECH operations and provider setup

The site stores structured student accounts, program applications, workshop/webinar registrations, course enrolments, certificates, verification events, and enquiries in PostgreSQL. Prisma is the application data layer; Vercel hosts the Next.js application and does not provide the database or durable private file storage. Event registration and application intake persist to separate PostgreSQL records; an existing account is linked by email when it matches. Account creation remains a separate action.

The admin dashboard exposes `/admin/students`, `/admin/applications`, `/admin/workshops`, `/admin/webinars`, `/admin/enrollments`, `/admin/certificates`, `/admin/institutions`, and `/admin/inquiries`. All pages and admin APIs require the ADMIN role on the server. Approved exports are available for student accounts, applications, and institutional enquiries at `/api/admin/export?type=students`, `applications`, and `institutions`.

### Current integrations

- Configure `DATABASE_URL` (runtime pooled URL where applicable) and `DIRECT_URL` (migration/seed connection). The project uses PostgreSQL and Prisma; it does not use MongoDB.
- Public contact details come from the central brand configuration and `.env` variables `CONTACT_EMAIL`, `CONTACT_PHONE`, and `REGISTERED_ADDRESS`. The public email fallback is `admin.elarintech@gmail.com`.
- Email delivery is not implemented/configured. To add it, set `RESEND_API_KEY` and `RESEND_FROM_EMAIL`, then implement and verify each notification workflow. A public contact email alone does not send application confirmations.
- File uploads and private object storage are not implemented. Configure an object-storage provider (endpoint, bucket and credentials) and implement authenticated upload/retrieval before collecting resumes or private documents. `FileAsset` is metadata schema only.
- Payments/checkout are not active. `RAZORPAY_*` variables are placeholders; do not accept payment until checkout and signed webhooks are implemented.
- Add a shared external rate limiter and bot protection before exposing forms and authentication at scale. The serverless application has no durable request limiter configured.
- Certificate records and ID verification are operational in the database. PDF/QR artwork generation and issuance email are not configured.

### Safe schema deployment

The migrations `20261028010000_add_program_curriculum`, `20261028020000_add_program_details_and_certificate_revocation`, and `20261028030000_link_event_registrations_to_accounts` add nullable columns/foreign keys/indexes and do not delete existing records. Review Vercel's configured `DATABASE_URL`/`DIRECT_URL` provider and backup status, then deploy with the repo's migration command before serving code that depends on the new columns. The repository's Vercel build command currently deploys migrations and seeds internship content; confirm its production environment is correctly scoped before deployment.

## Database access and operator guide

### Which database the site uses

ELARIN TECH uses **PostgreSQL**, accessed through **Prisma ORM**. MongoDB is not configured. The Prisma schema is in `prisma/schema.prisma`; schema changes are tracked under `prisma/migrations/`. Vercel runs the web application, while the PostgreSQL database is hosted by the database provider configured in the Vercel environment.

### Find the production database provider

1. Open the ELARIN TECH project in Vercel and select **Settings → Environment Variables**.
2. Check whether `DATABASE_URL` and `DIRECT_URL` are present in the Production environment. Vercel stores the connection strings as secrets; keep them private and do not paste them into chat or commit them to Git.
3. Use the database provider integration or dashboard associated with those URLs to open its SQL console, inspect backups, and manage database access. Vercel does not expose a database console just because it hosts the site.
4. If those variables are missing, the production app has no configured PostgreSQL connection. Create a managed PostgreSQL database first, then add its pooled runtime URL as `DATABASE_URL` and its direct connection URL as `DIRECT_URL` (if the provider supports separate pooled and direct URLs). Keep both scoped to the intended Vercel project and environment.

### View website records

Sign in using an account that an operator has promoted to the `ADMIN` role. The role-protected pages include `/admin/students`, `/admin/applications`, `/admin/workshops`, `/admin/webinars`, `/admin/enrollments`, `/admin/certificates`, `/admin/institutions`, and `/admin/inquiries`. The admin pages use the app's server-side authorization; a public learner account does not have database access. Available controlled exports are documented above in the API overview / operations notes.

### Local development and safe schema changes

1. Copy `.env.example` to `.env` and set local or development-only PostgreSQL URLs. Do not use production credentials for local testing.
2. Run `npm run db:generate`, then `npm run db:migrate` to create a development migration, or `npm run db:deploy` to apply already-reviewed migrations in a deployment environment.
3. Review the migration SQL under `prisma/migrations/` before deploying. The Vercel build is configured to run `prisma migrate deploy` and the seed command; ensure the Production database variables point to the correct database before deploying schema changes.
4. Use a provider backup/snapshot before high-impact production changes. Never edit production data manually without a verified backup and a specific operational need.

The repository does not include production database credentials, and these instructions do not connect to or change the production database.
