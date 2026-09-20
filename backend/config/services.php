<?php

return [
    'paystack' => [
        'public_key' => env('PAYSTACK_PUBLIC_KEY'),
        'secret_key' => env('PAYSTACK_SECRET_KEY'),
        'payment_url' => env('PAYSTACK_PAYMENT_URL', 'https://api.paystack.co'),
        'currency' => env('PAYSTACK_CURRENCY', 'NGN'),
    ],
    'flutterwave' => [
        'public_key' => env('FLUTTERWAVE_PUBLIC_KEY'),
        'secret_key' => env('FLUTTERWAVE_SECRET_KEY'),
        'payment_url' => env('FLUTTERWAVE_PAYMENT_URL', 'https://api.flutterwave.com/v3'),
        'currency' => env('FLUTTERWAVE_CURRENCY', 'NGN'),
    ],
];
