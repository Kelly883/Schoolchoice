'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Input, Button, Alert } from '@/components/ui';

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Integrate with Laravel API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setError('Registration functionality will be available once the backend is connected.');
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
        label="Full Name"
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your full name"
        required
      />
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
        placeholder="Create a password"
        required
      />
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
        required
      />
      <Button type="submit" className="w-full" isLoading={isLoading}>
        Create Account
      </Button>
      <p className="text-center text-sm text-neutral-600">
        Already have an account?{' '}
        <Link href="/login" className="text-primary-600 hover:text-primary-700">
          Sign In
        </Link>
      </p>
    </form>
  );
}
