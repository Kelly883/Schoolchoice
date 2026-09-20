<?php

namespace App\Features\Teachers\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class TeacherController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [],
        ]);
    }

    public function store(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Created successfully.',
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => null,
        ]);
    }

    public function update(int $id): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Updated successfully.',
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Deleted successfully.',
        ]);
    }
}
