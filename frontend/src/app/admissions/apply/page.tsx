'use client';

import { PublicLayout } from '@/components/layout';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import Link from 'next/link';

export default function AdmissionsApplyPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    childDOB: '',
    parentName: '',
    email: '',
    phone: '',
    address: '',
    currentSchool: '',
    subject: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 3;

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <PublicLayout>
      <div className="container-narrow section">
        <PageHeader
          title="Apply for Admission"
          subtitle="Complete the online application form to begin your child's journey."
        />

        <div className="card card-padded max-w-3xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3].map((s) => (
                <span
                  key={s}
                  className={`text-sm font-medium ${
                    s === step ? 'text-primary-600' : s < step ? 'text-green-600' : 'text-neutral-400'
                  }`}
                >
                  Step {s}: {['Child Information', 'Parent Details', 'Review & Submit'][s - 1]}
                </span>
              ))}
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((step) / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">Child Information</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                    Child's Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.childName}
                    onChange={e => updateField('childName', e.target.value)}
                    className="input"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      value={formData.childDOB}
                      onChange={e => updateField('childDOB', e.target.value)}
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                      Age/Grade *
                    </label>
                    <select
                      value={formData.childAge}
                      onChange={e => updateField('childAge', e.target.value)}
                      className="input"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="Nursery 1">Nursery 1 (3-4 years)</option>
                      <option value="Nursery 2">Nursery 2 (4-5 years)</option>
                      <option value="Reception">Reception (5 years)</option>
                      <option value="Primary 1">Primary 1 (6 years)</option>
                      <option value="Primary 2">Primary 2 (7 years)</option>
                      <option value="Primary 3">Primary 3 (8 years)</option>
                      <option value="JSS 1">JSS 1 (11-12 years)</option>
                      <option value="JSS 2">JSS 2 (12-13 years)</option>
                      <option value="SSS 1">SSS 1 (15-16 years)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                    Current School (if applicable)
                  </label>
                  <input
                    type="text"
                    value={formData.currentSchool}
                    onChange={e => updateField('currentSchool', e.target.value)}
                    className="input"
                    placeholder="Previous school name"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">Parent/Guardian Details</h3>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                    Parent/Guardian Name *
                  </label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={e => updateField('parentName', e.target.value)}
                    className="input"
                    placeholder="Jane Doe"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => updateField('email', e.target.value)}
                      className="input"
                      placeholder="parent@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => updateField('phone', e.target.value)}
                      className="input"
                      placeholder="+234 123 456 7890"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                    Address *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={e => updateField('address', e.target.value)}
                    className="input"
                    rows={3}
                    placeholder="Full residential address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                    Interested Subject/Program *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={e => updateField('subject', e.target.value)}
                    className="input"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="arts">Arts & Creative</option>
                    <option value="sports">Sports & Athletics</option>
                    <option value="academics">Academic Excellence</option>
                    <option value="technology">Technology & Coding</option>
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">Review Your Application</h3>
                
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg" role="alert">
                    <p className="font-medium">Application submitted successfully! We will contact you shortly.</p>
                  </div>
                )}
                
                <div className="bg-neutral-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-neutral-900 mb-2">Application Summary</h4>
                  <dl className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-neutral-500">Child:</dt>
                      <dd className="text-neutral-700">{formData.childName} ({formData.childAge})</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-500">DOB:</dt>
                      <dd className="text-neutral-700">{formData.childDOB || 'Not provided'}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-500">Parent:</dt>
                      <dd className="text-neutral-700">{formData.parentName}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-500">Email:</dt>
                      <dd className="text-neutral-700">{formData.email}</dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="text-neutral-500">Phone:</dt>
                      <dd className="text-neutral-700">{formData.phone}</dd>
                    </div>
                  </dl>
                </div>

                <p className="text-sm text-neutral-600 mb-6">
                  By submitting this application, you agree to our{' '}
                  <Link href="/terms" className="text-primary-600 hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>.
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-neutral-200">
              <Button
                type="button"
                variant="ghost"
                onClick={prevStep}
                disabled={step === 1}
              >
                Back
              </Button>
              
              {step < totalSteps ? (
                <Button type="button" onClick={nextStep} variant="primary">
                  Continue
                </Button>
              ) : (
                <Button type="submit" isLoading={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
}