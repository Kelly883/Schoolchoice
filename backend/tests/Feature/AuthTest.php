<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthTest extends TestCase
{
    /** @test */
    public function user_can_login_with_valid_credentials(): void
    {
        $user = User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password123'),
            'role' => 'parent',
            'email_verified_at' => now(),
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        $response->assertOk();
        $response->assertJsonStructure(['success', 'token', 'user']);
    }

    /** @test */
    public function user_cannot_login_with_invalid_credentials(): void
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'wrong@example.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertUnauthorized();
    }

    /** @test */
    public function user_can_register(): void
    {
        $response = $this->postJson('/api/v1/auth/register', [
            'name' => 'New User',
            'email' => 'new@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('users', ['email' => 'new@example.com']);
    }

    /** @test */
    public function user_can_logout(): void
    {
        $user = User::factory()->create();
        $token = $this->createToken($user);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/v1/auth/logout');

        $response->assertOk();
        $this->assertDatabaseMissing('sessions', ['user_id' => $user->id]);
    }

    /** @test */
    public function authenticated_user_can_access_me(): void
    {
        $user = User::factory()->create();
        $token = $this->createToken($user);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/auth/me');

        $response->assertOk();
        $response->assertJson(['user' => ['id' => $user->id]]);
    }

    /** @test */
    public function unauthenticated_user_cannot_access_protected_route(): void
    {
        $response = $this->getJson('/api/v1/auth/me');
        $response->assertUnauthorized();
    }

    /** @test */
    public function session_expires_after_idle_timeout(): void
    {
        $user = User::factory()->create();
        $token = $this->createToken($user);

        // Simulate idle timeout by updating last_activity_at
        $user->sessions->first()->update(['last_activity_at' => now()->subMinutes(31)]);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/v1/auth/me');

        $response->assertUnauthorized();
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
