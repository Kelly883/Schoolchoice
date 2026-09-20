<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\AcademicSession;
use App\Models\Term;
use App\Models\SchoolClass;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create roles
        $roles = [
            ['name' => 'super_admin', 'description' => 'Full system access'],
            ['name' => 'school_admin', 'description' => 'School administration'],
            ['name' => 'admissions_officer', 'description' => 'Manages admissions'],
            ['name' => 'finance_officer', 'description' => 'Manages finances'],
            ['name' => 'teacher', 'description' => 'Teaching staff'],
            ['name' => 'parent', 'description' => 'Parent/guardian'],
            ['name' => 'student', 'description' => 'Student'],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }

        // Create super admin
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@schoolname.edu',
            'password' => Hash::make('password123'),
            'role' => 'super_admin',
            'email_verified_at' => now(),
        ]);

        // Create academic session
        $session = AcademicSession::create([
            'name' => '2025/2026',
            'start_date' => '2025-09-01',
            'end_date' => '2026-07-31',
            'is_current' => true,
        ]);

        // Create terms
        Term::create([
            'academic_session_id' => $session->id,
            'name' => 'First Term',
            'start_date' => '2025-09-01',
            'end_date' => '2025-12-15',
            'is_current' => true,
        ]);

        Term::create([
            'academic_session_id' => $session->id,
            'name' => 'Second Term',
            'start_date' => '2026-01-05',
            'end_date' => '2026-04-01',
            'is_current' => false,
        ]);

        Term::create([
            'academic_session_id' => $session->id,
            'name' => 'Third Term',
            'start_date' => '2026-04-15',
            'end_date' => '2026-07-31',
            'is_current' => false,
        ]);

        // Create classes
        $classes = [
            ['name' => 'Nursery 1', 'section' => 'A'],
            ['name' => 'Nursery 2', 'section' => 'A'],
            ['name' => 'Primary 1', 'section' => 'A'],
            ['name' => 'Primary 2', 'section' => 'A'],
            ['name' => 'Primary 3', 'section' => 'A'],
            ['name' => 'Primary 4', 'section' => 'A'],
            ['name' => 'Primary 5', 'section' => 'A'],
            ['name' => 'Primary 6', 'section' => 'A'],
            ['name' => 'JSS 1', 'section' => 'A'],
            ['name' => 'JSS 2', 'section' => 'A'],
            ['name' => 'JSS 3', 'section' => 'A'],
            ['name' => 'SSS 1', 'section' => 'A'],
            ['name' => 'SSS 2', 'section' => 'A'],
            ['name' => 'SSS 3', 'section' => 'A'],
        ];

        foreach ($classes as $class) {
            SchoolClass::create([
                'name' => $class['name'],
                'section' => $class['section'],
                'academic_session_id' => $session->id,
            ]);
        }
    }
}
