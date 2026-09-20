# School Digital Platform — Architecture Document
## Phase 2: Architecture Design

---

## 1. Technology Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Frontend | Next.js (App Router) | 15.x | SSR/SSG for public SEO pages, SPA-like portals, single codebase |
| Backend | Laravel (API-only) | 11.x | Mature PHP framework, Eloquent ORM, robust validation, queue system |
| Database | SQLite (dev) / PostgreSQL (prod) | — | Zero-config local dev, production-grade persistence |
| Auth | Custom Bearer Token middleware | — | Stateless API auth, session table with idle timeout |
| Payments | Paystack + Flutterwave | — | Nigerian market standard gateways |
| File Storage | Local disk (dev) / S3-compatible (prod) | — | Document uploads, gallery images |
| Queue | Laravel Database driver | — | Notifications, payment webhooks |
| Cache | Laravel File/Redis | — | Session, rate limiting, query cache |

---

## 2. Repository Structure

```
Schoolchoice/
├── frontend/                    # Next.js App Router
│   ├── src/
│   │   ├── app/                  # Route handlers (pages + API routes)
│   │   │   ├── (public)/         # Public website routes
│   │   │   ├── (auth)/           # Login, register, reset-password
│   │   │   ├── parent/           # Parent portal (protected)
│   │   │   ├── admin/            # Admin portal (protected)
│   │   │   └── api/              # Next.js API routes (proxy to Laravel)
│   │   ├── features/             # Feature-folder modules
│   │   │   ├── public-site/      # Hero, about, academics, etc.
│   │   │   ├── auth/             # Auth forms, hooks, context
│   │   │   ├── admissions/       # Application workflow
│   │   │   ├── parent-portal/    # Parent dashboard features
│   │   │   ├── admin-portal/     # Admin management features
│   │   │   └── shared/           # Shared UI components
│   │   ├── lib/                  # Cross-cutting utilities
│   │   │   ├── api/              # Axios client, interceptors
│   │   │   ├── auth/             # Auth context, token management
│   │   │   ├── hooks/            # Shared hooks
│   │   │   └── utils/            # Helpers, formatters
│   │   ├── styles/               # Global CSS, design tokens
│   │   └── types/                # Shared TypeScript types
│   ├── public/                   # Static assets
│   ├── tailwind.config.ts        # Tailwind configuration
│   └── package.json
│
├── backend/                     # Laravel API
│   ├── app/
│   │   ├── Features/             # Feature-folder architecture
│   │   │   ├── Auth/             # Controllers, Models, Routes
│   │   │   ├── Admissions/
│   │   │   ├── Students/
│   │   │   ├── Parents/
│   │   │   ├── Teachers/
│   │   │   ├── Classes/
│   │   │   ├── AcademicSessions/
│   │   │   ├── Fees/
│   │   │   ├── Payments/
│   │   │   ├── Attendance/
│   │   │   ├── Results/
│   │   │   ├── Announcements/
│   │   │   ├── Messages/
│   │   │   ├── Events/
│   │   │   ├── News/
│   │   │   ├── Gallery/
│   │   │   ├── Documents/
│   │   │   ├── Notifications/
│   │   │   ├── AuditLogs/
│   │   │   └── Settings/
│   │   ├── Http/
│   │   │   ├── Controllers/      # Base controllers
│   │   │   ├── Middleware/       # BearerTokenAuth, RBAC, etc.
│   │   │   └── Requests/         # Form request validation
│   │   ├── Models/               # Eloquent models
│   │   └── Providers/
│   ├── database/
│   │   ├── migrations/           # Versioned schema
│   │   ├── seeders/              # Deterministic seed data
│   │   └── factories/            # Model factories
│   ├── routes/
│   │   └── api.php               # All API routes
│   ├── config/
│   ├── storage/
│   └── tests/
│       ├── Feature/              # Feature tests
│       └── Unit/                 # Unit tests
│
├── docs/                         # Project documentation
├── .env.example                  # Environment template
└── README.md
```

---

## 3. Frontend Architecture

### 3.1 Route Boundaries

| Route Group | Purpose | Auth Required |
|-------------|---------|---------------|
| `/` | Public website (marketing, admissions info) | No |
| `/login`, `/register`, `/reset-password` | Authentication | No |
| `/parent/*` | Parent portal | Yes (parent) |
| `/admin/*` | Admin portal | Yes (admin roles) |
| `/api/*` | Next.js API proxy routes | Varies |

### 3.2 Feature Folder Convention

Each feature under `src/features/<name>/` contains:
- `components/` — Reusable UI pieces
- `hooks/` — Custom React hooks
- `types/` — TypeScript interfaces
- `utils/` — Helper functions
- `services/` — Client-side API/data fetching
- `pages/` — Page components (if not using app/ routes)

### 3.3 Data Flow

```
User Browser
    ↓
Next.js App Router (Server Components for public, Client Components for portals)
    ↓
Next.js API Routes (/api/*) — proxy, SSRF protection, rate limiting
    ↓
Laravel API (/api/v1/*) — business logic, authorization, persistence
    ↓
Database (PostgreSQL/SQLite)
```

### 3.4 Authentication Flow (SPA + Bearer Token)

```
1. User submits login form (email + password)
2. Frontend POST → /api/auth/login → Laravel
3. Laravel validates, creates session row, returns { token, user }
4. Frontend stores token in sessionStorage
5. Axios interceptor attaches Authorization: Bearer <token> to all requests
6. Laravel BearerTokenAuth middleware validates token + idle timeout
7. On 401: frontend clears token, redirects to /login
8. Logout: frontend clears sessionStorage, backend revokes session
```

---

## 4. Backend Architecture

### 4.1 Feature Folder Convention

Each feature under `app/Features/<Name>/` contains:
- `Controllers/` — HTTP controllers
- `Models/` — Eloquent models
- `Resources/` — API resource transformers
- `Routes/` — Feature route definitions
- `Requests/` — Form request validation classes
- `Services/` — Business logic services
- `Policies/` — Authorization policies

### 4.2 API Route Structure

All API routes prefixed with `/api/v1/` and protected by `bearer` middleware group.

```
/api/v1/auth/login
/api/v1/auth/logout
/api/v1/auth/me
/api/v1/auth/refresh
/api/v1/auth/password/reset
/api/v1/auth/email/verify

/api/v1/admissions/applications
/api/v1/admissions/applications/{id}
/api/v1/admissions/applications/{id}/documents
/api/v1/admissions/applications/{id}/status
/api/v1/admissions/tours
/api/v1/admissions/enquiries

/api/v1/parent/children
/api/v1/parent/children/{id}/fees
/api/v1/parent/children/{id}/results
/api/v1/parent/children/{id}/attendance
/api/v1/parent/children/{id}/timetable
/api/v1/parent/payments
/api/v1/parent/receipts

/api/v1/admin/students
/api/v1/admin/parents
/api/v1/admin/teachers
/api/v1/admin/classes
/api/v1/admin/subjects
/api/v1/admin/academic-sessions
/api/v1/admin/terms
/api/v1/admin/admissions
/api/v1/admin/fees
/api/v1/admin/payments
/api/v1/admin/announcements
/api/v1/admin/audit-logs
/api/v1/admin/settings

/api/v1/payments/paystack/initialize
/api/v1/payments/paystack/verify
/api/v1/payments/paystack/webhook
/api/v1/payments/flutterwave/initialize
/api/v1/payments/flutterwave/verify
/api/v1/payments/flutterwave/webhook
```

### 4.3 Middleware Stack

| Middleware | Purpose |
|-----------|---------|
| `BearerTokenAuth` | Validates Bearer token, checks idle timeout |
| `RoleAccess` | RBAC — checks user role against allowed roles |
| `AuditLog` | Logs sensitive operations |
| `RateLimit` | Throttles API requests |
| `VerifyCsrfToken` | CSRF protection (for session-based routes) |

---

## 5. Database Domain Model

### 5.1 Core Entities

```
users
├── id, name, email, password, role, email_verified_at
├── last_activity_at, created_at, updated_at
└── sessions (has many)

roles
├── id, name, description
└── permissions (many-to-many)

students
├── id, user_id, admission_number, first_name, last_name
├── date_of_birth, gender, class_id, parent_id
├── admission_date, status, photo_url
└── academic_session_id

parents
├── id, user_id, phone, address, occupation
└── children (many-to-many via student_parent)

teachers
├── id, user_id, phone, qualification, subject_id
├── employment_date, status
└── classes (many-to-many)

classes
├── id, name, section, teacher_id, academic_session_id
└── students (has many)

subjects
├── id, name, code, class_id, teacher_id
└── results (has many)

academic_sessions
├── id, name, start_date, end_date, is_current
└── terms (has many)

terms
├── id, academic_session_id, name, start_date, end_date
└── is_current

applications
├── id, applicant_name, applicant_email, applicant_phone
├── child_name, child_dob, child_gender, desired_class_id
├── status, application_number, submitted_at
├── reviewed_by, reviewed_at, decision, decision_notes
└── documents (has many)

application_documents
├── id, application_id, document_type, file_path, file_name
├── file_size, mime_type, uploaded_at
└── verified_by, verified_at, verification_status

school_tours
├── id, parent_name, email, phone, preferred_date
├── preferred_time, status, notes
└── created_at

fee_structures
├── id, class_id, academic_session_id, name
├── amount, due_date, description
└── is_recurring

invoices
├── id, student_id, fee_structure_id, amount
├── due_date, status, generated_at
└── paid_at, paid_amount

payments
├── id, user_id, invoice_id, amount, currency
├── gateway, gateway_reference, gateway_response
├── status, paid_at, verified_at
└── verified_by, metadata

receipts
├── id, payment_id, receipt_number, amount
├── issued_at, downloaded_at
└── file_path

attendance
├── id, student_id, class_id, date, status
├── recorded_by, recorded_at
└── term_id

results
├── id, student_id, subject_id, term_id
├── score, grade, remarks
├── published_at, published_by
└── academic_session_id

assignments
├── id, class_id, subject_id, title, description
├── due_date, created_by, created_at
└── submissions (has many)

announcements
├── id, title, content, audience, published_by
├── published_at, expires_at
└── is_pinned

messages
├── id, sender_id, recipient_id, subject, body
├── read_at, created_at
└── parent_id (for threading)

events
├── id, title, description, event_date, location
├── created_by, created_at
└── is_public

news
├── id, title, slug, content, excerpt, featured_image
├── published_by, published_at, is_published
└── category

gallery
├── id, title, image_url, caption, category
├── uploaded_by, uploaded_at
└── is_featured

documents
├── id, title, file_path, file_name, category
├── uploaded_by, uploaded_at, access_level
└── downloadable

audit_logs
├── id, user_id, action, model_type, model_id
├── old_values, new_values, ip_address, user_agent
└── created_at

notifications
├── id, user_id, type, title, body, data
├── read_at, created_at
└── action_url
```

---

## 6. Authentication & Authorization

### 6.1 Roles

| Role | Access Level |
|------|-------------|
| `super_admin` | Full system access |
| `school_admin` | All admin functions except system settings |
| `admissions_officer` | Admissions queue, applications, tours |
| `finance_officer` | Fees, payments, receipts, financial reports |
| `teacher` | Classes, attendance, results, assignments |
| `parent` | Own children's data only |
| `student` | Own results, attendance, timetable |

### 6.2 Authorization Rules

- **Server-side enforcement**: Every API endpoint validates permissions
- **Resource ownership**: Parents can only access their own children's data
- **Role hierarchy**: Higher roles inherit lower role permissions
- **Audit trail**: All sensitive operations logged
- **No frontend trust**: Frontend UI hides/shows based on role, but backend enforces

### 6.3 Session Management

- Token: 64-character random string (SHA-256 hashed in DB)
- Idle timeout: 30 minutes (configurable)
- Absolute timeout: 8 hours
- Session table tracks: user_id, token_hash, ip_address, user_agent, last_activity_at
- Concurrent sessions: Allowed (multiple devices)
- Revocation: On logout, password change, or admin action

---

## 7. Payment Architecture

### 7.1 Payment Flow

```
1. Frontend initiates payment → POST /api/v1/payments/{gateway}/initialize
2. Laravel creates payment record (status: pending)
3. Laravel returns gateway checkout URL
4. User redirected to gateway (Paystack/Flutterwave)
5. User completes payment on gateway
6. Gateway sends webhook → POST /api/v1/payments/{gateway}/webhook
7. Laravel verifies payment with gateway API (server-to-server)
8. Laravel updates payment record (status: successful)
9. Laravel generates receipt
10. Laravel creates notification for user
11. Frontend polls or receives redirect with success status
```

### 7.2 Security Rules

- Never trust frontend payment status
- Always verify with gateway API before marking as paid
- Webhook endpoint validates signature
- Idempotent webhook handling (duplicate webhooks don't create duplicate records)
- Secrets stored in environment variables only
- Payment logs record gateway, reference, amount, status, timestamps

### 7.3 Supported States

`pending` → `processing` → `successful` / `failed` / `cancelled` / `refunded`

---

## 8. File/Document Storage

### 8.1 Strategy

| Environment | Storage | Path |
|-------------|---------|------|
| Development | Local disk | `storage/app/public/` |
| Production | S3-compatible | Configured via `FILESYSTEM_DISK` |

### 8.2 Upload Security

- Validate file type (whitelist: PDF, JPG, PNG, DOC, DOCX)
- Validate file size (max 10MB for documents, 5MB for images)
- Store outside web root
- Serve through controller with authorization check
- Virus scanning (ClamAV in production)

---

## 9. Notification Architecture

### 9.1 Channels

- **In-app**: Database notifications, fetched via API
- **Email**: Laravel Mail (SMTP in production)
- **SMS**: Twilio or local Nigerian SMS provider (future)

### 9.2 Events

- Application submitted → Notify admissions officer
- Application status changed → Notify parent
- Payment received → Notify parent + finance officer
- Attendance recorded → Notify parent (if absent)
- Result published → Notify parent
- Announcement published → Notify target audience

---

## 10. Audit Logging

### 10.1 Logged Actions

- User login/logout
- Application status changes
- Payment verification
- Student record changes
- Fee structure changes
- Permission changes
- Document uploads/downloads
- Settings changes

### 10.2 Log Structure

```json
{
  "user_id": 1,
  "action": "application.status_changed",
  "model_type": "Application",
  "model_id": 42,
  "old_values": { "status": "pending" },
  "new_values": { "status": "approved" },
  "ip_address": "192.168.1.1",
  "user_agent": "Mozilla/5.0...",
  "created_at": "2026-09-20T14:00:00Z"
}
```

---

## 11. Error Handling & Observability

### 11.1 Error Responses

Consistent JSON error format:
```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": { "field": ["Validation error"] },
  "code": "ERROR_CODE"
}
```

### 11.2 Logging

- Laravel: Daily log files, configurable level
- Next.js: Server-side logging to stdout
- Production: External log aggregation (optional)

### 11.3 Monitoring

- Health check endpoint: `/api/v1/health`
- Queue worker monitoring
- Failed job tracking
- Payment webhook failure alerts

---

## 12. Environment/Configuration

### 12.1 Environment Variables

```env
# App
APP_NAME="School Digital Platform"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:3000

# Database (Backend)
DB_CONNECTION=sqlite
DB_DATABASE=/path/to/database.sqlite

# Database (Frontend - for API proxy)
API_BASE_URL=http://localhost:8000/api/v1

# Auth
SESSION_IDLE_TIMEOUT_MINUTES=30
SESSION_ABSOLUTE_TIMEOUT_MINUTES=480

# Payments
PAYSTACK_PUBLIC_KEY=pk_test_...
PAYSTACK_SECRET_KEY=sk_test_...
PAYSTACK_PAYMENT_URL=https://api.paystack.co
FLUTTERWAVE_PUBLIC_KEY=FLWSECK_TEST-...
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-...
FLUTTERWAVE_PAYMENT_URL=https://api.flutterwave.com/v3

# Mail
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=...
MAIL_PASSWORD=...

# Storage
FILESYSTEM_DISK=local
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_APP_NAME="School Digital Platform"
```

---

## 13. Testing Strategy

### 13.1 Backend (Laravel)

- **Feature tests**: Full HTTP request/response cycle
- **Unit tests**: Individual model, service, policy tests
- **Auth tests**: Token creation, validation, expiration
- **Authorization tests**: Role-based access control
- **Payment tests**: Webhook handling, verification, idempotency
- **Database**: SQLite in-memory for tests

### 13.2 Frontend (Next.js)

- **Component tests**: React Testing Library
- **Integration tests**: Playwright E2E
- **Visual regression**: Screenshot comparison (optional)

### 13.3 E2E Testing

- Playwright tests for critical journeys
- Test against real backend with seeded data
- Cover all 12 critical journeys from PRD

---

## 14. Reusable UI Components

### 4.1 Design System Primitives

- Button (primary, secondary, ghost, danger, loading, disabled)
- Input (text, email, password, select, textarea, file)
- Card, Badge, Avatar
- Modal, Drawer, Toast
- Table, Pagination
- Tabs, Accordion
- Spinner, Skeleton
- EmptyState, ErrorState
- Breadcrumb, PageHeader

### 4.2 Layout Components

- PublicLayout (header, footer, navigation)
- AuthLayout (centered card)
- ParentLayout (sidebar, topbar, mobile nav)
- AdminLayout (sidebar, topbar, mobile nav)

---

## 15. Architecture Gate Verification

| Criterion | Status |
|-----------|--------|
| Public website can be built independently | PASS |
| Auth module is self-contained | PASS |
| Admissions can be added without rebuilding core | PASS |
| Parent portal can be added without rebuilding core | PASS |
| Admin portal can be added without rebuilding core | PASS |
| Payments can be added without rebuilding core | PASS |
| Future modules (attendance, results, etc.) can be added | PASS |
| Database schema supports all domains | PASS |
| API routes are consistent and RESTful | PASS |
| Authorization is enforced server-side | PASS |

---

## 16. Architectural Decisions & Deviations

| Decision | Rationale |
|----------|-----------|
| Next.js for frontend | SSR for SEO public pages, SPA for portals, single codebase |
| Laravel for backend | Mature, robust, excellent for complex domain logic |
| Custom Bearer token auth | Stateless, works well with SPA, no Sanctum overhead |
| Feature folders (frontend + backend) | Scalable, clear boundaries, easy to maintain |
| SQLite for dev, PostgreSQL for prod | Zero-config local dev, production-grade persistence |
| Next.js API proxy routes | SSRF protection, rate limiting, clean separation |
| Database queue driver | No external dependencies for background jobs |
| Local file storage for dev | Simple, no external services needed |

---

**Phase 2 Complete.** Architecture is defined and verified. Ready for Phase 3 (Design System).
