<?php

namespace App\Features\Payments\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class PaystackController extends Controller
{
    /**
     * Initialize a Paystack payment.
     */
    public function initialize(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'amount' => 'required|numeric|min:100',
            'invoice_id' => 'nullable|integer|exists:invoices,id',
            'metadata' => 'nullable|array',
        ]);

        $reference = 'PAY-' . strtoupper(Str::random(12));

        $response = Http::withToken(config('services.paystack.secret_key'))
            ->post(config('services.paystack.payment_url') . '/transaction/initialize', [
                'email' => $validated['email'],
                'amount' => $validated['amount'] * 100, // Paystack uses kobo
                'reference' => $reference,
                'callback_url' => config('app.frontend_url') . '/payments/callback',
                'metadata' => $validated['metadata'] ?? [],
            ]);

        if (!$response->successful()) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to initialize payment.',
            ], 500);
        }

        // Create payment record
        Payment::create([
            'user_id' => $request->user()->id,
            'invoice_id' => $validated['invoice_id'] ?? null,
            'amount' => $validated['amount'],
            'currency' => 'NGN',
            'gateway' => 'paystack',
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
     * Verify a Paystack payment.
     */
    public function verify(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'reference' => 'required|string',
        ]);

        $response = Http::withToken(config('services.paystack.secret_key'))
            ->get(config('services.paystack.payment_url') . '/transaction/verify/' . $validated['reference']);

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

        if ($data['status'] === 'success') {
            $payment->update([
                'status' => 'successful',
                'paid_at' => now(),
                'verified_at' => now(),
                'gateway_response' => $data,
            ]);

            // Generate receipt
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
     * Handle Paystack webhook.
     */
    public function webhook(Request $request): JsonResponse
    {
        $payload = $request->all();

        // Verify webhook signature
        $signature = $request->header('x-paystack-signature');
        $secret = config('services.paystack.webhook_secret') ?: config('services.paystack.secret_key');
        $computed = hash_hmac('sha512', $request->getContent(), $secret);

        if ($signature !== $computed) {
            return response()->json(['message' => 'Invalid signature'], 400);
        }

        $event = $payload['event'] ?? '';
        $data = $payload['data'] ?? [];

        if ($event === 'charge.success') {
            $reference = $data['reference'] ?? '';

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
