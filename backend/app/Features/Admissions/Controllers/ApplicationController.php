<?php

namespace App\Features\Admissions\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\ApplicationDocument;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ApplicationController extends Controller
{
    /**
     * List applications (admin only).
     */
    public function index(Request $request): JsonResponse
    {
        $query = Application::with('documents');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('applicant_name', 'like', "%{$search}%")
                  ->orWhere('child_name', 'like', "%{$search}%")
                  ->orWhere('application_number', 'like', "%{$search}%");
            });
        }

        $applications = $query->latest()->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $applications,
        ]);
    }

    /**
     * Get a single application.
     */
    public function show(int $id): JsonResponse
    {
        $application = Application::with('documents')->find($id);

        if (!$application) {
            return response()->json([
                'success' => false,
                'message' => 'Application not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $application,
        ]);
    }

    /**
     * Submit a new application (public).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'applicant_name' => 'required|string|max:255',
            'applicant_email' => 'required|email',
            'applicant_phone' => 'required|string|max:20',
            'child_name' => 'required|string|max:255',
            'child_dob' => 'required|date',
            'child_gender' => 'required|in:male,female',
            'desired_class_id' => 'nullable|integer|exists:classes,id',
        ]);

        $application = Application::create([
            ...$validated,
            'application_number' => 'APP-' . strtoupper(Str::random(8)),
            'status' => 'pending',
            'submitted_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Application submitted successfully.',
            'data' => $application,
        ], 201);
    }

    /**
     * Update an application (admin only).
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $application = Application::find($id);

        if (!$application) {
            return response()->json([
                'success' => false,
                'message' => 'Application not found.',
            ], 404);
        }

        $validated = $request->validate([
            'applicant_name' => 'sometimes|string|max:255',
            'applicant_email' => 'sometimes|email',
            'applicant_phone' => 'sometimes|string|max:20',
            'child_name' => 'sometimes|string|max:255',
            'child_dob' => 'sometimes|date',
            'child_gender' => 'sometimes|in:male,female',
            'desired_class_id' => 'nullable|integer|exists:classes,id',
        ]);

        $application->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Application updated.',
            'data' => $application,
        ]);
    }

    /**
     * Upload a document for an application.
     */
    public function uploadDocument(Request $request, int $id): JsonResponse
    {
        $application = Application::find($id);

        if (!$application) {
            return response()->json([
                'success' => false,
                'message' => 'Application not found.',
            ], 404);
        }

        $validated = $request->validate([
            'document_type' => 'required|string|max:50',
            'file' => 'required|file|max:10240|mimes:pdf,jpg,jpeg,png,doc,docx',
        ]);

        $file = $request->file('file');
        $path = $file->store('documents/applications', 'public');

        $document = ApplicationDocument::create([
            'application_id' => $application->id,
            'document_type' => $validated['document_type'],
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
            'file_size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'uploaded_at' => now(),
            'verification_status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Document uploaded.',
            'data' => $document,
        ], 201);
    }

    /**
     * Get documents for an application.
     */
    public function documents(int $id): JsonResponse
    {
        $application = Application::find($id);

        if (!$application) {
            return response()->json([
                'success' => false,
                'message' => 'Application not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $application->documents,
        ]);
    }

    /**
     * Update application status (admin only).
     */
    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $application = Application::find($id);

        if (!$application) {
            return response()->json([
                'success' => false,
                'message' => 'Application not found.',
            ], 404);
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,under_review,approved,rejected,waitlisted',
            'decision_notes' => 'nullable|string',
        ]);

        $application->update([
            'status' => $validated['status'],
            'decision_notes' => $validated['decision_notes'] ?? null,
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Status updated.',
            'data' => $application,
        ]);
    }

    /**
     * Track an application by number (public).
     */
    public function track(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'application_number' => 'required|string',
        ]);

        $application = Application::where('application_number', $validated['application_number'])
            ->first();

        if (!$application) {
            return response()->json([
                'success' => false,
                'message' => 'Application not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'application_number' => $application->application_number,
                'child_name' => $application->child_name,
                'status' => $application->status,
                'submitted_at' => $application->submitted_at,
                'decision' => $application->decision,
            ],
        ]);
    }
}
