# School Digital Platform

A production-ready school digital platform featuring a public website, online admissions, parent portal, admin portal, and payment integration.

## Architecture

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Laravel 11 (API-only) + PHP 8.3
- **Database**: SQLite (development) / PostgreSQL (production)
- **Auth**: Custom Bearer Token middleware with session management
- **Payments**: Paystack + Flutterwave integration

## Project Structure

```
Schoolchoice/
├── frontend/          # Next.js App Router
│   ├── src/
│   │   ├── app/       # Route handlers
│   │   ├── features/  # Feature-folder modules
│   │   ├── lib/       # Cross-cutting utilities
│   │   ├── styles/    # Global CSS, design tokens
│   │   └── types/     # Shared TypeScript types
│   └── ...
├── backend/           # Laravel API
│   ├── app/
│   │   ├── Features/  # Feature-folder architecture
│   │   ├── Http/      # Controllers, Middleware
│   │   └── Models/    # Eloquent models
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeders/
│   │   └── factories/
│   └── ...
├── docs/              # Project documentation
└── .env.example       # Environment template
```

## Getting Started

### Prerequisites

- Node.js 22+
- PHP 8.3+
- Composer
- SQLite (or PostgreSQL)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
composer install
cp ../.env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Environment Variables

Copy `.env.example` to `.env` and configure:
- Database credentials
- Payment gateway keys (Paystack/Flutterwave)
- Mail settings
- Frontend URL

## Phases

This project is built in 19 sequential phases:

1. Analyze Existing Project
2. Create Architecture
3. Create Design System
4. Build Public Website
5. Test Public Website
6. Build Authentication
7. Build Admissions
8. Test Admissions
9. Build Parent Portal
10. Test Parent Portal
11. Build Admin Portal
12. Test Admin Portal
13. Integrate Payments
14. Test Payment Flows
15. Security Audit
16. Performance Audit
17. Accessibility Audit
18. End-to-End Testing
19. Production Readiness Audit

## Documentation

- [Architecture](ARCHITECTURE.md)
- [Project Analysis](PROJECT_ANALYSIS.md)
