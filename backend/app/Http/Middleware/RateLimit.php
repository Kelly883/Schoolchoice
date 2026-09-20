<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RateLimit
{
    /**
     * Handle an incoming request.
     * Apply rate limiting to API routes.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Rate limiting is handled by Laravel's built-in throttle middleware
        return $next($request);
    }
}
