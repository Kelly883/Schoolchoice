<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuditLog
{
    /**
     * Handle an incoming request.
     * Log sensitive operations.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Log sensitive operations
        $sensitiveActions = [
            'POST' => ['/auth/login', '/auth/register', '/admissions/applications', '/payments'],
            'PATCH' => ['/admissions/applications', '/admin/students', '/admin/teachers'],
            'DELETE' => ['/admin/students', '/admin/teachers'],
        ];

        $method = $request->method();
        $path = $request->path();

        if (isset($sensitiveActions[$method])) {
            foreach ($sensitiveActions[$method] as $action) {
                if (str_contains($path, $action)) {
                    \App\Models\AuditLog::create([
                        'user_id' => $request->user()?->id,
                        'action' => strtolower($method) . '.' . str_replace('/', '.', $path),
                        'ip_address' => $request->ip(),
                        'user_agent' => $request->userAgent(),
                    ]);
                    break;
                }
            }
        }

        return $response;
    }
}
