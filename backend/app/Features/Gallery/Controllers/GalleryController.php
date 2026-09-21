<?php

namespace App\Features\Gallery\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    /**
     * Public list of gallery items.
     */
    public function index(Request $request, ?string $category = null): JsonResponse
    {
        $query = Gallery::query();

        if ($category) {
            $query->where('category', $category);
        }

        $items = $query->orderBy('uploaded_at', 'desc')
            ->limit(100)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $items,
        ]);
    }

    /**
     * Get featured gallery items.
     */
    public function featured(): JsonResponse
    {
        $items = Gallery::where('is_featured', true)
            ->orderBy('uploaded_at', 'desc')
            ->limit(12)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $items,
        ]);
    }

    /**
     * Get a single gallery item by ID.
     */
    public function show(int $id): JsonResponse
    {
        $item = Gallery::find($id);

        if (!$item) {
            return response()->json([
                'success' => false,
                'message' => 'Gallery item not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $item,
        ]);
    }
}
