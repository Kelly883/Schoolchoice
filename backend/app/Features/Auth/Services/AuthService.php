<?php

namespace App\Features\Auth\Services;

use App\Models\User;
use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class AuthService
{
    /**
     * Login a user and create a session.
     */
    public function login(string $email, string $password, string $ip, string $userAgent): array
    {
        $user = User::where('email', $email)->first();

        if (!$user || !Hash::check($password, $user->password)) {
            return [
                'success' => false,
                'message' => 'Invalid email or password.',
                'code' => 'INVALID_CREDENTIALS',
            ];
        }

        if (!$user->email_verified_at) {
            return [
                'success' => false,
                'message' => 'Please verify your email before logging in.',
                'code' => 'EMAIL_NOT_VERIFIED',
            ];
        }

        $token = $this->createSession($user, $ip, $userAgent);

        return [
            'success' => true,
            'token' => $token,
            'user' => $user,
        ];
    }

    /**
     * Register a new user.
     */
    public function register(array $data): array
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'role' => $data['role'] ?? 'parent',
        ]);

        // TODO: Send email verification

        return [
            'success' => true,
            'message' => 'Registration successful. Please verify your email.',
            'user' => $user,
        ];
    }

    /**
     * Logout the user by deleting their session.
     */
    public function logout(Request $request): void
    {
        $token = $this->extractToken($request);

        if ($token) {
            $tokenHash = hash('sha256', $token);
            Session::where('token_hash', $tokenHash)->delete();
        }
    }

    /**
     * Refresh the session (extend expiration).
     */
    public function refresh(Request $request): array
    {
        $token = $this->extractToken($request);

        if (!$token) {
            return [
                'success' => false,
                'message' => 'No token provided.',
                'code' => 'UNAUTHENTICATED',
            ];
        }

        $tokenHash = hash('sha256', $token);
        $session = Session::where('token_hash', $tokenHash)->first();

        if (!$session) {
            return [
                'success' => false,
                'message' => 'Invalid token.',
                'code' => 'UNAUTHENTICATED',
            ];
        }

        $session->update([
            'last_activity_at' => now(),
            'expires_at' => now()->addMinutes(config('session.absolute_timeout_minutes', 480)),
        ]);

        return [
            'success' => true,
            'token' => $token,
            'user' => $session->user,
        ];
    }

    /**
     * Request password reset.
     */
    public function requestPasswordReset(string $email): array
    {
        $user = User::where('email', $email)->first();

        if (!$user) {
            // Don't reveal if email exists
            return [
                'success' => true,
                'message' => 'If the email exists, a reset link has been sent.',
            ];
        }

        // TODO: Generate reset token and send email

        return [
            'success' => true,
            'message' => 'If the email exists, a reset link has been sent.',
        ];
    }

    /**
     * Create a new session for a user.
     */
    private function createSession(User $user, string $ip, string $userAgent): string
    {
        $token = Str::random(64);
        $tokenHash = hash('sha256', $token);

        Session::create([
            'user_id' => $user->id,
            'token_hash' => $tokenHash,
            'ip_address' => $ip,
            'user_agent' => $userAgent,
            'last_activity_at' => now(),
            'expires_at' => now()->addMinutes(config('session.absolute_timeout_minutes', 480)),
        ]);

        return $token;
    }

    /**
     * Extract Bearer token from request.
     */
    private function extractToken(Request $request): ?string
    {
        $header = $request->header('Authorization', '');

        if (str_starts_with($header, 'Bearer ')) {
            return substr($header, 7);
        }

        return null;
    }
}
