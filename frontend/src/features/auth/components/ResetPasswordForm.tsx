'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Input, Button, Alert } from '@/components/ui';

export function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: Integrate with Laravel API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <Alert variant="success">Password reset link sent to your email.</Alert>
        <p className="text-sm text-neutral-600 mt-4">
          Check your inbox for instructions to reset your password.
        </p>
        <Link href="/login" className="text-primary-600 hover:text-primary-700 text-sm">
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert variant="error">{error}</Alert>}
      <Input
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
      />
      <Button type="submit" className="w-full" isLoading={isLoading}>
        Send Reset Link
      </Button>
      <p className="text-center text-sm text-neutral-600">
        Remember your password?{' '}
        <Link href="/login" className="text-primary-600 hover:text-primary-700">
          Sign In
        </Link>
      </p>
    </form>
  );
}
