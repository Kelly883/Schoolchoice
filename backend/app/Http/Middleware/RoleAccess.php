<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleAccess
{
    /**
     * Handle an incoming request.
     * Checks if user has required role.
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Authentication required.',
                'code' => 'UNAUTHENTICATED',
            ], 401);
        }

        // Super admin bypasses all role checks
        if ($user->role === 'super_admin') {
            return $next($request);
        }

        if (!in_array($user->role, $roles)) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have permission to perform this action.',
                'code' => 'FORBIDDEN',
            ], 403);
        }

        return $next($request);
    }
}
