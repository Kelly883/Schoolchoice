# Backend API

Laravel 11 API for the School Digital Platform.

## Setup

```bash
composer install
cp ../.env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

## API Routes

All routes prefixed with `/api/v1/`.

### Authentication
- POST `/api/v1/auth/login`
- POST `/api/v1/auth/logout`
- GET `/api/v1/auth/me`
- POST `/api/v1/auth/password/reset`

### Admissions
- GET/POST `/api/v1/admissions/applications`
- GET/PATCH `/api/v1/admissions/applications/{id}`
- POST `/api/v1/admissions/applications/{id}/documents`
- GET/POST `/api/v1/admissions/tours`

### Parent Portal
- GET `/api/v1/parent/children`
- GET `/api/v1/parent/children/{id}/fees`
- GET `/api/v1/parent/children/{id}/results`
- GET `/api/v1/parent/payments`

### Admin
- GET/POST `/api/v1/admin/students`
- GET/POST `/api/v1/admin/teachers`
- GET/POST `/api/v1/admin/classes`
- GET `/api/v1/admin/audit-logs`

### Payments
- POST `/api/v1/payments/paystack/initialize`
- POST `/api/v1/payments/paystack/webhook`
- POST `/api/v1/payments/flutterwave/initialize`
- POST `/api/v1/payments/flutterwave/webhook`

## Testing

```bash
php artisan test
```

## Feature Folders

Each feature lives under `app/Features/<Name>/` with:
- `Controllers/` — HTTP controllers
- `Models/` — Eloquent models
- `Resources/` — API resource transformers
- `Routes/` — Feature route definitions
- `Requests/` — Form request validation
- `Services/` — Business logic
- `Policies/` — Authorization policies
