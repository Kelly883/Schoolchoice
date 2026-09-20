'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Input, Button, Alert } from '@/components/ui';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: Integrate with Laravel API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setError('Login functionality will be available once the backend is connected.');
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
      <Input
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
      />
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded border-neutral-300" />
          <span className="text-neutral-600">Remember me</span>
        </label>
        <Link href="/reset-password" className="text-primary-600 hover:text-primary-700">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" className="w-full" isLoading={isLoading}>
        Sign In
      </Button>
      <p className="text-center text-sm text-neutral-600">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-primary-600 hover:text-primary-700">
          Register
        </Link>
      </p>
    </form>
  );
}
