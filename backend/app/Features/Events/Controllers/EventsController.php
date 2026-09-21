<?php

namespace App\Features\Events\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    /**
     * Public list of upcoming public events.
     */
    public function index(Request $request): JsonResponse
    {
        $events = Event::where('is_public', true)
            ->where('event_date', '>=', now())
            ->orderBy('event_date', 'asc')
            ->limit(50)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $events,
        ]);
    }

    /**
     * Get a single public event by ID.
     */
    public function show(int $id): JsonResponse
    {
        $event = Event::where('id', $id)
            ->where('is_public', true)
            ->first();

        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $event,
        ]);
    }
}