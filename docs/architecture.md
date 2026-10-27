# Architecture and requirements map

## Product shape

This is one organization platform serving individual learners and organizational buyers. The public site presents the education catalog and technology services under one configurable brand. It avoids fabricated company identity, metrics, outcomes, accreditation, partners, or testimonials until the operator supplies evidence.

## Sitemap

- Home
- About
- Learn: internships, courses, workshops, webinars, bootcamps, certifications
- Technology domains and service detail pages
- Services
- Institutions and corporate training
- Start a project and contact
- Journal, FAQ, search, certificate verification
- Login, registration, learner dashboard
- Admin: programs, enquiries, accounts

## Primary journeys

- Learner: catalog → program detail → internship application or account → free course enrollment → dashboard → issued credential → public verification.
- Business: service catalog → project enquiry → admin lead inbox → status pipeline.
- Institution or team: partnership/training page → enquiry → lead pipeline.
- Administrator: sign in → role-gated overview → programs/enquiries/accounts; enquiry status updates and program creation produce audit records.

Paid enrollments stop at a clear integration response until secure provider checkout and signed webhooks exist. Application document upload awaits private object storage. Email verification and account recovery await a mail provider and token workflow.

## System layers

Browser with responsive App Router pages and client forms calls same-origin JSON APIs. Next.js route handlers perform Zod validation and role checks. Prisma Client 7 with the PostgreSQL adapter reads and writes PostgreSQL domains for identity, catalog, participation, credentials and operations.

The Prisma singleton is server-only and expects DATABASE_URL; migrations use DIRECT_URL from prisma.config.ts. Neither variable should be exposed to client bundles.

## Database domains

| Domain | Models | Purpose |
| --- | --- | --- |
| Identity | User, Session, StudentProfile, Notification | Role-based accounts and hashed, expiring session tokens |
| Catalog | Program, CourseModule, CourseLesson, Service, Technology, BlogPost, BlogCategory, FAQ, Testimonial, Announcement | Published content and future LMS growth |
| Participation | InternshipApplication, CourseEnrollment, CourseProgress, WorkshopRegistration, WebinarRegistration | Applications, enrollment, lesson progress and event attendance |
| Credentials | Certificate, CertificateVerification | Revocable credential records and hashed verification request trace |
| Operations | Inquiry, AdminAuditLog | Sales and partnership pipeline with admin actions |
| Integrations | Payment, FileAsset | Integration seams; not a claim that payment/storage flows are active |

## Roles and boundaries

- STUDENT: self registration, self dashboard and course enrollment.
- INSTRUCTOR: reserved for future teaching capabilities.
- CORPORATE and INSTITUTION: reserved for organization workspaces.
- ADMIN: server-side protected operational views and admin APIs.

Registration cannot assign a privileged role. Session cookies are HTTP-only, same-site, secure in production, and hold an opaque random token; only its SHA-256 hash is stored. Passwords use bcrypt. Public endpoints validate input server-side. Admin writes create audit records. Production still requires rate limits, bot protection, security monitoring and verified recovery flows.

## API contracts

| Route | Behavior |
| --- | --- |
| POST /api/auth/register | Create learner account and session |
| POST /api/auth/login | Verify password and issue session |
| POST /api/auth/logout | Revoke session and clear cookie |
| POST /api/inquiries/:kind | Validate/store contact, project, institution, corporate or course enquiry |
| POST /api/programs/:slug/apply | Store an application for a published internship |
| POST /api/programs/:slug/enroll | Enroll signed-in users in free courses/certifications; paid entries require checkout setup |
| GET /api/certificates/verify/:certificateId | Return public credential status and log a hashed requester address |
| GET /api/search?q=... | Search published programs |
| GET and POST /api/admin/programs | Admin list/create programs |
| GET /api/admin/inquiries | Admin list leads |
| PATCH /api/admin/inquiries/:id | Admin pipeline status transition |

## UI system

The interface uses a warm paper canvas, forest green, near-black ink and restrained lime accent. Editorial typography, generous spacing, small labels and clear form feedback establish a serious education-and-technology feel. CSS handles responsive layout and reduced motion; native details disclosure provides mobile navigation. No borrowed brand assets are included.

## Deployment sequence

1. Set real brand/contact values and SITE_URL.
2. Provision managed PostgreSQL and configure DATABASE_URL plus DIRECT_URL.
3. Apply npm run db:migrate and generate Prisma Client.
4. Create a learner account, then promote the initial administrator through a secured database operation (documented in README).
5. Configure storage, email, payment/webhooks, rate limits and monitoring before enabling those production journeys.
6. Review legal text and accessibility/content claims, then deploy the Next.js app.
