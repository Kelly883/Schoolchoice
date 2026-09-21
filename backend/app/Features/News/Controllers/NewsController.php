<?php

namespace App\Features\News\Controllers;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * Public list of published news articles.
     */
    public function index(Request $request): JsonResponse
    {
        $news = News::where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->limit(20)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $news,
        ]);
    }

    /**
     * Get a single published news article by slug.
     */
    public function show(string $slug): JsonResponse
    {
        $article = News::where('slug', $slug)
            ->where('is_published', true)
            ->first();

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $article,
        ]);
    }
}
