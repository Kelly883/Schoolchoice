<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RbacTest extends TestCase
{
    /** @test */
    public function super_admin_can_access_admin_routes(): void
    {
        $user = $this->createUser('super_admin');
        $token = $this->createToken($user);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/admin/dashboard');

        $response->assertOk();
    }

    /** @test */
    public function school_admin_can_access_admin_routes(): void
    {
        $user = $this->createUser('school_admin');
        $token = $this->createToken($user);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/admin/dashboard');

        $response->assertOk();
    }

    /** @test */
    public function admissions_officer_cannot_access_admin_dashboard(): void
    {
        $user = $this->createUser('admissions_officer');
        $token = $this->createToken($user);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/admin/dashboard');

        $response->assertForbidden();
    }

    /** @test */
    public function teacher_cannot_access_parent_routes(): void
    {
        $user = $this->createUser('teacher');
        $token = $this->createToken($user);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/parent/children');

        $response->assertForbidden();
    }

    /** @test */
    public function parent_can_access_parent_routes(): void
    {
        $user = $this->createUser('parent');
        $token = $this->createToken($user);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/parent/children');

        $response->assertOk();
    }

    /** @test */
    public function finance_officer_can_access_fees(): void
    {
        $user = $this->createUser('finance_officer');
        $token = $this->createToken($user);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/admin/fee-structures');

        $response->assertOk();
    }

    private function createUser(string $role): User
    {
        return User::create([
            'name' => 'Test ' . $role,
            'email' => $role . '@example.com',
            'password' => Hash::make('password123'),
            'role' => $role,
            'email_verified_at' => now(),
        ]);
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
