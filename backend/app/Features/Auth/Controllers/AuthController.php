<?php

namespace App\Features\Auth\Controllers;

use App\Http\Controllers\Controller;
use App\Features\Auth\Requests\LoginRequest;
use App\Features\Auth\Requests\RegisterRequest;
use App\Features\Auth\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        private AuthService $authService
    ) {}

    /**
     * Login a user and return a token.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login(
            $request->validated('email'),
            $request->validated('password'),
            $request->ip(),
            $request->userAgent()
        );

        if (!$result['success']) {
            return response()->json($result, 401);
        }

        return response()->json($result);
    }

    /**
     * Register a new user.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $result = $this->authService->register($request->validated());

        return response()->json($result, 201);
    }

    /**
     * Get the authenticated user.
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'user' => $request->user(),
        ]);
    }

    /**
     * Logout the user.
     */
    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout($request);

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);
    }

    /**
     * Refresh the session.
     */
    public function refresh(Request $request): JsonResponse
    {
        $result = $this->authService->refresh($request);

        if (!$result['success']) {
            return response()->json($result, 401);
        }

        return response()->json($result);
    }

    /**
     * Request password reset.
     */
    public function requestPasswordReset(Request $request): JsonResponse
    {
        $result = $this->authService->requestPasswordReset($request->email);

        return response()->json($result);
    }
}
