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
