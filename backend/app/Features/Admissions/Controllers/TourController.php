<?php

namespace App\Features\Admissions\Controllers;

use App\Http\Controllers\Controller;
use App\Models\SchoolTour;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TourController extends Controller
{
    /**
     * List tours (admin only).
     */
    public function index(Request $request): JsonResponse
    {
        $tours = SchoolTour::latest()->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $tours,
        ]);
    }

    /**
     * Get a single tour.
     */
    public function show(int $id): JsonResponse
    {
        $tour = SchoolTour::find($id);

        if (!$tour) {
            return response()->json([
                'success' => false,
                'message' => 'Tour not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $tour,
        ]);
    }

    /**
     * Book a tour (public).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'parent_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'preferred_date' => 'required|date',
            'preferred_time' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        // Check for double-booking
        $existing = SchoolTour::where('email', $validated['email'])
            ->whereDate('preferred_date', $validated['preferred_date'])
            ->where('status', '!=', 'cancelled')
            ->first();

        if ($existing) {
            return response()->json([
                'success' => false,
                'message' => 'You already have a tour booked for this date.',
            ], 422);
        }

        $tour = SchoolTour::create([
            ...$validated,
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Tour booked successfully.',
            'data' => $tour,
        ], 201);
    }

    /**
     * Update a tour (admin only).
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $tour = SchoolTour::find($id);

        if (!$tour) {
            return response()->json([
                'success' => false,
                'message' => 'Tour not found.',
            ], 404);
        }

        $validated = $request->validate([
            'status' => 'sometimes|in:pending,confirmed,completed,cancelled',
            'notes' => 'nullable|string',
        ]);

        $tour->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Tour updated.',
            'data' => $tour,
        ]);
    }
}
