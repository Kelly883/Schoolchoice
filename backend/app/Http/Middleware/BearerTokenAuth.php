<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Session;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class BearerTokenAuth
{
    /**
     * Handle an incoming request.
     * Validates Bearer token and checks idle timeout.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $this->extractToken($request);

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Authentication required.',
                'code' => 'UNAUTHENTICATED',
            ], 401);
        }

        $tokenHash = hash('sha256', $token);
        $session = Session::where('token_hash', $tokenHash)
            ->where('expires_at', '>', now())
            ->first();

        if (!$session) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or expired token.',
                'code' => 'UNAUTHENTICATED',
            ], 401);
        }

        // Check idle timeout
        $idleTimeout = config('session.idle_timeout_minutes', 30);
        $lastActivity = Carbon::parse($session->last_activity_at);

        if ($lastActivity->diffInMinutes(now()) > $idleTimeout) {
            $session->delete();
            return response()->json([
                'success' => false,
                'message' => 'Session expired due to inactivity.',
                'code' => 'SESSION_EXPIRED',
            ], 401);
        }

        // Check absolute timeout
        $absoluteTimeout = config('session.absolute_timeout_minutes', 480);
        $createdAt = Carbon::parse($session->created_at);

        if ($createdAt->diffInMinutes(now()) > $absoluteTimeout) {
            $session->delete();
            return response()->json([
                'success' => false,
                'message' => 'Session expired.',
                'code' => 'SESSION_EXPIRED',
            ], 401);
        }

        // Update last activity
        $session->update(['last_activity_at' => now()]);

        // Attach user to request
        $user = User::find($session->user_id);
        if (!$user) {
            $session->delete();
            return response()->json([
                'success' => false,
                'message' => 'User not found.',
                'code' => 'UNAUTHENTICATED',
            ], 401);
        }

        $request->setUserResolver(function () use ($user) {
            return $user;
        });

        return $next($request);
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
