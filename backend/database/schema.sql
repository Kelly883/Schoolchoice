-- School Digital Platform - SQLite Schema
-- Run with: sqlite3 database/database.sqlite < database/schema.sql

PRAGMA foreign_keys = ON;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'parent',
    email_verified_at DATETIME,
    last_activity_at DATETIME,
    remember_token TEXT,
    created_at DATETIME,
    updated_at DATETIME
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    last_activity_at DATETIME,
    expires_at DATETIME,
    created_at DATETIME,
    updated_at DATETIME
);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token_hash);

-- Roles table
CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at DATETIME,
    updated_at DATETIME
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    admission_number TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    gender TEXT NOT NULL,
    class_id INTEGER REFERENCES classes(id) ON DELETE SET NULL,
    parent_id INTEGER REFERENCES parents(id) ON DELETE SET NULL,
    admission_date DATE,
    status TEXT NOT NULL DEFAULT 'active',
    photo_url TEXT,
    academic_session_id INTEGER REFERENCES academic_sessions(id) ON DELETE SET NULL,
    created_at DATETIME,
    updated_at DATETIME
);

-- Parents table
CREATE TABLE IF NOT EXISTS parents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    phone TEXT,
    address TEXT,
    occupation TEXT,
    created_at DATETIME,
    updated_at DATETIME
);

-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    phone TEXT,
    qualification TEXT,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE SET NULL,
    employment_date DATE,
    status TEXT NOT NULL DEFAULT 'active',
    created_at DATETIME,
    updated_at DATETIME
);

-- Classes table
CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    section TEXT,
    teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL,
    academic_session_id INTEGER REFERENCES academic_sessions(id) ON DELETE SET NULL,
    created_at DATETIME,
    updated_at DATETIME
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    code TEXT,
    class_id INTEGER REFERENCES classes(id) ON DELETE SET NULL,
    teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL,
    created_at DATETIME,
    updated_at DATETIME
);

-- Academic sessions table
CREATE TABLE IF NOT EXISTS academic_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME,
    updated_at DATETIME
);

-- Terms table
CREATE TABLE IF NOT EXISTS terms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    academic_session_id INTEGER NOT NULL REFERENCES academic_sessions(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME,
    updated_at DATETIME
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    applicant_name TEXT NOT NULL,
    applicant_email TEXT NOT NULL,
    applicant_phone TEXT NOT NULL,
    child_name TEXT NOT NULL,
    child_dob DATE NOT NULL,
    child_gender TEXT NOT NULL,
    desired_class_id INTEGER REFERENCES classes(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    application_number TEXT NOT NULL UNIQUE,
    submitted_at DATETIME,
    reviewed_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    reviewed_at DATETIME,
    decision TEXT,
    decision_notes TEXT,
    created_at DATETIME,
    updated_at DATETIME
);

-- Application documents table
CREATE TABLE IF NOT EXISTS application_documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    application_id INTEGER NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    uploaded_at DATETIME,
    verified_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    verified_at DATETIME,
    verification_status TEXT NOT NULL DEFAULT 'pending',
    created_at DATETIME,
    updated_at DATETIME
);

-- School tours table
CREATE TABLE IF NOT EXISTS school_tours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at DATETIME,
    updated_at DATETIME
);

-- Fee structures table
CREATE TABLE IF NOT EXISTS fee_structures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class_id INTEGER REFERENCES classes(id) ON DELETE SET NULL,
    academic_session_id INTEGER REFERENCES academic_sessions(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    amount REAL NOT NULL,
    due_date DATE,
    description TEXT,
    is_recurring INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME,
    updated_at DATETIME
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    fee_structure_id INTEGER REFERENCES fee_structures(id) ON DELETE SET NULL,
    amount REAL NOT NULL,
    due_date DATE,
    status TEXT NOT NULL DEFAULT 'pending',
    generated_at DATETIME,
    paid_at DATETIME,
    paid_amount REAL,
    created_at DATETIME,
    updated_at DATETIME
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    invoice_id INTEGER REFERENCES invoices(id) ON DELETE SET NULL,
    amount REAL NOT NULL,
    currency TEXT NOT NULL DEFAULT 'NGN',
    gateway TEXT NOT NULL,
    gateway_reference TEXT,
    gateway_response TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    paid_at DATETIME,
    verified_at DATETIME,
    verified_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    metadata TEXT,
    created_at DATETIME,
    updated_at DATETIME
);
CREATE INDEX IF NOT EXISTS idx_payments_reference ON payments(gateway_reference);

-- Receipts table
CREATE TABLE IF NOT EXISTS receipts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    payment_id INTEGER NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
    receipt_number TEXT NOT NULL UNIQUE,
    amount REAL NOT NULL,
    issued_at DATETIME,
    downloaded_at DATETIME,
    file_path TEXT,
    created_at DATETIME,
    updated_at DATETIME
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    class_id INTEGER REFERENCES classes(id) ON DELETE SET NULL,
    date DATE NOT NULL,
    status TEXT NOT NULL,
    recorded_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    recorded_at DATETIME,
    term_id INTEGER REFERENCES terms(id) ON DELETE SET NULL,
    created_at DATETIME,
    updated_at DATETIME,
    UNIQUE(student_id, date)
);

-- Results table
CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    term_id INTEGER REFERENCES terms(id) ON DELETE SET NULL,
    score REAL,
    grade TEXT,
    remarks TEXT,
    published_at DATETIME,
    published_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    academic_session_id INTEGER REFERENCES academic_sessions(id) ON DELETE SET NULL,
    created_at DATETIME,
    updated_at DATETIME
);

-- Announcements table
CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    audience TEXT NOT NULL DEFAULT 'all',
    published_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    published_at DATETIME,
    expires_at DATETIME,
    is_pinned INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME,
    updated_at DATETIME
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipient_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subject TEXT,
    body TEXT NOT NULL,
    read_at DATETIME,
    parent_id INTEGER REFERENCES messages(id) ON DELETE CASCADE,
    created_at DATETIME,
    updated_at DATETIME
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    event_date DATETIME NOT NULL,
    location TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    is_public INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME,
    updated_at DATETIME
);

-- News table
CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image TEXT,
    published_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    published_at DATETIME,
    is_published INTEGER NOT NULL DEFAULT 0,
    category TEXT,
    created_at DATETIME,
    updated_at DATETIME
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    caption TEXT,
    category TEXT,
    uploaded_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    uploaded_at DATETIME,
    is_featured INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME,
    updated_at DATETIME
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    category TEXT,
    uploaded_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    uploaded_at DATETIME,
    access_level TEXT NOT NULL DEFAULT 'public',
    created_at DATETIME,
    updated_at DATETIME
);

-- Audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    model_type TEXT,
    model_id INTEGER,
    old_values TEXT,
    new_values TEXT,
    ip_address TEXT,
    user_agent TEXT,
    created_at DATETIME,
    updated_at DATETIME
);
CREATE INDEX IF NOT EXISTS idx_audit_model ON audit_logs(model_type, model_id);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    data TEXT,
    read_at DATETIME,
    action_url TEXT,
    created_at DATETIME,
    updated_at DATETIME
);

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    queue TEXT NOT NULL,
    payload TEXT NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    reserved_at INTEGER,
    available_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_jobs_queue ON jobs(queue);

-- Password reset tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    token TEXT NOT NULL,
    created_at DATETIME,
    expires_at DATETIME
);
CREATE INDEX IF NOT EXISTS idx_password_reset_email ON password_reset_tokens(email);

-- Insert default roles
INSERT OR IGNORE INTO roles (name, description) VALUES
    ('super_admin', 'Full system access'),
    ('school_admin', 'School administration'),
    ('admissions_officer', 'Manages admissions'),
    ('finance_officer', 'Manages finances'),
    ('teacher', 'Teaching staff'),
    ('parent', 'Parent/guardian'),
    ('student', 'Student');

-- Insert default super admin user (password: password123)
INSERT OR IGNORE INTO users (name, email, password, role, email_verified_at, created_at, updated_at) VALUES
    ('Super Admin', 'admin@schoolname.edu', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_admin', datetime('now'), datetime('now'), datetime('now'));

-- Insert default academic session
INSERT OR IGNORE INTO academic_sessions (name, start_date, end_date, is_current, created_at, updated_at) VALUES
    ('2025/2026', '2025-09-01', '2026-07-31', 1, datetime('now'), datetime('now'));

-- Insert default terms
INSERT OR IGNORE INTO terms (academic_session_id, name, start_date, end_date, is_current, created_at, updated_at) VALUES
    (1, 'First Term', '2025-09-01', '2025-12-15', 1, datetime('now'), datetime('now')),
    (1, 'Second Term', '2026-01-05', '2026-04-01', 0, datetime('now'), datetime('now')),
    (1, 'Third Term', '2026-04-15', '2026-07-31', 0, datetime('now'), datetime('now'));

-- Insert default classes
INSERT OR IGNORE INTO classes (name, section, academic_session_id, created_at, updated_at) VALUES
    ('Nursery 1', 'A', 1, datetime('now'), datetime('now')),
    ('Nursery 2', 'A', 1, datetime('now'), datetime('now')),
    ('Primary 1', 'A', 1, datetime('now'), datetime('now')),
    ('Primary 2', 'A', 1, datetime('now'), datetime('now')),
    ('Primary 3', 'A', 1, datetime('now'), datetime('now')),
    ('Primary 4', 'A', 1, datetime('now'), datetime('now')),
    ('Primary 5', 'A', 1, datetime('now'), datetime('now')),
    ('Primary 6', 'A', 1, datetime('now'), datetime('now')),
    ('JSS 1', 'A', 1, datetime('now'), datetime('now')),
    ('JSS 2', 'A', 1, datetime('now'), datetime('now')),
    ('JSS 3', 'A', 1, datetime('now'), datetime('now')),
    ('SSS 1', 'A', 1, datetime('now'), datetime('now')),
    ('SSS 2', 'A', 1, datetime('now'), datetime('now')),
    ('SSS 3', 'A', 1, datetime('now'), datetime('now'));
