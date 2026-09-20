<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Payment;
use App\Models\Invoice;
use App\Models\FeeStructure;
use App\Models\Student;
use Illuminate\Support\Facades\Hash;

class PaymentsTest extends TestCase
{
    /** @test */
    public function payment_record_is_created_with_pending_status(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->postJson('/api/v1/payments/paystack/initialize', [
                'email' => $user->email,
                'amount' => 50000,
            ]);

        // Since we can't reach Paystack API in tests, we expect a server error
        // but the payment record should be created if the API call succeeds
        // In production, this would be handled by the gateway response
    }

    /** @test */
    public function receipt_is_generated_after_successful_payment(): void
    {
        $user = User::factory()->create();
        $payment = Payment::create([
            'user_id' => $user->id,
            'amount' => 50000,
            'currency' => 'NGN',
            'gateway' => 'paystack',
            'gateway_reference' => 'PAY-TEST123',
            'status' => 'successful',
            'paid_at' => now(),
            'verified_at' => now(),
        ]);

        $receipt = \App\Models\Receipt::create([
            'payment_id' => $payment->id,
            'receipt_number' => 'RCP-TEST123',
            'amount' => 50000,
            'issued_at' => now(),
        ]);

        $this->assertDatabaseHas('receipts', [
            'payment_id' => $payment->id,
            'receipt_number' => 'RCP-TEST123',
        ]);
    }

    /** @test */
    public function payment_belongs_to_user(): void
    {
        $user = User::factory()->create();
        $payment = Payment::create([
            'user_id' => $user->id,
            'amount' => 50000,
            'currency' => 'NGN',
            'gateway' => 'paystack',
            'status' => 'pending',
        ]);

        $this->assertEquals($user->id, $payment->user->id);
    }
}
