'use client';

import { Button, Card, Badge, Alert, Spinner } from '@/components/ui';
import { useState } from 'react';

export default function DesignSystemTestPage() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-50 py-16">
      <div className="container-wide max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">Design System Test</h1>
          <p className="text-neutral-600">
            Verifying reusable primitives work across breakpoints
          </p>
        </header>

        {/* Buttons */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Buttons</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="md">Primary MD</Button>
            <Button variant="secondary" size="md">Secondary MD</Button>
            <Button variant="outline" size="md">Outline MD</Button>
            <Button variant="ghost" size="md">Ghost MD</Button>
            <Button variant="danger" size="md">Danger MD</Button>
            <Button size="lg">Large</Button>
            <Button size="sm">Small</Button>
            <Button isLoading={loading} onClick={() => setLoading(true)}>
              Loading
            </Button>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Cards</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <Card.Header>
                <Card.Title>Student Profile</Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="text-neutral-600">
                  Academic information, attendance, and results for each student.
                </p>
              </Card.Content>
              <Card.Footer>
                <Button variant="outline" size="sm">View Details</Button>
              </Card.Footer>
            </Card>
            <Card padded>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Quick Stats</h3>
              <p className="text-neutral-600 text-sm">
                Real-time dashboard metrics at your fingertips.
              </p>
            </Card>
          </div>
        </section>

        {/* Badges */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="primary">Admitted</Badge>
            <Badge variant="secondary">Pending</Badge>
            <Badge variant="success">Verified</Badge>
            <Badge variant="warning">Review</Badge>
            <Badge variant="error">Rejected</Badge>
            <Badge>Neutral</Badge>
          </div>
        </section>

        {/* Alerts */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Alerts</h2>
          <div className="space-y-4">
            <Alert variant="info" title="Information">
              Application requirements and deadlines for the upcoming academic session.
            </Alert>
            <Alert variant="success" title="Success">
              Payment received successfully. A receipt has been generated.
            </Alert>
            <Alert variant="warning" title="Warning">
              Your application is incomplete. Please upload the required documents.
            </Alert>
            <Alert variant="error" title="Error">
              There was a problem processing your request. Please try again.
            </Alert>
          </div>
        </section>

        {/* Form Controls */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Form Controls</h2>
          <div className="space-y-6 max-w-md">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                className="input"
                placeholder="Enter your name"
                defaultValue="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                className="input input-error"
                placeholder="Enter a valid email"
                defaultValue="invalid-email"
              />
              <p className="error-text" role="alert">
                Please enter a valid email address
              </p>
            </div>
          </div>
        </section>

        {/* Loading */}
        <section className="mb-12 text-center">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Loading States</h2>
          <Spinner size="lg" />
        </section>
      </div>
    </main>
  );
}