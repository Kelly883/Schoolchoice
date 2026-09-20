<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Application;
use Illuminate\Support\Facades\Hash;

class AdmissionsTest extends TestCase
{
    /** @test */
    public function public_can_submit_application(): void
    {
        $response = $this->postJson('/api/v1/admissions/applications', [
            'applicant_name' => 'John Doe',
            'applicant_email' => 'john@example.com',
            'applicant_phone' => '08012345678',
            'child_name' => 'Jane Doe',
            'child_dob' => '2018-01-01',
            'child_gender' => 'female',
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('applications', [
            'applicant_email' => 'john@example.com',
            'child_name' => 'Jane Doe',
        ]);
    }

    /** @test */
    public function application_requires_valid_data(): void
    {
        $response = $this->postJson('/api/v1/admissions/applications', [
            'applicant_name' => '',
        ]);

        $response->assertUnprocessable();
    }

    /** @test */
    public function public_can_track_application(): void
    {
        $application = Application::create([
            'applicant_name' => 'John Doe',
            'applicant_email' => 'john@example.com',
            'applicant_phone' => '08012345678',
            'child_name' => 'Jane Doe',
            'child_dob' => '2018-01-01',
            'child_gender' => 'female',
            'application_number' => 'APP-TEST123',
            'status' => 'pending',
            'submitted_at' => now(),
        ]);

        $response = $this->getJson('/api/v1/admissions/applications/track?application_number=APP-TEST123');

        $response->assertOk();
        $response->assertJsonFragment(['application_number' => 'APP-TEST123']);
    }

    /** @test */
    public function admin_can_view_applications(): void
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password123'),
            'role' => 'school_admin',
            'email_verified_at' => now(),
        ]);

        $token = $this->createToken($admin);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/admissions/applications');

        $response->assertOk();
    }

    /** @test */
    public function non_admin_cannot_view_applications(): void
    {
        $parent = User::create([
            'name' => 'Parent',
            'email' => 'parent@example.com',
            'password' => Hash::make('password123'),
            'role' => 'parent',
            'email_verified_at' => now(),
        ]);

        $token = $this->createToken($parent);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/admissions/applications');

        $response->assertForbidden();
    }

    /** @test */
    public function public_can_book_tour(): void
    {
        $response = $this->postJson('/api/v1/admissions/tours', [
            'parent_name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '08012345678',
            'preferred_date' => '2026-10-01',
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('school_tours', ['email' => 'john@example.com']);
    }

    /** @test */
    function double_booking_prevention_works(): void
    {
        // Create first booking
        $this->postJson('/api/v1/admissions/tours', [
            'parent_name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '08012345678',
            'preferred_date' => '2026-10-01',
        ]);

        // Try to book again for same date
        $response = $this->postJson('/api/v1/admissions/tours', [
            'parent_name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '08012345678',
            'preferred_date' => '2026-10-01',
        ]);

        $response->assertUnprocessable();
    }

    private function createToken(User $user): string
    {
        $token = \Illuminate\Support\Str::random(64);
        \App\Models\Session::create([
            'user_id' => $user->id,
            'token_hash' => hash('sha256', $token),
            'ip_address' => '127.0.0.1',
            'user_agent' => 'Test',
            'last_activity_at' => now(),
            'expires_at' => now()->addMinutes(480),
        ]);
        return $token;
    }
}
