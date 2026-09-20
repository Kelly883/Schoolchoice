<?php

namespace App\Features\Payments\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class FlutterwaveController extends Controller
{
    /**
     * Initialize a Flutterwave payment.
     */
    public function initialize(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'amount' => 'required|numeric|min:100',
            'invoice_id' => 'nullable|integer|exists:invoices,id',
            'metadata' => 'nullable|array',
        ]);

        $reference = 'FLW-' . strtoupper(Str::random(12));

        $response = Http::withToken(config('services.flutterwave.secret_key'))
            ->post(config('services.flutterwave.payment_url') . '/payments', [
                'tx_ref' => $reference,
                'amount' => $validated['amount'],
                'currency' => 'NGN',
                'redirect_url' => config('app.frontend_url') . '/payments/callback',
                'customer' => [
                    'email' => $validated['email'],
                ],
                'customizations' => [
                    'title' => config('app.name'),
                    'description' => 'School payment',
                ],
                'meta' => $validated['metadata'] ?? [],
            ]);

        if (!$response->successful()) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to initialize payment.',
            ], 500);
        }

        Payment::create([
            'user_id' => $request->user()->id,
            'invoice_id' => $validated['invoice_id'] ?? null,
            'amount' => $validated['amount'],
            'currency' => 'NGN',
            'gateway' => 'flutterwave',
            'gateway_reference' => $reference,
            'status' => 'pending',
            'metadata' => $validated['metadata'] ?? [],
        ]);

        return response()->json([
            'success' => true,
            'data' => $response->json()['data'],
        ]);
    }

    /**
     * Verify a Flutterwave payment.
     */
    public function verify(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'reference' => 'required|string',
        ]);

        $response = Http::withToken(config('services.flutterwave.secret_key'))
            ->get(config('services.flutterwave.payment_url') . '/transactions/verify_by_reference?tx_ref=' . $validated['reference']);

        if (!$response->successful()) {
            return response()->json([
                'success' => false,
                'message' => 'Payment verification failed.',
            ], 500);
        }

        $data = $response->json()['data'];

        $payment = Payment::where('gateway_reference', $validated['reference'])->first();

        if (!$payment) {
            return response()->json([
                'success' => false,
                'message' => 'Payment record not found.',
            ], 404);
        }

        if ($data['status'] === 'successful') {
            $payment->update([
                'status' => 'successful',
                'paid_at' => now(),
                'verified_at' => now(),
                'gateway_response' => $data,
            ]);

            $this->generateReceipt($payment);
        } else {
            $payment->update([
                'status' => 'failed',
                'gateway_response' => $data,
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $payment,
        ]);
    }

    /**
     * Handle Flutterwave webhook.
     */
    public function webhook(Request $request): JsonResponse
    {
        $payload = $request->all();

        // Verify webhook signature
        $signature = $request->header('verif-hash');
        $secret = config('services.flutterwave.webhook_secret') ?: config('services.flutterwave.secret_key');
        $computed = hash_hmac('sha256', $request->getContent(), $secret);

        if ($signature !== $computed) {
            return response()->json(['message' => 'Invalid signature'], 400);
        }

        $event = $payload['event'] ?? '';
        $data = $payload['data'] ?? [];

        if ($event === 'charge.completed' && ($data['status'] ?? '') === 'successful') {
            $reference = $data['tx_ref'] ?? '';

            $payment = Payment::where('gateway_reference', $reference)->first();

            if ($payment && $payment->status === 'pending') {
                $payment->update([
                    'status' => 'successful',
                    'paid_at' => now(),
                    'verified_at' => now(),
                    'gateway_response' => $data,
                ]);

                $this->generateReceipt($payment);
            }
        }

        return response()->json(['message' => 'Webhook received']);
    }

    /**
     * Generate a receipt for a payment.
     */
    private function generateReceipt(Payment $payment): void
    {
        $receiptNumber = 'RCP-' . strtoupper(Str::random(10));

        \App\Models\Receipt::create([
            'payment_id' => $payment->id,
            'receipt_number' => $receiptNumber,
            'amount' => $payment->amount,
            'issued_at' => now(),
        ]);
    }
}
